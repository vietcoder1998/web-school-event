import React, { Component } from 'react';
import './SideBar.scss';
import { connect } from 'react-redux';
import clearStorage from '../../../services/clear-storage';
import { 
    Icon, 
    Drawer, 
    // Avatar 
} from 'antd';
import { REDUX } from '../../../const/actions';
// import CoverImage from '../../../assets/image/Abstract-Envelope.svg';
import { LazyLoadImage } from 'react-lazy-load-image-component';
//@ts-ignore
import logo from "../../../assets/image/logo-01.png";
import { Link } from "react-router-dom"


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
                    <LazyLoadImage src={logo} alt="logo" width="240" height="80" style={{ marginLeft: -20 }} />
                }
                visible={show}
                onClose={() => this._closeSideBar()}
            >
                <div className="content-sidebar" onClick={() => this._closeSideBar()}>
                    <ul>
                        <li><Link to={'/'}><Icon type="home" />Trang chủ</Link></li>
                        <li><Link to='/event' style={{ display: eventStart === false ? 'none' : window.location.pathname === '/' ? "none" : '' }}><Icon type="tags" />Sự kiện</Link></li>

                        <li style={{ display: isAuthen ? 'block' : 'none' }}><Link to='/gross-to-net'><Icon type="dollar" /><label className='text-icon'>Công cụ tính lương</label></Link></li>

                        <li style={{ color: 'gray', cursor: 'not-allowed', opacity: 0.5, pointerEvents: 'none' }}><Link to='/'><Icon type="user-add" />Tạo CV</Link></li>
                        <li style={{ display: isAuthen ? 'block' : 'none' }}><Link to='/result'><Icon type="search" /><label className='text-icon'>Tìm việc</label></Link></li>

                        <li style={{ display: isAuthen ? 'block' : 'none' }}><Link to='/thong-bao'><Icon type="notification" /><label className='text-icon'>Thông báo</label></Link></li>
                        <li style={{ display: isAuthen ? 'block' : 'none' }}><Link to='/profile'><Icon type="user" /><label className='text-icon'>Hồ sơ</label></Link></li>
                        <li style={{ display: isAuthen ? 'block' : 'none' }}><Link to='lich-su-ung-tuyen'><Icon type="solution" /><label className='text-icon'>Lịch sử ứng tuyển</label></Link></li>
                        <li style={{ display: isAuthen ? 'block' : 'none' }}><Link to='/cong-viec-da-luu'><Icon type="history" /><label className='text-icon'>Công việc đã lưu</label></Link></li>
                        <li style={{ display: isAuthen ? 'block' : 'none' }} onClick={this._clearStorage}><Link style={{ pointerEvents: "none" }} to='/'><Icon type="logout" /><label className='text-icon'>Đăng xuất</label></Link></li>
                        <li style={{ display: isAuthen ? 'none' : 'block' }}><Link to='/login'><Icon type="key" /><label className='text-icon'>Đăng nhập</label></Link></li>
                        <li style={{ display: isAuthen ? 'none' : 'block' }}><Link to='/register'><Icon type="solution" /><label className='text-icon'>Đăng kí</label></Link></li>
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