import React, { Component } from 'react';
import './SideBar.scss';
import { connect } from 'react-redux';
import clearStorage from '../../../../services/clear-storage';
import { Icon } from 'antd';
import { REDUX } from '../../../../const/actions';
// import CoverImage from '../../../assets/image/Abstract-Envelope.svg';


class SideBar extends Component {

    constructor() {
        super();
        this.state = {
            show: false
        }
    }

    _closeSideBar = () => {
        this.props.closeSideBar()
    }

    openBar = () => {
        this.setState({
            show: true
        })
    }

    _clearStorage = () => {
        clearStorage();
        setTimeout(() => { window.location.reload() }, 2500);
    }

    render() {
        let { show, isAuthen } = this.props;
        return (
            <div className="sidebar">
                <div className="background-sidebar" style={{ display: show ? 'block' : 'none' }} onClick={this._closeSideBar}></div>
                {/* Side Bar */}
                <div className="side-bar_right" style={{ marginLeft: show ? '0vw' : '-100vw' }}>
                    <div className=''>
                        <div className='close-sidebar'>
                            <Icon type="close" onClick={this._closeSideBar} />
                        </div>
                        {/* Cover Image */}


                        <div className="content-sidebar">
                            <ul>
                                <li><a href='/'><Icon type="home" />Trang chủ</a></li>
                                <li><a href='/'><i className="fa fa-briefcase"></i>Tìm việc</a></li>
                                <li style={{ color: 'gray', cursor: 'not-allowed', opacity: 0.5, pointerEvents: 'none' }}><a href='/'><Icon type="user-add" />Tạo CV</a></li>
                                <li className='b_b'><a href='/'><Icon type="book" />Kĩ năng</a></li>
                                <li style={{ display: isAuthen ? 'block' : 'none' }}><a href='/chat'><Icon type="message" /><label className='text-icon'>Tin nhắn</label></a></li>
                                <li style={{ display: isAuthen ? 'block' : 'none' }}><a href='/save-job'><Icon type="flag" /><label className='text-icon'>Lịch sử ứng tuyển</label></a></li>
                                <li style={{ display: isAuthen ? 'block' : 'none' }}><a href='/notifications'><Icon type="notification" /><label className='text-icon'>Thông báo</label></a></li>
                                <li style={{ display: isAuthen ? 'block' : 'none' }}><a href='/profile'><Icon type="user" /><label className='text-icon'>Hồ sơ</label></a></li>
                                <li style={{ display: isAuthen ? 'block' : 'none' }} onClick={this._clearStorage}><a style={{ pointerEvents: "none" }} href='/'><Icon type="logout" /><label className='text-icon'>Đăng xuất</label></a></li>
                                <li style={{ display: isAuthen ? 'none' : 'block' }}><a href='/login'><Icon type="key" /><label className='text-icon'>Đăng nhập</label></a></li>
                                <li style={{ display: isAuthen ? 'none' : 'block' }}><a href='/register'><Icon type="solution" /><label className='text-icon'>Đăng kí</label></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthen: state.AuthState.isAuthen,
    show_popup: state.PopupState,
    show: state.SideBarState.show,
    personalInfo: state.PersonalInfo.personalInfo
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    logOut: (reload) => dispatch({ type: REDUX.POPUP.OPEN_POPUP, reload }),
    closeSideBar: () => dispatch({ type: REDUX.SIDE_BAR.CLOSE_SIDE_BAR })
})

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);