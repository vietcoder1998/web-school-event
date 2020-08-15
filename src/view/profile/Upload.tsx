import React, { Component } from 'react';
import { Upload, Icon, message, Button } from 'antd';
import { _requestToServer } from '../../services/exec';
import { PUT } from '../../const/method';
import { UPCVSTUDENT } from '../../services/api/private.api';
import { sendFileHeader } from '../../services/auth';
import { STUDENT_HOST } from '../../environment/development';

const { Dragger } = Upload;

class UploadConfig extends Component {
    propsDr: any = {
        name: 'file',
        accept: ".pdf",
        multiple: true,
        action: "https://run.mocky.io/v3/d239e8ba-ccf3-46c6-9dd6-4fb91557ba10?mocky-delay=5000ms",
        onChange: (info?: any) => {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`Tải lên Thành công`);
                console.log(info.file);
                this.file = info.fileList[0];
            } else if (status === 'error') {
                message.error(`${info.file.name} Sai định dạng hoặc file quá nặng`);
                console.log(info.fileList);
            }
        },
    };
    file: File = null;
    loading: boolean = false;
    createRequest = async () => {
        this.loading = true;
        if (this.file) {
            const formData = new FormData();
            formData.append("file", this.file)
            await _requestToServer(
                PUT,
                formData,
                UPCVSTUDENT,
                STUDENT_HOST,
                sendFileHeader,
                undefined,
                true,
            ).finally(() => this.loading = false)
        }
    }

    render() {
        return (
            <div className="drag-cv">
                <Dragger {...this.propsDr} >
                    <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">Thêm hoặc kéo thả cv vào đây</p>
                    <p className="ant-upload-hint">
                        Chỉ hỗ trợ cho file PDF Tiếng Việt ( dung lượng 10-50 mb)
                    </p>
                </Dragger>
                <Button
                    type="primary"
                    onClick={() => this.createRequest()}
                    loading={this.loading}
                    icon="upload"
                    style={{ marginTop: 10 }}
                    children="Lưu"
                />
            </div>
        );
    }
}

export default UploadConfig;
