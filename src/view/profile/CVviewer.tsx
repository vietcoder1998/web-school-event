import React, { Component } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { limitString } from "./../../utils/limitString";
import { message, Icon, Tooltip } from 'antd';

interface IProps { cvUrl?: string }
interface IState { }
export default class CVviewer extends Component<IProps, IState> {
    render() {
        return (
            <div className="drag-cv">
                <embed
                    className="hidden-mobile"
                    key={this.props.cvUrl}
                    src={this.props.cvUrl}
                    style={{ width: "100%", height: "25vw" }}
                />
                <CopyToClipboard
                    text={this.props.cvUrl}
                    onCopy={() => message.info("Sao chép thành công")}
                >
                    <p style={{ cursor: "pointed" }}>
                        Link đường dẫn cv <Tooltip title="Copy link">
                            <Icon type="copy" /></Tooltip>
                    </p>
                </CopyToClipboard>
                <p>
                    <a href={this.props.cvUrl} target="_blank" rel="noopener noreferrer">{limitString(this.props.cvUrl, 30)}</a>
                </p>
            </div >
        )
    }
}
