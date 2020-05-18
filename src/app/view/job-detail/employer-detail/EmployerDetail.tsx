import React from 'react';
import { Row, Col, Rate, Icon, Avatar, Button, Pagination, Skeleton, Modal, Empty } from 'antd';
import { Link } from 'react-router-dom';
import { _requestToServer } from '../../../../services/exec';
import { RATE_EMPLOYER_CONTROLLER } from '../../../../services/api/private.api';
import { STUDENT_HOST } from '../../../../environment/development';
import { authHeaders } from '../../../../services/auth';
import { POST } from '../../../../const/method';
import { Input } from 'antd';
import './EmployerDetail.scss';
import { NotUpdate, JobType } from '../../layout/common/Common';
import { IEmployerDetail } from '../../../../models/employer-detail';
const { TextArea } = Input;
const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

interface EmployerDetailProps {
    employerDetail?: IEmployerDetail;
    employerMoreJob?: any;
    paging?: number;
    is_loading_more?: boolean;
    _getMoreJob?: Function;
}

interface EmployerDetailState {
    visible?: boolean;
    workingEnvironmentRating?: number;
    salaryRating?: number;
    comment?: string;
    confirmLoading?: boolean;
}

export default class EmployerDetail extends React.PureComponent<EmployerDetailProps, EmployerDetailState> {
    state: EmployerDetailState = {
        visible: false,
        workingEnvironmentRating: 0,
        salaryRating: 0,
        comment: "",
        confirmLoading: false,
    }

    _handleModal = () => {
        let { visible } = this.state;
        this.setState({ visible: !visible })
    }

    _handleWorkingEnvironmentRating = (event) => {
        this.setState({ workingEnvironmentRating: event })
    }

    _handleSalaryRating = (event) => {
        this.setState({ salaryRating: event })
    }

    _createRequest = async () => {
        let {
            workingEnvironmentRating,
            salaryRating,
            comment,
        } = this.state;
        let { id } = this.props.employerDetail;
        let data = { workingEnvironmentRating, salaryRating, comment: comment.trim() };
        await this.setState({ confirmLoading: true })
        await _requestToServer(POST, data, `${RATE_EMPLOYER_CONTROLLER}/${id}/ratings`, STUDENT_HOST, authHeaders, null, true);
        await this.setState({ confirmLoading: false })
    }

