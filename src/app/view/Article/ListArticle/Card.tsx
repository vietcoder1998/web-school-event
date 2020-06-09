import React, { useState } from "react";
import { Avatar, Skeleton, Icon, Row, Col, Rate } from "antd";

import DefaultImage from "../../../../assets/image/base-image.jpg";
import AvatarDefault from "../../../../assets/image/avatar_default.png"
import { Link } from 'react-router-dom';
import './Card.scss'


export default function Card(props) {
    const [loading, setLoading] = useState(true);

    setTimeout(() => {
        setLoading(false)
    }, 1000);
    return (
        <Link to={`articleDetail/${props && props.item && props.item.id}`}>
            <div className="header-card">
                <Row>
                    <Col sm={10} md={10} lg={10} xl={10} xxl={10}>
                        <img
                            className="img-card-background"
                            src={
                                props && props.item && props.item.imageUrl
                                    ? props.item.imageUrl
                                    : DefaultImage
                            }
                            alt="info "
                        />
                    </Col>
                    <Col sm={14} md={14} lg={14} xl={14} xxl={14}>
                        <div className="info-card">
                            <div className='title'>{props && props.item && props.item.title}</div>
                            <div className="info-writor">
                                <div >
                                    <Skeleton
                                        avatar
                                        paragraph={{ rows: 2 }}
                                        active
                                        loading={loading}
                                    >
                                        <div>
                                            <div className='infor' style={{marginBottom: 10}}>
                                                <Avatar
                                                    src={
                                                        props && props.item && props.item.admin
                                                            ? props.item.admin.avatarUrl
                                                            : AvatarDefault
                                                    }
                                                    size={35}
                                                    icon={"user"}
                                                    style={{ marginRight: 5 }}
                                                />
                                                {props && props.item && (
                                                    props.item.admin.lastName +
                                                    " " +
                                                    props.item.admin.firstName
                                                )}
                                            </div>

                                        </div>
                                        <br/>
                                        <div>
                                            <div className='infor'>
                                                <Icon type={"eye"} />
                                                {props && props.item && props.item.viewNumber}
                                            </div>
                                            <div className='infor'>
                                                <Icon type={"message"} />
                                                {props && props.item && props.item.totalComment}
                                            </div>
                                            <div className='infor'>
                                                {props && props.item && <Rate allowHalf disabled value={props.item.averageRating} />}
                                            </div>
                                        </div>
                                    </Skeleton>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </Link>
    );
}
