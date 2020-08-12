import React, { Component } from 'react';
//@ts-ignore
import Banner1 from "./../../../assets/image/banner-1.jpg";
//@ts-ignore
import Banner2 from "./../../../assets/image/banner-2.jpg";
import { Col, Row, Icon } from 'antd';


class VideoAd extends Component {
    render() {
        return (
            <div className={"home-job"} >
                <Row>
                    <h5>VIDEO</h5>
                    <Col sm={24} md={8} lg={8} xl={8} xxl={8}>
                        <div className="expert-content">
                            <iframe
                                width="100%"
                                title="Giới thiệu cổng thông tin Works.vn"
                                height="300"
                                src="https://www.youtube.com/embed/Zj8t2qyJ2n4"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            />
                            <div className="job-expert">
                                <Icon type={"pie-chart"} style={{ marginRight: 5 }} />
                                Nhóm ngành kinh doanh
                            </div>
                        </div>
                    </Col >
                    <Col sm={24} md={8} lg={8} xl={8} xxl={8}>
                        <div className="expert-content">
                            <img style={{ width: '100%' }} src={Banner2} alt={"Công việc liên quan đến kĩ thuật"} />
                            <div className="job-expert">
                                <Icon type={"tool"} style={{ marginRight: 5 }} />
                                Nhóm ngành kĩ thuật
                            </div>
                        </div>
                    </Col>
                    <Col sm={24} md={8} lg={8} xl={8} xxl={8}>
                        <div className="expert-content">
                            <img style={{ width: '100%' }} src={Banner2} alt={"Công việc liên quan đến kĩ thuật"} />
                            <div className="job-expert">
                                <Icon type={"tool"} style={{ marginRight: 5 }} />
                                Nhóm ngành kĩ thuật
                            </div>
                        </div>
                    </Col>
                </Row>
            </div >
        );
    }
}


export default VideoAd;
