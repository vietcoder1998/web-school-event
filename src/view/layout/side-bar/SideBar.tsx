import React, { Component } from 'react';
import './SideBar.scss';
import { connect } from 'react-redux';
import clearStorage from '../../../services/clear-storage';
import { Icon, Drawer, Avatar } from 'antd';
import { REDUX } from '../../../const/actions';
// import CoverImage from '../../../assets/image/Abstract-Envelope.svg';
import { LazyLoadImage } from 'react-lazy-load-image-component';
//@ts-ignore
import logo from "../../../assets/image/logo-01.png";


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
        let { show, isAuthen, eventStart } = this.props;
        return (
            <Drawer
                placement="left"
                title={
                    <LazyLoadImage src={logo} alt="logo" width="240" height="80" style={{marginL: -20}} />
                }
                visible={show}
                onClose={() => this._closeSideBar()}
            >
                <div className="content-sidebar">
                    <ul>
                        <li><a href={'/'}><Icon type="home" />Trang chủ</a></li>
                        <li><a href='/event' style={{ display: eventStart === false ? 'none' : window.location.pathname === '/' ? "none" : '' }}><Icon type="tags" />Sự kiện</a></li>

                        <li style={{ display: isAuthen ? 'block' : 'none' }}><a href='/gross-to-net'><Icon type="dollar" /><label className='text-icon'>Công cụ tính lương</label></a></li>

                        <li style={{ color: 'gray', cursor: 'not-allowed', opacity: 0.5, pointerEvents: 'none' }}><a href='/'><Icon type="user-add" />Tạo CV</a></li>
                        <li style={{ display: isAuthen ? 'block' : 'none' }}><a href='/result'><Icon type="search" /><label className='text-icon'>Tìm việc</label></a></li>

                        <li style={{ display: isAuthen ? 'block' : 'none' }}><a href='/notifications'><Icon type="notification" /><label className='text-icon'>Thông báo</label></a></li>
                        <li style={{ display: isAuthen ? 'block' : 'none' }}><a href='/profile'><Icon type="user" /><label className='text-icon'>Hồ sơ</label></a></li>
                        <li style={{ display: isAuthen ? 'block' : 'none' }}><a href='lich-su-ung-tu'><Icon type="solution" /><label className='text-icon'>Lịch sử ứng tuyển</label></a></li>
                        <li style={{ display: isAuthen ? 'block' : 'none' }}><a href='/cong-viec-da-luu'><Icon type="history" /><label className='text-icon'>Công việc đã lưu</label></a></li>
                        <li style={{ display: isAuthen ? 'block' : 'none' }} onClick={this._clearStorage}><a style={{ pointerEvents: "none" }} href='/'><Icon type="logout" /><label className='text-icon'>Đăng xuất</label></a></li>
                        <li style={{ display: isAuthen ? 'none' : 'block' }}><a href='/login'><Icon type="key" /><label className='text-icon'>Đăng nhập</label></a></li>
                        <li style={{ display: isAuthen ? 'none' : 'block' }}><a href='/register'><Icon type="solution" /><label className='text-icon'>Đăng kí</label></a></li>
                    </ul>
                </div>
            </Drawer>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthen: state.AuthState.isAuthen,
    show_popup: state.PopupState,
    show: state.SideBarState.show,
    eventStart: state.EventStatusReducer.status
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    logOut: (reload) => dispatch({ type: REDUX.POPUP.OPEN_POPUP, reload }),
    closeSideBar: () => dispatch({ type: REDUX.SIDE_BAR.CLOSE_SIDE_BAR })
})

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);