    render() {
        let { employerDetail, employerMoreJob, paging, is_loading_more } = this.props;
        let { visible, confirmLoading, workingEnvironmentRating, salaryRating } = this.state;
        return (
            <>
                <Modal title="ĐÁNH GIÁ NHÀ TUYỂN DỤNG"
                    visible={visible}
                    onOk={this._handleModal}
                    footer={[
                        <Button key='cancel'
                            onClick={this._handleModal}
                            type='danger'
                        >Huỷ</Button>,
                        <Button key='ok'
                            type='primary'
                            onClick={this._createRequest}
                        ><Icon type="edit" />Đánh giá</Button>
                    ]}
                    confirmLoading={confirmLoading}
                    onCancel={this._handleModal}
                >
                    <div className="employer-rating_popup">
                        <div className="employer-rating_value">
                            <p>
                                Môi trường làm việc
                            </p>
                            <div className='star-rating'>
                                <Rate
                                    tooltips={desc}
                                    onChange={this._handleWorkingEnvironmentRating}
                                    value={workingEnvironmentRating}
                                />
                            </div>
                            <p>
                                Hỗ trợ lương thưởng
                            </p>
                            <div className='star-rating'>
                                <Rate tooltips={desc} onChange={this._handleSalaryRating} value={salaryRating} />
                            </div>
                        </div>
                        <TextArea
                            maxLength={160}
                            rows={4}
                            onChange={
                                event => this.setState({ comment: event.target.value })
                            }
                            placeholder="Viết nhận xét về nhà tuyển dụng (vui lòng không sử dụng các từ ngữ thô tục)"
                        />
                    </div>
                </Modal>
                <div className='job-detail'>
                    <div className='all-rating '>
                        <div className='company-header'>
                            <h6>Đánh giá</h6>
                        </div>
                        <Row>
                            <Col xs={12} className='b_r'>
                                <div className='rating b_b'>
                                    <p style={{ fontSize: '1.05em', color: 'black' }}>Môi trường làm việc </p>
                                    <div className='star-rating'>
                                        <Rate
                                            disabled
                                            defaultValue={employerDetail.rating && employerDetail.rating.workingEnvironmentRating}
                                            style={{ fontSize: '0.9rem' }}
                                        />
                                    </div>
                                    <span><label><Icon type='user' style={{ fontSize: '12px' }} /></label>{employerDetail.rating && employerDetail.rating.ratingCount} lượt đánh giá</span>
                                </div>
                            </Col>
                            <Col xs={12}>
                                <div className='rating b_b'>
                                    <p style={{ fontSize: '1.05em', color: 'black' }}>Đãi ngộ nhân viên</p>
                                    <div className='star-rating'>
                                        <Rate
                                            disabled
                                            defaultValue={employerDetail.rating && employerDetail.rating.salaryRating}
                                            style={{ fontSize: '0.9rem' }}
                                        />
                                    </div>
                                    <span><label><Icon type='user' style={{ fontSize: '12px' }} /></label>{employerDetail.rating && employerDetail.rating.ratingCount} lượt đánh giá</span>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className='company-info' >
                        <h6>Thông tin liên hệ</h6>
                        <p>
                            <Icon type="home" style={{ color: '#168ECD' }} />Tên nhà tuyển dụng: {employerDetail.employerName ? employerDetail.employerName : <NotUpdate />}
                        </p>
                        <p>
                            <Icon type="dollar" style={{ color: '#168ECD' }} /> Mã số thuế: {employerDetail.taxCode ? employerDetail.taxCode : <NotUpdate />}
                        </p>
                        <p>
                            <Icon type="environment" style={{ color: '#168ECD' }} />  Địa chỉ: {employerDetail.address ? employerDetail.address : <NotUpdate />}
                        </p>
                        <p>
                            <Icon type="mail" style={{ color: '#168ECD' }} />  Mail: {employerDetail.email ? employerDetail.email : <NotUpdate />}
                        </p>
                        <p style={{ textAlign: "right" }}>

                        </p>
                    </div>
                    <div className='company-description b_b'>
                        <h6>Mô tả sơ lược</h6>
                        <p style={{ padding: '15px' }}>
                            {employerDetail.description ? employerDetail.description : <NotUpdate />}
                        </p>
                    </div>
                    <div className='company-more '>
                        <h6> Công việc đang tuyển</h6>
                        <Row>
                            <div className='company-job-more a_c'>
                                {employerMoreJob.items && employerMoreJob ? employerMoreJob.items.map((item, index) =>
                                    (<Col key={index} xs={24} sm={12} md={12} lg={12} xl={12}>
                                        {is_loading_more ? <Skeleton loading={true} avatar paragraph={{ rows: 1 }} /> :
                                            (<div className='item-job' >
                                                <div style={{ flex: 3 }}>
                                                    <Avatar shape={'square'} src={item.employerLogoUrl} size={60} style={{ margin: "10px 10px 0 10px"}} />
                                                    <JobType width='60px' fontSize='0.7em'>
                                                        {item && item.jobType}
                                                    </JobType>
                                                </div>
                                                <div style={{ flex: 9 }}>
                                                    <p style={{ textAlign: 'left', fontSize: '1.1em', fontWeight: 500 }} className="info-silimar-job"><Link to={`/job-detail/${window.btoa(item.id)}`} target='_blank'>{item.jobTitle}</Link></p>
                                                    <p style={{ textAlign: 'left' }} className="info-silimar-job"><span><Icon type='environment' style={{marginRight: 3}} />{item.address}</span></p>
                                                </div>
                                            </div>)}
                                    </Col>)
                                ) : <Empty description={"Không tìm thấy công việc nào"} />
                                }
                            </div>
                        </Row>
                        <div className='pagination-job a_c'>
                            <Pagination defaultCurrent={1} total={paging} onChange={(event) => this.props._getMoreJob(event)} />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
