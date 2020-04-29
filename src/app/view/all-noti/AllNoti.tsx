import React, { PureComponent } from 'react';
import { Col, Row, Tooltip, Icon, Pagination, Avatar, Empty } from 'antd';
import './AllNoti.scss';
import { connect } from 'react-redux';
import { _requestToServer } from '../../../services/exec';
import { notiController } from '../../../services/api/private.api';
import { PUT } from '../../../const/method';
import { CANDIDATE_HOST } from '../../../environment/development';
import { authHeaders } from '../../../services/auth';
import { timeConverter } from '../../../utils/convertTime';
import Layout from '../layout/Layout';
import { Titlelabel, FirstLetter } from '../layout/common/Common';
import { REDUX_SAGA } from '../../../const/actions';

interface IAllNotiProps extends StateProps, DispatchProps {
    getNotiData: Function;
    isAuthen: boolean;
}

interface IAllNotiState {
    pageIndex: number;
}
class AllNoti extends PureComponent<IAllNotiProps, IAllNotiState> {

    constructor(props) {
        super(props);
        this.state = {
            pageIndex: 0
        };
    }

    componentDidMount() {
        let { pageIndex } = this.state;
        this.props.getNotiData(pageIndex);
    }

    async _createRequest(id: string, state: boolean) {
        let { pageIndex } = this.state;

        await _requestToServer(PUT, null, notiController + `/${id}/seen/${state}`, CANDIDATE_HOST, authHeaders, null, false).then(res => {
            if (res) {
                this.props.getNotiData(pageIndex - 1)
            }
        });
    }

    render() {
        let { noti } = this.props;
        return (
            <Layout disableFooterData={false} >
                <div className='content'>
                    <Row>
                        <Col></Col>
                        <Col>
                            <div className='all-noti-content '>
                                <div className='noti-header '>
                                    <h5 >Thông báo của bạn</h5>
                                </div>
                                <div className='list-content '>
                                        {noti && noti.items && noti.items.length > 0 ? noti.items.map((item, index) => {
                                            let state_noti = item.seen ? 'not-seen' : 'seen';
                                            let li_c_n = "b_b li-noti " + state_noti;
                                            let is_success = false;
                                            item.data.state === "ACCEPTED" ? is_success = true : is_success = false;
                                            let state_candidate = is_success ? "Chấp nhận" : "Từ chối";
                                            let type_icon = is_success ? "success" : "error";
                                            let color_icon = is_success ? "green" : "red";

                                            return (<div key={index}
                                                className={`${li_c_n}`}>
                                                <div className='li-noti__div'>
                                                    <Avatar shape='square' src={item.data.logoUrl} style={{ width: "50px", height: "50px" }} alt='li_noti_img' />
                                                </div>
                                                <div className='data-noti'>
                                                    <ul>
                                                        <li>
                                                            <Titlelabel value="Công việc :" />
                                                            <FirstLetter value={item.data && item.data.jobTitle && item.data.jobTitle.toLowerCase()} />
                                                        </li>
                                                        <li>
                                                            <Titlelabel value="Nhà tuyển dụng :" />
                                                            <FirstLetter value={item.data && item.data.employerName && item.data.employerName.toLowerCase()} />
                                                        </li>
                                                        <li>
                                                            <Titlelabel value="Trạng thái :" />
                                                            <FirstLetter value={state_candidate} />
                                                            <Icon type={type_icon} twoToneColor={color_icon} />
                                                        </li>
                                                        <li>
                                                            <Titlelabel value="Loại :" />
                                                            <FirstLetter value={item.type === 'REPLY_JOB' ? ' Ứng tuyển' : ''} />
                                                        </li>
                                                        <li>
                                                            <Titlelabel value="Thời gian :" />
                                                            <FirstLetter value={' ' + timeConverter(item.createdDate, 1000)} />
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className='set-noti' onClick={() => this._createRequest(item.id, !item.seen)}>
                                                    {item.seen ?
                                                        <Tooltip title='Đánh dấu là chưa đọc' >
                                                            <Icon type='eye' />
                                                        </Tooltip> :
                                                        <Tooltip title='Đánh dấu là đã đọc' >
                                                            <Icon type="eye-invisible" />
                                                        </Tooltip>}
                                                </div>
                                            </div>)
                                        }): <Empty description={"Không có thông báo nào"} />}
                                </div>
                            </div>
                            <div className='pagination-result a_c'>
                                <Pagination
                                    defaultCurrent={1}
                                    total={noti.totalItems} 
                                    onChange={(event) => {
                                        this.props.getNotiData(event - 1);
                                        this.setState({ pageIndex: event })
                                    }} />
                            </div>
                        </Col>
                        <Col></Col>
                    </Row>
                </div>

            </Layout>
        );
    }
}

const mapStateToProps = state => ({
    noti: state.Noti,
    isAuthen: state.AuthState.isAuthen
});

const mapDispatchToProps = (dispatch) => ({
    getNotiData: (pageIndex) => dispatch({ type: REDUX_SAGA.NOTI.GET_NOTI, pageIndex })
})

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;


export default connect(mapStateToProps, mapDispatchToProps)(AllNoti)
