import React from 'react';
import Layout from '../layout/Layout';
import { Row, Col, Icon, Pagination, Tooltip, notification, Button, Empty, Avatar, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment'
import { SAVED_JOB } from '../../services/api/private.api';
import { authHeaders } from '../../services/auth';
import { _requestToServer } from '../../services/exec';
import { STUDENT_HOST } from '../../environment/development';
import { moveScroll } from '../../utils/moveScroll';
// import { limitString } from '../../utils/limitString';
import { REDUX_SAGA, REDUX } from '../../const/actions';
import { DELETE } from '../../const/method';
import { JobType } from '../layout/common/Common'
const openNotification = () => {
    const key = `open${Date.now()}`;
    const btn = (
        <Button type="primary" size="small" onClick={() => notification.close(key)}>
            Confirm
        </Button>
    );

    const description = () => (<div >Bạn đã xóa một công việc</div>)

    notification.open({
        message: 'WorkVn Thông báo',
        description,
        btn,
        key,
    });
};

//  @ts-ignore
interface ISaveJobProp extends StateProps, DispatchProps {
    getHistoryApplyData?: (pageIndex?: number, pageSize?: number) => any;
}

interface ISaveJobState {

}

class HistoryApply extends React.PureComponent<ISaveJobProp, ISaveJobState>{
    async componentDidMount() {
        this._getSaveJobDateAndState()
    }

    _getSaveJobDateAndState() {
        moveScroll(0, 0, "smooth");
        this.props.getHistoryApplyData(0, 10);
    }

    _getJobSave = (event) => {
        this.props.getHistoryApplyData(event - 1, 10)
    }


    async _removejob(id) {
        let { isAuthen } = this.props;
        if (isAuthen) {
            let res = await _requestToServer(DELETE, null, SAVED_JOB + `/${id}/saved`, STUDENT_HOST, authHeaders, null, null);
            if (res) {
                openNotification();
                this.props.getHistoryApplyData(0)
            }
        }
    }

    render() {
        let { listHistoryApply } = this.props;
        let totalItems = listHistoryApply && listHistoryApply.totalItems;
        let totalPagination = totalItems

        return (
            <>

                <Layout>
                    <div className='content'>
                        <Row>
                            <Col></Col>
                            <Col>
                                <div className='history-content ' >
                                    <h5>Lịch sử ứng tuyển</h5>
                                    <div className='history-job'>
                                        {this.props.loading ? <div className='loading'><Spin /></div> :
                                            <Row>
                                                {listHistoryApply && listHistoryApply.items && listHistoryApply.items.length > 0 ? listHistoryApply.items.map((item, index) => {
                                                    let typeSpan = { type: '', color: '', state: '' };
                                                    switch (item.state) {
                                                        case 'PENDING':
                                                            typeSpan.type = 'fa fa-pause-circle-o';
                                                            typeSpan.color = '#ff8d00';
                                                            typeSpan.state = 'Đang chờ phản hồi';

                                                            break;
                                                        case 'REJECTED':
                                                            typeSpan.type = 'fa fa-times-circle-o';
                                                            typeSpan.color = '#ff6060';
                                                            typeSpan.state = 'Đã bị từ chối';
                                                            break;
                                                        case 'ACCEPTED':
                                                            typeSpan.type = 'fa fa-check-circle-o';
                                                            typeSpan.color = '#00c100';
                                                            typeSpan.state = 'Đã được chấp nhận';
                                                            break;
                                                        default:
                                                            break;
                                                    }
                                                    return (<Col key={index} xs={24} sm={12} md={8} lg={6} xl={5} xxl={6}>
                                                        <div className='job-detail '>
                                                            <div className='image-job'>
                                                                <Avatar
                                                                    className='logo-company'
                                                                    shape='square'
                                                                    src={item.job && item.job.employerLogoUrl ? item.job.employerLogoUrl : ''}
                                                                    icon="shop"
                                                                    alt='history job'
                                                                    style={{
                                                                        borderRadius: 5,
                                                                        border: "solid gray 1px"
                                                                    }}
                                                                />
                                                                <JobType>
                                                                    {item.job && item.job.jobType}
                                                                </JobType>
                                                                {/* <Tooltip title='Bạn có muốn xóa công việc' placement="bottom" >
                                                                <li onClick={() => { this._removejob(item.id) }}>
                                                                    <Button type='danger' size='small'> <Icon type="delete" />Xóa</Button>
                                                                </li>
                                                            </Tooltip> */}
                                                            </div>
                                                            <div className='content-job'>
                                                                <div style={{}} className='job-content'>
                                                                    <Link

                                                                        onClick={() => {
                                                                            // this.props.setEventID(null)
                                                                            if (item.job.schoolEventID) {
                                                                                window.open(`/event-job-detail/${window.btoa(item.job && item.job.id)}?data=${window.btoa('eventID=' + item.job.schoolEventID)}`)
                                                                            } else {
                                                                                window.open(`/chi-tiet-cong-viec/${window.btoa(item.job && item.job.id)}`)
                                                                            }
                                                                        }}
                                                                    >{item.job && item.job.jobTitle}</Link>
                                                                </div>
                                                                <div className='info-company'>
                                                                    <li>
                                                                        <Link to={`/employer/${window.btoa(item.job && item.job.employerID)}`}><Icon type="home" style={{ marginRight: 3 }} />{item.job && item.job.employerName}</Link>
                                                                    </li>
                                                                    <li>
                                                                        <Icon type='environment' style={{ marginRight: 3 }} />{item.job && item.job.address}
                                                                    </li>
                                                                </div>
                                                                <span style={{ backgroundColor: typeSpan.color, color: '#fff', padding: '3px 5px' }}>
                                                                    <i className={typeSpan.type} aria-hidden="true" style={{ fontSize: "1.1em" }}></i>
                                                                    <span style={{ fontWeight: 550, fontSize: '0.9em' }}>{typeSpan.state}</span></span>
                                                                <span style={{ display: 'flex' }}>
                                                                    <li style={{ fontSize: '0.7rem' }}>
                                                                        <Icon type="calendar" />
                                                                        Ngày gửi: {moment(item.createdDate).format('DD/MM/YYYY')}
                                                                    </li>
                                                                    {item.repliedDate !== -1 ?
                                                                        <li style={{ fontSize: '0.7rem', marginLeft: 10 }}>
                                                                            <Icon type="calendar" />
                                                                            Ngày phản hồi: {moment(item.repliedDate).format('DD/MM/YYYY')}
                                                                        </li> : null}
                                                                </span>

                                                            </div>
                                                            <div className='content-job' style={{ display: item.job.schoolEventID === null ? 'none' : '' }}>
                                                                <Tooltip placement="bottom" title={"Việc làm sự kiện"}>
                                                                    <Icon type='tag' style={{ color: 'red' }} />
                                                                </Tooltip>
                                                            </div>
                                                        </div>
                                                    </Col>)
                                                }) : <Empty style={{ padding: '15vh' }} description={<b>Bạn chưa có ứng tuyển nào</b>} />}
                                            </Row>
                                        }
                                        <div className='pagination-result'>
                                            <Pagination showSizeChanger defaultCurrent={1} pageSize={10} total={totalPagination} onChange={this._getJobSave} />
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col></Col>
                        </Row>
                    </div>
                </Layout>
            </>

        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    getHistoryApplyData: (pageIndex?: number, pageSize?: number) => dispatch({ type: REDUX_SAGA.HISTORY_APPLY.GET_HISTORY_APPLY, pageIndex, pageSize }),
    setEventID: (eventID?: string) => dispatch({ type: REDUX.EVENT.SET_EVENT_ID, eventID })
});

const mapStateToProps = (state) => {
    return {
        listHistoryApply: state.GetHistoryApply.data,
        loading: state.GetHistoryApply.loading,
        isAuthen: state.AuthState.isAuthen
    }
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(HistoryApply);
