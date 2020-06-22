import React, { Component } from 'react'
import { Icon, Avatar, Row, Col, Tabs, Card, Modal, Skeleton, Rate, Pagination, Empty, Button, Input } from 'antd';
import './EmInfo.scss';
// @ts-ignore
import defaultImage from './../../../assets/image/base-image.jpg';
// @ts-ignore
import { NotUpdate, IptLetterP } from './../layout/common/Common';
import { IEmControllerDetail } from './../../../models/em-controller-detail';
import { connect } from 'react-redux';
import { REDUX_SAGA } from '../../../const/actions';
import Layout from '../layout/Layout';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { _requestToServer } from '../../../services/exec';
import { GET, POST } from '../../../const/method';
import { STUDENT_HOST } from '../../../environment/development';
import { PROFILE_EMPLOYER } from '../../../services/api/private.api';
import { authHeaders } from '../../../services/auth';
import swal from 'sweetalert';

const { TextArea } = Input;
const { TabPane } = Tabs;
const { Meta } = Card;

interface IEmployerInfoProps {
    employerDetail?: IEmControllerDetail,
    employerMoreJob?: any,
    eventEmployerMoreJob?: any,
    getEmployerDetail?: Function,
    getEmployerMoreJob?: Function,
    getEventEmployerMoreJob?: Function,
    match?: any,
    loading?: boolean,
    isAuthen?: any,
    param?: any
};
interface IState {
    onErrLogo?: boolean;
    onErrCover?: boolean;
    visible?: boolean;
    workingEnvironmentRating?: any;
    salaryRating?: any;
    comment?: string;
    loadingSubmitRate?: boolean
}

// class FixDescription extends Component
class EmployerInfo extends Component<IEmployerInfoProps, IState> {
    constructor(props) {
        super(props)
        this.state = {
            onErrLogo: false,
            onErrCover: false,
            visible: false,
            workingEnvironmentRating: 0,
            salaryRating: 0,
            comment: null,
            loadingSubmitRate: false 
        }
        this.txtErr = null
    }
    componentDidMount() {
        this.props.getEmployerDetail(window.atob(this.props.match.params.id));
        this.props.getEventEmployerMoreJob(0, 6, window.atob(this.props.match.params.id));
    }


