import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';

import './Dropzone.scss';
import { Icon, Button, notification } from 'antd';
import { UPCVSTUDENT } from './../../../services/api/private.api';
import { Progress } from 'antd';
import { sendFileHeader } from '../../../services/auth';

export const Dropzone = (props?: { onCallSuccess?: Function }) => {
    const fileInputRef = useRef();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [validFiles, setValidFiles] = useState([]);
    const [unsupportedFiles, setUnsupportedFiles] = useState([]);
    const [pc, setPc] = useState(0)

    useEffect(() => {
        let filteredArr = selectedFiles.reduce((acc, current) => {
            const x = acc.find(item => item.name === current.name);
            if (!x) {
                return acc.concat([current]);
            } else {
                return acc;
            }
        }, []);
        setValidFiles([...filteredArr]);

    }, [selectedFiles]);

    const preventDefault = (e) => {
        e.preventDefault();
        // e.stopPropagation();
    }

    const dragOver = (e) => {
        preventDefault(e);
    }

    const dragEnter = (e) => {
        preventDefault(e);
    }

    const dragLeave = (e) => {
        preventDefault(e);
    }

    const fileDrop = (e) => {
        preventDefault(e);
        const files = e.dataTransfer.files;
        if (files.length) {
            handleFiles(files);
        }
    }

    const filesSelected = () => {
        //@ts-ignore
        if (fileInputRef && fileInputRef.current && fileInputRef.current.files && fileInputRef.current.files.length > 0) {
            //@ts-ignore
            handleFiles(fileInputRef.current.files);
        }
    }

    const fileInputClicked = () => {
        //@ts-ignore
        fileInputRef.current.click();
    }

    const handleFiles = (files) => {
        for (let i = 0; i < 1; i++) {
            if (validateFile(files[i])) {
                setSelectedFiles(prevArray => [...prevArray, files[i]]);
            } else {
                files[i]['invalid'] = true;
                setSelectedFiles(prevArray => [...prevArray, files[i]]);
                setUnsupportedFiles(prevArray => [...prevArray, files[i]]);
            }
        }
    }

    const validateFile = (file) => {
        console.log(file.type);
        const validTypes = ['application/pdf'];
        if (validTypes.indexOf(file.type) === -1) {
            return false;
        }

        return true;
    }

    const fileSize = (size) => {
        if (size === 0) {
            return '0 Bytes';
        }
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(size) / Math.log(k));
        return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    const fileType = (fileName) => {
        return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) || fileName;
    }

    const removeFile = (name) => {
        const index = validFiles.findIndex(e => e.name === name);
        const index2 = selectedFiles.findIndex(e => e.name === name);
        const index3 = unsupportedFiles.findIndex(e => e.name === name);
        validFiles.splice(index, 1);
        selectedFiles.splice(index2, 1);
        setValidFiles([...validFiles]);
        setSelectedFiles([...selectedFiles]);
        if (index3 !== -1) {
            unsupportedFiles.splice(index3, 1);
            setUnsupportedFiles([...unsupportedFiles]);
        }
    }

    const uploadFiles = async () => {
        if (validFiles[0]) {
            const formData = new FormData();
            formData.append('file', validFiles[0]);
            axios.put(process.env.REACT_APP_API_HOST + UPCVSTUDENT, formData, {
                headers: sendFileHeader,
                onUploadProgress: (progressEvent) => {
                    const uploadPercentage = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
                    setPc(uploadPercentage);
                    if (uploadPercentage === 100) {
                        setTimeout(() => {
                            setPc(0)
                        }, 2000);
                        setValidFiles([]);
                        setSelectedFiles([]);
                        setUnsupportedFiles([]);
                    }
                },
            }).then((res) => {
                if (res) {
                    notification.success({ message: 'Tải lên CV thành công' });
                    setValidFiles([]);
                    let date = new Date();
                    let number = date.getTime();
                    props.onCallSuccess(res.data.data.downloadUrl + `?time=${number}`);
                }
            }).catch((err) => {
                if (err) {
                    notification.warning({ message: "Lỗi bất ngờ", description: " Thử làm lại xem sao" })
                }
            })

        } else {
            notification.warning({ message: "Lỗi trống phải ", description: "Bạn cần phải chọn ít nhất 1 phải trước khi upload" })
        }

    }


    return (
        <div className="drag-cv" >
            <div className="ant-upload ant-upload-drag"
                onDragOver={dragOver}
                onDragEnter={dragEnter}
                onDragLeave={dragLeave}
                onDrop={fileDrop}
                onClick={fileInputClicked}
            >
                <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">Thêm hoặc kéo thả CV vào đây</p>
                <p className="ant-upload-hint">
                    Chỉ hỗ trợ cho file PDF Tiếng Việt ( dung lượng 10-50 mb)
                    </p>
                <input
                    ref={fileInputRef}
                    className="file-input"
                    type="file"
                    accept=".pdf"
                    multiple={false}
                    onChange={filesSelected}
                />
            </div>
            <Progress percent={pc} />
            <div className="file-display-container">
                {
                    validFiles.map((data, i) =>
                        <div className="file-status-bar" key={i}>
                            <div className="file-type-logo" />
                            <div className="file-type">{fileType(data.name)}</div>
                            <span className={`file-name ${data.invalid ? 'file-error' : ''}`}>{data.name}</span>
                            <Icon type="close" style={{ fontSize: 10 }} theme="twoTone" twoToneColor="red" onClick={() => removeFile(data.name)} />
                        </div>
                    )
                }
            </div>
            <Button type="primary" icon="save" onClick={() => uploadFiles()}>
                Tải lên CV
                    {
                    validFiles && validFiles.length > 0 && <span className="file-size">( {fileSize(validFiles[0].size)} )</span>
                }

            </Button>
        </div>
    );
}
