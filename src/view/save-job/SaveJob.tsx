import React from 'react';
import Layout from '../layout/Layout';
import { Row, Col, Icon, Pagination, Tooltip, Empty, Avatar, Spin, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment'
import { SAVED_JOB } from '../../services/api/private.api';
import { authHeaders } from '../../services/auth';
import { _requestToServer } from '../../services/exec';
import { STUDENT_HOST } from '../../environment/development';
import { moveScroll } from '../../utils/moveScroll';
// import { limitString } from '../../utils/limitString';
import { REDUX_SAGA } from '../../const/actions';
import { DELETE } from '../../const/method';
import { JobType } from '../layout/common/Common';

// const openNotification = () => {
//     const key = `open${Date.now()}`;
//     const btn = (
//         <Button type="primary" size="small" onClick={() => notification.close(key)}>
//             Confirm
//         </Button>
//     );

//     const description = () => (<div >Bạn đã xóa một công việc</div>)

//     notification.open({
//         message: 'WorkVn Thông báo',
//         description,
//         btn,
//         key,
//     });
// };

//  @ts-ignore
interface ISaveJobProp extends StateProps, DispatchProps {
    getJobSaveData?: (pageIndex?: number, pageSize?: number) => any;
    listSavedJobs?: any;
}

interface ISaveJobState {

}


class SaveJob extends React.PureComponent<ISaveJobProp, ISaveJobState>{
    async componentDidMount() {
        this._getSaveJobDateAndState()
    }

    _getSaveJobDateAndState() {
        moveScroll(0, 0, "smooth");
        this.props.getJobSaveData(0, 10);
    }

    _getJobSave = (event) => {
        this.props.getJobSaveData(event - 1, 10)
    }


    async _removejob(id) {
        let { isAuthen } = this.props;
        if (isAuthen) {
            let res = await _requestToServer(DELETE, [id], SAVED_JOB + `/saved`, STUDENT_HOST, authHeaders, true);
            if (res) {
                // openNotification();
                this.props.getJobSaveData(0)
            }
        }
    }

    render() {
        let { listSavedJobs } = this.props;
        let totalItems = listSavedJobs && listSavedJobs.totalItems;
        let totalPagination = totalItems
        return (
            <>

                <Layout>
                    <div className='content'>
                        <Row>
                            <Col></Col>
                            <Col>
                                <div className='history-content ' >
                                    <h5>Công việc đã lưu</h5>
                                    <div className='history-job'>
                                        {this.props.loading ? <div className='loading'><Spin /></div> :
                                            <Row>
                                                {listSavedJobs && listSavedJobs.items && listSavedJobs.items.length > 0 ? listSavedJobs.items.map((item, index) => {

                                                    return (<Col key={index} xs={24} sm={12} md={8} lg={8} xl={8} xxl={8}>
                                                        <div className='job-detail fixed'>
                                                            <div className='image-job'>
                                                                <Avatar
                                                                    className='logo-company'
                                                                    shape='square'
                                                                    src={item.job && item.job.employerLogoUrl ? item.job.employerLogoUrl : ''}
                                                                    style={{ border: "solid #00000012 1px"  }}
                                                                    icon="shop"
                                                                    alt='history job'
                                                                />
                                                                <JobType>
                                                                    {item.job && item.job.jobType}
                                                                </JobType>
                                                                
                                                            </div>
                                                            <div className='content-job'>
                                                                <p>
                                                                    <Link target='_blank'
                                                                        to={    
                                                                            `/chi-tiet-cong-viec/${window.btoa(item.job && item.job.id)}`}>
                                                                        {item.job && item.job.jobTitle}
                                                                    </Link>
                                                                </p>
                                                                <div className='info-company'>
                                                                    <li>
                                                                        <Link to={`/employer/${window.btoa(item.job && item.job.employerID)}`}><Icon type="home" style={{ marginRight: 3 }} />{item.job && item.job.employerName}</Link>
                                                                    </li>
                                                                    <li>
                                                                        <Icon type='environment' style={{ marginRight: 3 }} />{item.job && item.job.address}
                                                                    </li>
                                                                </div>
                                                                <li style={{ fontSize: '0.7rem' }}>
                                                                    <Icon type="calendar" />{moment(item.saveTime).format('DD/MM/YY')}
                                                                </li>
                                                            </div>
                                                            <div className='content-job' style={{ display: item.job.schoolEventID === null ? 'none' : '' }}>
                                                                <Tooltip placement="bottom" title={"Việc làm sự kiện"}>
                                                                    <Icon type='tag' style={{ color: '#1890ff', marginBottom: 20 }} theme="filled" />
                                                                </Tooltip>
                                                                <Popconfirm
                                                                    okType="danger"
                                                                    title="Bạn muốn xóa công việc này?"
                                                                    style={{padding: '10px important'}}
                                                                    onConfirm={() => { this._removejob(item.job.id) }}
                                                                >
                                                                    <Icon type="delete"  twoToneColor="red"  theme="twoTone"/>
                                                                </Popconfirm>
                                                            </div>
                                                        </div>
                                                    </Col>)
                                                }) : <Empty style={{ padding: '15vh' }} description={<b>Bạn chưa lưu công việc nào</b>} />}
                                            </Row>
                                        }
                                        <div className='pagination-result'>
                                            <Pagination defaultCurrent={1} pageSize={10} total={totalPagination} onChange={this._getJobSave} showSizeChanger={false} />
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
    getJobSaveData: (pageIndex?: number, pageSize?: number) => dispatch({ type: REDUX_SAGA.SAVED_JOB.GET_SAVED_JOB, pageIndex, pageSize })
});

const mapStateToProps = (state) => {
    return {
        listSavedJobs: state.GetJobSave.data,
        isAuthen: state.AuthState.isAuthen,
        loading: state.GetJobSave.loading
    }
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(SaveJob);