    showModal = () => {
        if (this.props.isAuthen) {
            _requestToServer(GET, null, PROFILE_EMPLOYER + `/${window.atob(this.props.match.params.id)}/rating`, STUDENT_HOST, authHeaders, null, null, false, true)
                .then((res) => {
                    // console.log(res)
                    if(res && res.code === 200) {
                        this.setState({
                            workingEnvironmentRating: res.data.workingEnvironmentRating,
                            salaryRating: res.data.salaryRating,
                            comment: res.data.comment
                        })
                    }
                    this.setState({ visible: true })
                })
        } else {
            swal({ title: "Tính năng yêu cầu đăng nhập", icon: "error", text: 'Bạn chưa đăng nhập!' })
        }

        // setVisible(true)
    };
    handleOk = () => {
        // console.log(valid())
        let { workingEnvironmentRating, salaryRating, comment } = this.state
        if (!this.valid()) {
            swal({ title: "Thông báo", icon: "error", text: this.txtErr })
        } else {
            this.setState({ loadingSubmitRate: true })
            let data = {
                workingEnvironmentRating, salaryRating, comment
            }
            _requestToServer(POST, data, PROFILE_EMPLOYER + `/${window.atob(this.props.match.params.id)}/rating`, STUDENT_HOST, authHeaders, null, null)
                .then((res) => {
                    // console.log(res)
                    if(res && res.code === 200) {
                        swal({ title: "Thành công", icon: "success", text: 'Đánh giá nhà tuyển dụng thành công!' })
                    }
                    // setWorkingEnvironmentRating(2)
                })
                .finally(() => {
                    this.setState({ visible: false, loadingSubmitRate: false})
                })
        }

        // setVisible(false)
    }
    handleCancel = () => {
        this.setState({ visible: false })
        // setVisible(false)
    }
    handleComment = (event) => {
        this.setState({ comment: event.target.value })
        // setComment(event.target.value)
    }
    valid() {
        if (!this.state.workingEnvironmentRating) {
            //   setTxtErr('Chưa đánh gía môi trường làm việc')
            this.txtErr = 'Chưa đánh gía môi trường làm việc'
            return false;
        } else if (!this.state.salaryRating) {
            this.txtErr = 'Chưa đánh gía đãi ngộ nhân viên'
            return false;
        } else if (!this.state.comment) {
            this.txtErr = 'Chưa nhập nhận xét'
            return false;
        }
        return true
    }
    render() {
        let { employerDetail, employerMoreJob, loading, eventEmployerMoreJob, param } = this.props
        let { onErrCover, visible, salaryRating, workingEnvironmentRating, comment, onErrLogo, loadingSubmitRate } = this.state
        return (
            <Layout>
                <div className="employer-info content">
                    <div className="employer-info-header test">
                        {/* LogoUrl */}
                        {/* <div> */}
                        {employerDetail && employerDetail.coverUrl ?
                            <img
                                className="cover-image-profile "
                                src={!onErrCover && employerDetail && employerDetail.coverUrl ? employerDetail.coverUrl : null}
                                alt={"base"}
                                onError={() => this.setState({ onErrCover: true })}
                            /> :
                            <div className="cover-image-profile" style={{ backgroundColor: 'rgb(214, 214, 214)' }} />}
                        {/* </div> */}

                        <div className="block-image">
                            <div
                                className="content-avatar"
                            >
                                {employerDetail && employerDetail.logoUrl ?
                                    <Avatar
                                        // @ts-ignore
                                        src={!onErrLogo && employerDetail && employerDetail.logoUrl ? employerDetail.logoUrl : defaultImage}
                                        style={{
                                            height: "8vw",
                                            width: "8vw",
                                            fontSize: 60,
                                            border: 'solid #168ECD 3px',
                                            zIndex: 1
                                        }}
                                        // @ts-ignore
                                        onError={() => setErrLogo(true)}
                                    /> : <div style={{ height: '8vw', width: '8vw', zIndex: 1, border: 'solid #168ECD 3px', backgroundColor: 'rgb(214, 214, 214)', borderRadius: '50%' }} />}
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
                    {/* <Divider /> */}
                    <Modal
                        title="Đánh giá nhà tuyển dụng"
                        visible={visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={[
                            <Button key="back" onClick={this.handleCancel}>
                              Huỷ
                            </Button>,
                            <Button key="submit" type="primary" loading={loadingSubmitRate} onClick={this.handleOk}>
                              Ok
                            </Button>,
                          ]}
                    >
                        <Row>
                            <Col sm={24} md={12} lg={12} xl={12} xxl={12}>
                                <div>Lương thưởng</div>
                                <Rate value={salaryRating} onChange={(value) => {
                                    this.setState({ salaryRating: value })
                                }} />

                            </Col>
                            <Col sm={24} md={12} lg={12} xl={12} xxl={12}>
                                <div>Môi trường làm việc</div>
                                <Rate value={workingEnvironmentRating} onChange={(value) => {
                                    this.setState({ workingEnvironmentRating: value })
                                }} />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 15 }}>
                            <div style={{ marginBottom: 5 }}>Nhận xét</div>
                            <TextArea rows={4} placeholder='Nhập nhận xét của bạn' onChange={this.handleComment} value={comment} />
                            {/* <textarea placeholder='Nhập nhận xét của bạn' onChange={handleComment} value={comment}></textarea> */}
                        </Row>
                    </Modal>
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
                                    <Col sm={24} md={24} lg={24} xl={24} xxl={24} style={{ border: '0.5px dashed rgb(191, 191, 191)', marginBottom: 15 }}></Col>
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
                                    <Col sm={24} md={24} lg={24} xl={24} xxl={24} style={{ border: '0.5px dashed rgb(191, 191, 191)', marginBottom: 15 }}></Col>
                                    <Col sm={24} md={24} lg={24} xl={24} xxl={24}>
                                        <Card bordered={false}>
                                            <Button type="primary" onClick={this.showModal}><i class="fa fa-pencil" aria-hidden="true" style={{ marginRight: 5 }}></i>Viết đánh giá</Button>
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
                                                    <img className='ic' src={employerDetail && employerDetail.identityCardFrontImageUrl === null ? defaultImage : employerDetail.identityCardFrontImageUrl} alt='front description' />
                                                </Skeleton>
                                            </div>
                                        </Col>
                                        <Col xs={24} md={12} lg={12} xl={12} xxl={24} >
                                            <div className="ic-ct-img">
                                                <IptLetterP children={"Ảnh văn phòng sau"} />
                                                <Skeleton avatar loading={employerDetail ? false : true} >
                                                    <img className='ic' src={employerDetail && employerDetail.identityCardBackImageUrl === null ? defaultImage : employerDetail.identityCardBackImageUrl} alt='front description' />
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
                                                {loading ? <Skeleton loading={true} avatar paragraph={{ rows: 1 }} /> :
                                                    <div className='item-job ' >
                                                        <div style={{ flex: 3 }}>
                                                            <Avatar shape={'square'} src={item.employerLogoUrl} size={60} style={{ margin: "10px 10px 0 10px" }} />
                                                            {/* <JobType width='60px' fontSize='0.7em'>
                                                                {item && item.jobType}
                                                            </JobType> */}
                                                        </div>
                                                        <div style={{ flex: 9 }}>
                                                            <p style={{ textAlign: 'left', fontSize: '1.1em', fontWeight: 500 }} className="info-silimar-job"><Link to={`/job-detail/${window.btoa(item.id)}${param}`} target='_blank'>{item.jobTitle}</Link></p>
                                                            <p style={{ textAlign: 'left' }} className="info-silimar-job"><span><Icon type='environment' style={{ marginRight: 3 }} />{item.address}</span></p>
                                                        </div>

                                                        {/* <Avatar src={item.employerLogoUrl} style={{ width: "60px", height: "60px", margin: "10px", borderRadius: 0 }} /> */}
                                                        {/* <p><Link to={`/job-detail/${window.btoa(item.id)}`} target='_blank'>{limitString(item.jobTitle)}</Link></p>
                                                        <p><span><Icon type='environment' />{limitString(item.address)}</span></p> */}
                                                    </div>}
                                                {/* </Skeleton> */}
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
                                            (event) => this.props.getEmployerMoreJob(event - 1, 6, window.atob(this.props.match.params.id))
                                        }
                                    />
                                </div>
                            </TabPane>
                            <TabPane tab="Các công việc trong sự kiện" key="4">
                                <Row>
                                    <div className='company-job-more a_c'>
                                        {eventEmployerMoreJob && eventEmployerMoreJob.items ? eventEmployerMoreJob.items.map((item, index) =>
                                            (<Col key={index} xs={24} sm={12} md={12} lg={12} xl={8}>
                                                {loading ? <Skeleton loading={true} avatar paragraph={{ rows: 1 }} /> :
                                                    <div className='item-job ' >
                                                        <div style={{ flex: 3 }}>
                                                            <Avatar shape={'square'} src={item.employerLogoUrl} size={60} style={{ margin: "10px 10px 0 10px" }} />
                                                            {/* <JobType width='60px' fontSize='0.7em'>
                                                                {item && item.jobType}
                                                            </JobType> */}
                                                        </div>
                                                        <div style={{ flex: 9 }}>
                                                            <p style={{ textAlign: 'left', fontSize: '1.1em', fontWeight: 500 }} className="info-silimar-job"><Link to={`/event-job-detail/${window.btoa(item.id)}${param}`} target='_blank'>{item.jobTitle}</Link></p>
                                                            <p style={{ textAlign: 'left' }} className="info-silimar-job"><span><Icon type='environment' style={{ marginRight: 3 }} />{item.address}</span></p>
                                                        </div>

                                                        {/* <Avatar src={item.employerLogoUrl} style={{ width: "60px", height: "60px", margin: "10px", borderRadius: 0 }} /> */}
                                                        {/* <p><Link to={`/job-detail/${window.btoa(item.id)}`} target='_blank'>{limitString(item.jobTitle)}</Link></p>
                                                        <p><span><Icon type='environment' />{limitString(item.address)}</span></p> */}
                                                    </div>}
                                                {/* </Skeleton> */}
                                            </Col>)
                                        ) : <Empty description={"Không tìm thấy công việc nào"} />
                                        }
                                    </div>
                                </Row>
                                <div className='pagination-job a_c'>
                                    <Pagination
                                        defaultCurrent={1}
                                        total={eventEmployerMoreJob && eventEmployerMoreJob.totalItems}
                                        onChange={
                                            (event) => this.props.getEventEmployerMoreJob(event - 1, 6, window.atob(this.props.match.params.id))
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

}

const mapStateToProps = state => ({
    employerDetail: state.EmployerDetail,
    employerMoreJob: state.EmployerMoreJob.data,
    loading: state.EmployerMoreJob.loading,
    isAuthen: state.AuthState.isAuthen,
    eventEmployerMoreJob: state.EventEmployerMoreJob.data,
    param: state.DetailEvent.param

});

const mapDispatchToProps = (dispatch) => ({
    getEmployerDetail: (id) => dispatch({ type: REDUX_SAGA.EMPLOYER_DETAIL.GET_EMPLOYER_DETAIL, id }),
    getEmployerMoreJob: (pageIndex?: number, pageSize?: number, id?: string) =>
        dispatch({ type: REDUX_SAGA.EMPLOYER_MORE_JOB.GET_EMPLOYER_MORE_JOB, pageIndex, pageSize, id }),
    getEventEmployerMoreJob: (pageIndex?: number, pageSize?: number, id?: string) =>
        dispatch({ type: REDUX_SAGA.EVENT.EMPLOYER.MORE_JOB, pageIndex, pageSize, id }),
})

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployerInfo)

