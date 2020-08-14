import React, { Component } from 'react'
import './Notification.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Icon, Modal, Avatar, Empty, Popover } from 'antd';
import moment from 'moment';
import { _requestToServer } from '../../../../services/exec';
import { notiController } from '../../../../services/api/private.api';
import { authHeaders } from '../../../../services/auth';
import { PUT } from '../../../../const/method';
import { STUDENT_HOST } from '../../../../environment/development';
import { IptLetter, Timer } from "../../common/Common";
import { REDUX_SAGA } from '../../../../const/actions';

class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_loading: true,
            visible: false,
            data: {},
            createdDate: '',
            id: '',
            noti: [],
        }
    };


    componentDidMount() {
        this.props.getNotiData(0);
        this.setState({ is_loading: false });
        document.addEventListener("keydown", (event) => {
            if (event.keyCode === 27) {
                this.props._closeNoti();
            }
        })
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.noti !== prevState.noti) {
            return {
                noti: nextProps.noti
            }
        }

        return null;
    }

    async _createRequest(id) {
        let { isAuthen } = this.props
        if (isAuthen) {
            await _requestToServer(PUT, null, notiController + `/${id}/seen/${true}`, STUDENT_HOST, authHeaders).then(res =>
                res && this.props.getNotiData(0));
        }
    };

    _allSee = () => {
        let { notifications } = this.state;
        let list_id = notifications.map((item) => {
            return item.id
        })

        this._createRequest(list_id);
    };

    _openPopup = (item, id) => {
        
        let createdDate = moment(item.createdDate).format('DD/MM/YYYY');
        this.setState({ data: item.data, visible: true, createdDate, id });
        this._createRequest(id)
       
    };

    _handleOk = (id) => {
        this.setState({ visible: false })
    };

    content = () => {

        let { is_loading, loadingCpn } = this.state;
        let { noti } = this.props
        return (
            <div className='noti-content b_l b_r b_b'>
                <div className='noti-header b_b'>
                    <h6 >Thông báo</h6>
                </div>
                <div className='noti-info b_b'>
                    {is_loading ? loadingCpn : noti && noti.totalItems > 0 ?
                        (<ul>
                            {noti.items.map((item, index) =>
                                (<li key={index}
                                    className='li-info b_b'
                                    onClick={() => this._openPopup(item, item.id)}
                                    style={{ backgroundColor: item.seen ? 'white' : 'azure' }}>
                                    <div className='img-logo-noti'>
                                        <Avatar src={item.data.logoUrl} alt='type noti' style={{ width: "50px", height: "50px" }} />
                                    </div>
                                    <div className='data-noti'>
                                        <div className="content_li-info">
                                            Nhà tuyển dụng
                                                <IptLetter value={item.data.employerName} />
                                            đã
                                                            <IptLetter value={item.data.state === "ACCEPTED" ? " chấp nhận" : " từ chối"} />
                                            lời mời ứng tuyển
                                            <IptLetter value={item.data.jobTitle && item.data.jobTitle.toLowerCase()} />
                                            của bạn
                                                        </div>
                                        <Icon type="coffee" />
                                        <Timer value={item.createdDate} />
                                    </div>
                                </li>)
                            )
                            }
                        </ul>) :
                        <div className='none-data'>
                            <Empty description='Không có thông báo' />
                        </div>}
                </div>
                <div className='noti-footer'>
                    <p className='noti-footer-p'>
                        <Link to='/notifications'>
                            <Icon type="ordered-list" />
                            <label className='text-icon'>
                                Xem tất cả
                            </label>
                        </Link>
                       
                    </p>
                </div>
            </div>
        )
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", () => { })
    }

    render() {
        let { isMobile, show_noti } = this.props;
        let { visible, data, createdDate, id } = this.state;

        const noti_style = {
            display: "block",
            top: "0px",
        }

        if (isMobile) {
            if (show_noti) {
                noti_style.top = "0";
            } else {
                noti_style.top = "-110vh"
            }
        }

        return (
            <>
                <Modal
                    visible={visible}
                    title="Thông báo "
                    onOk={() => { this._handleOk(id) }}
                    onCancel={() => {
                        this.setState({ visible: false })
                    }}
                >
                    <div className='popup-noti'>
                        <h5>Đơn ứng tuyển: {data.jobName}</h5>
                        <div className='noti-image'>
                            <img src={data.logoUrl} alt='logo-company' />
                        </div>
                        <br/>
                        <p>Công ty {data.employerName} đã {data.state === 'ACCEPTED' ? ' chấp nhận' : ' từ chối'} lời mời ứng tuyển của bạn </p>
                        <p style={{ textAlign: "right" }}>
                            Thời gian: {createdDate}
                        </p>
                    </div>
                </Modal>
                {/* Notification */}
                {
                    isMobile ? (
                        <>
                            {this.props.children}
                            <div
                                className={
                                    'notification-mobile'
                                }
                                style={noti_style}
                            >
                                {this.content()}
                            </div>
                        </>
                    ) : <Popover
                        trigger='click'
                        content={
                            <div className='notification'>
                                {this.content()}
                            </div>
                        }
                        style={{ padding: 'none' }}
                    >
                            {this.props.children}
                        </Popover>
                }

            </>

        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    getNotiData: (pageIndex) => dispatch({ type: REDUX_SAGA.NOTI.GET_NOTI, pageIndex })
})

const mapStateToProps = (state) => ({
    noti: state.Noti,
    isAuthen: state.AuthState.isAuthen,
    isMobile: state.MobileState.isMobile
})

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
