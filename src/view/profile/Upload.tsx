import React, { Component } from 'react';
import { Upload, Icon, message, Button } from 'antd';
import { _requestToServer } from '../../services/exec';
import { PUT } from '../../const/method';
import { UPCVSTUDENT } from '../../services/api/private.api';
import { sendFileHeader } from '../../services/auth';
import { STUDENT_HOST } from '../../environment/development';

const { Dragger } = Upload;

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

class UploadConfig extends Component {
    handleChange = ({ fileList }) => this.setState({ fileList });
    createRequest = async () => {
        if (this.state.fileList) {
            const formData = new FormData();
            formData.append("file", this.state.fileList[0])
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
                <label htmlFor="id" className="ant-upload ant-upload-drag">
                    <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">Thêm hoặc kéo thả cv vào đây</p>
                    <p className="ant-upload-hint">
                        Chỉ hỗ trợ cho file PDF Tiếng Việt ( dung lượng 10-50 mb)
                    </p>
                </label>
                <input id={"cv"} type={"file"} accept={'.pdf'} maxLength={1} onChange={this.handleChange}/>
                <Button
                    type="primary"
                    onClick={() => this.createRequest()}
                    loading={this.loading}
                    icon="save"
                    style={{ marginTop: 10 }}
                    children="Lưu"
                />
            </div>
        );
    }
}

export default UploadConfig;
