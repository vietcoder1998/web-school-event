import React from 'react'
import { Icon, Avatar, Row, Col, Tabs, Card, Divider, Skeleton, Rate, Pagination, Empty } from 'antd';
import './EmInfo.scss';
// @ts-ignore
import backGround from './../../../assets/image/base-image.jpg';
// @ts-ignore
import avatar from './../../../assets/image/test_avatar.jpg';
import { NotUpdate, IptLetterP } from './../layout/common/Common';
import { IEmControllerDetail } from './../../../models/em-controller-detail';
import { connect } from 'react-redux';
import { REDUX_SAGA } from '../../../const/actions';
import Layout from '../layout/Layout';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { limitString } from '../../../utils/limitString';

const { TabPane } = Tabs;
const { Meta } = Card;

interface IEmployerInfoProps {
    employerDetail?: IEmControllerDetail,
    employerMoreJob?: any,
    getEmployerDetail?: Function,
    getEmployerMoreJob?: Function,
    match?: any
};

function EmployerInfo(props: IEmployerInfoProps) {
    let { employerDetail, employerMoreJob } = props;

    React.useEffect(() => {
        props.getEmployerDetail(window.atob(props.match.params.id));
        props.getEmployerMoreJob(0, 6, window.atob(props.match.params.id));
    }, [])

    // Error loading 
    let [onErrLogo, setErrLogo] = React.useState(false);
    let [onErrCover, setErrCover] = React.useState(false);

    return (
        <Layout>
            <div className="employer-info content">
                <div className="employer-info-header test">
                    {/* LogoUrl */}
                    <img
                        className="cover-image-profile "
                        src={!onErrCover && employerDetail && employerDetail.coverUrl ? employerDetail.coverUrl : backGround}
                        alt={"base"}
                        onError={() => setErrCover(true)}
                    />
                    <div className="block-image">
                        <div
                            className="content-avatar"
                        >
                            <Avatar
                                // @ts-ignore
                                src={!onErrLogo && employerDetail && employerDetail.logoUrl ? employerDetail.logoUrl : avatar}
                                style={{
                                    height: "8vw",
                                    width: "8vw",
                                    fontSize: 60,
                                    border: 'solid #168ECD 3px',
                                    zIndex: 1
                                }}
                                // @ts-ignore
                                onError={() => setErrLogo(true)}
                            />
                            <div
                                style={{
                                    width: '100%',
                                    height: '50%',
                                    position: 'absolute',
                                    bottom: -1,
                                    zIndex: 0,
                                    backgroundColor: '#ffffff'
                                }}
                            />
                        </div>
                        <div className={'name-employer'}>
                            <div>
                                {employerDetail && employerDetail.employerName ? employerDetail.employerName : <NotUpdate />}
                            </div>
                            <Icon
                                type="safety-certificate"
                                theme="filled"
                                style={{
                                    color:
                                        employerDetail &&
                                            employerDetail.profileVerified ? 'greenyellow' : 'red'
                                }}
                            />
                        </div>
                    </div>
                </div>
                <Divider />
                <div className="employer-info-body">
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Giới thiệu" key="1">
                            <Row>
                                <Col sm={24} md={12} lg={12} xl={12} xxl={8}>
                                    <Card bordered={false}>
                                        <Meta
                                            avatar={
                                                <Icon type='profile' />
                                            }
                                            title="Tên nhà tuyển dụng"
                                            description={
                                                employerDetail &&
                                                    employerDetail.employerName ?
                                                    employerDetail.employerName :
                                                    <NotUpdate />
                                            }
                                        />
                                    </Card>
                                </Col>
                                <Col sm={24} md={12} lg={12} xl={12} xxl={8}>
                                    <Card bordered={false}>
                                        <Meta
                                            avatar={
                                                <Icon type='mail' />
                                            }
                                            title="Thư điện tử"
                                            description={employerDetail && employerDetail.email ? employerDetail.email : <NotUpdate />}
                                        />
                                    </Card>
                                </Col>
                                <Col sm={24} md={12} lg={12} xl={12} xxl={8}>
                                    <Card bordered={false}>
                                        <Meta
                                            avatar={
                                                <Icon type='phone' />
                                            }
                                            title="Số điện thoại"
                                            description={employerDetail && employerDetail.phone ? employerDetail.phone : <NotUpdate />}
                                        />
                                    </Card>
                                </Col>
                                <Col sm={24} md={12} lg={12} xl={12} xxl={8}>
                                    <Card bordered={false}>
                                        <Meta
                                            avatar={
                                                <Icon type='environment' />
                                            }
                                            title="Địa chỉ"
                                            description={employerDetail && employerDetail.address ? employerDetail.address : <NotUpdate />}
                                        />
                                    </Card>
                                </Col>
                                <Col sm={24} md={12} lg={12} xl={12} xxl={8}>
                                    <Card bordered={false}>
                                        <Meta
                                            avatar={
                                                <Icon type='environment' />
                                            }
                                            title="Mã số thuế"
                                            description={employerDetail && employerDetail.taxCode ? employerDetail.taxCode : <NotUpdate />}
                                        />
                                    </Card>
                                </Col>
                                <Col sm={24} md={24} lg={24} xl={24} xxl={24}>
                                    <Card bordered={false}>
                                        <Meta
                                            avatar={
                                                <Icon type='home' />
                                            }
                                            title="Mô tả sơ lược"
                                            description={employerDetail && employerDetail.description ? employerDetail.description : <NotUpdate />}
                                        />
                                    </Card>
                                </Col>
                                <Col sm={24} md={24} lg={24} xl={24} xxl={24}>
                                    <Card bordered={false}>
                                        <Meta
                                            avatar={
                                                <Icon type='star' />
                                            }
                                            title={`Đánh giá (${employerDetail && employerDetail.rating ? employerDetail.rating.ratingCount : 0})`}
                                            description={employerDetail && employerDetail.rating ?
                                                <Row>
                                                    <Col sm={24} md={12} lg={12} xl={12} xxl={12}>
                                                        <p>Lương thưởng</p>
                                                        <Rate value={employerDetail.rating.salaryRating} disabled />
                                                    </Col>
                                                    <Col sm={24} md={12} lg={12} xl={12} xxl={12}>
                                                        <p>Môi trường làm việc</p>
                                                        <Rate value={employerDetail.rating.workingEnvironmentRating} disabled />
                                                    </Col>
                                                </Row>
                                                : <NotUpdate msg='Chưa có đánh giá cụ thể' />}
                                        />
                                    </Card>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tab="Ảnh xác minh" key="2">
                            <div className='verified-profile'>
                                <Row>
                                    <Col xs={24} md={12} lg={12} xl={12} xxl={24} >
                                        <div className="ic-ct-img">
                                            <IptLetterP children={"Mặt trước giấy phép"} />
                                            <Skeleton avatar loading={employerDetail ? false : true} >
                                                <img className='ic' src={employerDetail && employerDetail.identityCardFrontImageUrl} alt='front description' />
                                            </Skeleton>
                                        </div>
                                    </Col>
                                    <Col xs={24} md={12} lg={12} xl={12} xxl={24} >
                                        <div className="ic-ct-img">
                                            <IptLetterP children={"Ảnh văn phòng sau"} />
                                            <Skeleton avatar loading={employerDetail ? false : true} >
                                                <img className='ic' src={employerDetail && employerDetail.identityCardBackImageUrl} alt='front description' />
                                            </Skeleton>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </TabPane>
                        <TabPane tab="Các công việc đang đăng tuyển" key="3">
                            <Row>
                                <div className='company-job-more a_c'>
                                    {employerMoreJob && employerMoreJob.items ? employerMoreJob.items.map((item, index) =>
                                        (<Col key={index} xs={24} sm={12} md={12} lg={12} xl={8}>
                                            <Skeleton loading={false} avatar paragraph={{ rows: 1 }} >
                                                <div className='item-job ' >
                                                    <Avatar src={item.employerLogoUrl} style={{ width: "60px", height: "60px", margin: "10px", border: "solid cornflowerblue 2px" }} />
                                                    <p><Link to={`/job-detail/${window.btoa(item.id)}`} target='_blank'>{limitString(item.jobTitle)}</Link></p>
                                                    <p><span><Icon type='environment' />{limitString(item.address)}</span></p>
                                                </div>
                                            </Skeleton>
                                        </Col>)
                                    ) : <Empty description={"Không tìm thấy công việc nào"} />
                                    }
                                </div>
                            </Row>
                            <div className='pagination-job a_c'>
                                <Pagination
                                    defaultCurrent={1}
                                    total={employerMoreJob && employerMoreJob.totalItems}
                                    onChange={
                                        (event) => props.getEmployerMoreJob(event - 1, 6, window.atob(props.match.params.id))
                                    }
                                />
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </div >
        </Layout>
    )
}

const mapStateToProps = state => ({
    employerDetail: state.EmployerDetail,
    employerMoreJob: state.EmployerMoreJob,
});

const mapDispatchToProps = (dispatch) => ({
    getEmployerDetail: (id) => dispatch({ type: REDUX_SAGA.EMPLOYER_DETAIL.GET_EMPLOYER_DETAIL, id }),
    getEmployerMoreJob: (pageIndex?: number, pageSize?: number, id?: string) =>
        dispatch({ type: REDUX_SAGA.EMPLOYER_MORE_JOB.GET_EMPLOYER_MORE_JOB, pageIndex, pageSize, id }),
})

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployerInfo)

