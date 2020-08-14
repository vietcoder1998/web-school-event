import React, { Component } from 'react';
//@ts-ignore
import Banner1 from "./../../assets/image/banner-1.jpg";
//@ts-ignore
import Banner2 from "./../../assets/image/banner-2.jpg";
import { Col, Row, Icon } from 'antd';
import { LazyLoadImage } from 'react-lazy-load-image-component';

class JobExpect extends Component {
    render() {
        return (
            <div className={"home-job"} >
                <Row>
                    <h5>TÌM VIỆC THEO NHÓM NGÀNH</h5>
                    <Col sm={24} md={12} lg={12} xl={12} xxl={12}>
                        <a href={`/result?brids=${2}`}>
                            <div className="expert-content">
                                <LazyLoadImage style={{ width: '100%', height: '100%' , marginBottom: "0.6vw"}} src={Banner1} alt={"Công việc liên quan đến kinh doanh"} />
                                <div className="job-expert">
                                    <Icon type={"pie-chart"} style={{ marginRight: 5 }} />
                                Nhóm ngành kinh doanh
                            </div>
                            </div>
                        </a>
                    </Col >
                    <Col sm={24} md={12} lg={12} xl={12} xxl={12}>
                        <a href={`/result?brids=${13}`}>
                            <div className="expert-content">
                                <LazyLoadImage style={{width: '100%', height: '100%' }} src={Banner2} alt={"Công việc liên quan đến kĩ thuật"} />
                                <div className="job-expert">
                                    <Icon type={"tool"} style={{ marginRight: 5 }} />
                                Nhóm ngành kĩ thuật
                            </div>
                            </div>
                        </a>
                    </Col>
                </Row>
            </div >
        );
    }
}

export default JobExpect;