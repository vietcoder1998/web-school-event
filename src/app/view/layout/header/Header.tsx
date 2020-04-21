import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
//@ts-ignore
import logo from '../../../../assets/image/logo-01.png';
import { connect } from 'react-redux';
import './Header.scss';
import clearStorage from '../../../../services/clear-storage';
import { Icon, Badge, Menu, Dropdown, Avatar } from 'antd';
import Notification from './notification/Notification';
import { REDUX } from '../../../../const/actions';

interface IProps {
  isAuthen?: boolean,
  show_noti?: boolean,
  hover_on?: boolean,
  openSideBar?: Function,
  noti?: any,
  show_bar?: boolean,
}

interface IState {
  show_menu: boolean,
  isAuthen: boolean,
  name: string,
  show_noti: boolean,
  show_header: boolean,
  hover_on: boolean,
}

class Header extends PureComponent<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      show_menu: false,
      isAuthen: false,
      name: "",
      show_noti: false,
      show_header: true,
      hover_on: false,
    }
  }

  _handleStateMenu = () => {
    let { show_menu } = this.state;
    this.setState({ show_menu: !show_menu })
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.isAuthen !== prevState.isAuthen) {
      let name = localStorage.getItem("name");
      return {
        name,
        isAuthen: nextProps.isAuthen,
      }
    } else return {
      name: "",
    }
  }

  _clearStorage = () => {
    clearStorage();
    setTimeout(() => { window.location.reload() }, 2000);
  }

  _showSideBar = () => {
    this.props.openSideBar();
  }

  _closeNoti = () => {
    this.setState({ show_noti: false })
  };

  _openNoti = () => {
    this.setState({ show_noti: true })
  }

  menuUser = () => {
    return (<Menu>
      <Menu.Item><a href='/profile'>Hồ sơ</a></Menu.Item>
      <Menu.Item><a href='/reset-password'>Đổi mật khẩu</a></Menu.Item>
      <Menu.Item onClick={this._clearStorage}>
        <a href='/' style={{
          pointerEvents: "none"
        }}>Đăng xuất</a>
      </Menu.Item>
    </Menu >)
  }

  render() {
    let { isAuthen, show_noti, hover_on } = this.state;
    let { noti, show_bar } = this.props;
    let number_noti = 0;
    noti.items && noti.items.forEach(item => { !item.seen ? number_noti += 1 : number_noti += 0 });

    return (
      <>
        <div className="header">
          <div className="logo">
            <Link to="/"><img width={120} height={40} src={logo} alt="itea-scan" /> </Link>
          </div>
          <div className='direct-page'
          >
            <div
              style={{ display: show_bar ? "none" : "block" }}
            >
              <a href='/result'>Tìm việc</a>
              <a href='https://employer.works.vn' target='_blank' rel="noopener noreferrer">Nhà tuyển dụng</a>
              {
                isAuthen ? <a href='/save-job'><Icon type="book" />Lịch sử </a> : ''
              }
              <a href='https://play.google.com/store/apps/details?id=com.worksvn.candidate&hl=vi' target='_blank' rel="noopener noreferrer">
                App Android
                </a>
              <a href='https://apps.apple.com/vn/app/works-vn-t%C3%ACm-vi%E1%BB%87c/id1487662808' target='_blank' rel="noopener noreferrer">
                App IOS
                </a>
            </div>
          </div>
          <div className='function'
            style={{ display: show_bar ? "none" : "flex" }}
          >
            {/* IconBell */}
            <span
              className='label-function'
              onClick={() => this.setState({ show_noti: !show_noti })}
            >
              <Notification
                show_noti={show_noti}
                hover_on={hover_on}
                _closeNoti={this._closeNoti}
                _openNoti={this._openNoti}
              >
                <Badge count={number_noti}>
                  <Icon type="bell" />
                </Badge>
              </Notification>
            </span>

            {/* Side Bar */}
            <span className='label-function show-mobile' onClick={this._showSideBar}>
              <Icon type="bars" onClick={() => this.props.openSideBar()} />
            </span>
            {isAuthen ?
              //@ts-ignore
              <Dropdown style={{ width: "300px" }} overlay={this.menuUser} placement="bottomRight" >
                <span className='label-function hidden-mobile' >
                  <Avatar src={localStorage.getItem("avatarUrl")} icon="user" style={{ border: "solid #7ecaff 2px" }} />
                  {localStorage.getItem("name") ? <label className="label_name">{localStorage.getItem("name")}</label> : null}
                </span>
              </Dropdown>
              :
              (<span className='label-login hidden-mobile'>
                <a href='/login'>
                  Đăng nhập
                  </a>
                <a href='/register'>
                  Đăng Kí
                </a>
              </span>
              )}
          </div>

        </div>
      </ >
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthen: state.AuthState.isAuthen,
  noti: state.Noti
})

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: (data, reload) => dispatch({ type: REDUX.AUTHEN.FAIL_AUTHEN, data, reload }),
    openSideBar: () => dispatch({ type: REDUX.SIDE_BAR.OPEN_SIDE_BAR }),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);