import React, { Component } from 'react';
import { Col, Row, Modal } from 'antd';

//@ts-ignore
import imgvd1 from './../../../assets/image/video/1.png';
//@ts-ignore
import imgvd2 from './../../../assets/image/video/2.png';
//@ts-ignore
import imgvd3 from './../../../assets/image/video/3.png';
import { OnDiv } from '../layout/common/Common';

const description = [
    "1. Giới thiệu về cổng thông tin",
    "2. Góc nhìn từ Nhà tuyển dụng về Ứng viên chuyên nghiệp",
    "3. Thế nào là hồ sơ (CV) chất thu hút Nhà tuyển dụng?"
];

interface IProps {
    match?: any;
    history?: any;
    mobileState?: any;
}
interface IState {
    vm?: boolean;
    vl?: string;
    title?: string;
}

class VideoAd extends Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.state = {
            vm: true,
            vl: null,
            title: description[0],
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props) {
            let url_string = window.location.href;
            var url = new URL(url_string);
            var vm = url.searchParams.get("vm");
            var vl = url.searchParams.get("vl");

            if (vm && vm === "true")
                return {
                    vm: true,
                    vl
                }
        }

        return {
            vm: false
        };
    }

    showVideo = (vm?: boolean, vl?: string, title?: string) => {
        this.props.history.push(`?vm=${vm}&vl=${vl}`)
        let { isMobile } = this.props.mobileState
        this.setState({ title })
        if (isMobile) {
            window.open(`https://www.youtube.com/embed/${vl}?autoplay=1`, "_blank")
        }
    }

    render() {
        let { mobileState } = this.props;
        return (
            <div className={"home-job"} >
                {!mobileState.isMobile ? <Modal
                    visible={this.state.vm}
                    width="50vw"
                    destroyOnClose={true}
                    onCancel={() => this.props.history.push('?vm=false')}
                    title={this.state.title}
                >
                    <iframe
                        title={this.state.title}
                        height="500"
                        width="100%"
                        src={`https://www.youtube.com/embed/${this.state.vl}?autoplay=1`}
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                </Modal> : ""}
                <Row>
                    <h5>CHỦ ĐỀ TIÊU BIỂU</h5>
                    <Col sm={24} md={8} lg={8} xl={8} xxl={8}>
                        <div className="expert-content">
                            <OnDiv
                                onClick={
                                    () => this.showVideo(true, "Zj8t2qyJ2n4", description[0])
                                }
                                src={imgvd1}
                                alt={description[1]}
                            />
                            <div className="video-ad-on">
                                {description[0]}
                            </div>
                        </div>
                    </Col >
                    <Col sm={24} md={8} lg={8} xl={8} xxl={8}>
                        <div className="expert-content">
                            <OnDiv
                                onClick={
                                    () => this.showVideo(true, "0c3LgKTNHKU", description[1])
                                }
                                src={imgvd2}
                                alt={description[1]}
                            />
                            <div className="video-ad-on">
                                <p>
                                    {description[1]}
                                </p>
                            </div>
                        </div>
                    </Col>
                    <Col sm={24} md={8} lg={8} xl={8} xxl={8}>
                        <div className="expert-content">
                            <OnDiv
                                onClick={
                                    () => this.showVideo(true, "Sxl2g3DCs_s", description[2])}
                                src={imgvd3}
                                alt={"Công việc liên quan đến kĩ thuật"}
                            />
                            <div className="video-ad-on">
                                <p>
                                    {description[2]}
                                </p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div >
        );
    }
}


export default VideoAd;
