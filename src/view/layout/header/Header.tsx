import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
//@ts-ignore
import logo from "../../../assets/image/logo-02.png";
import { connect } from "react-redux";
import "./Header.scss";
import clearStorage from "../../../services/clear-storage";
import { Icon, Badge, Menu, Dropdown, Avatar, Tooltip, Row, Col } from "antd";
import Notification from "./notification/Notification";
import { REDUX } from "../../../const/actions";
import { goBackWhenLogined } from "../../../utils/goBackWhenLogined";
import { LazyLoadImage } from 'react-lazy-load-image-component';
//@ts-ignore
import CHPlay from '../../../assets/image/CHPlay.png';
//@ts-ignore
import AppStore from '../../../assets/image/app-store.png';
//@ts-ignore
import QRCodeAppStore from '../../../assets/image/qr-code-appstore.png';
//@ts-ignore
import QRCodeCHPlay from '../../../assets/image/qr-code-chplay.png';
interface IProps {
  isAuthen?: boolean;
  show_noti?: boolean;
  hover_on?: boolean;
  openSideBar?: Function;
  noti?: any;
  show_bar?: boolean;
  eventStart?: boolean;
  logo?: string;
  primaryColor?: string;
  param?: string;
  primaryDarkColor?: string;
}

interface IState {
  show_menu: boolean;
  isAuthen: boolean;
  name: string;
  show_noti: boolean;
  show_header: boolean;
  hover_on: boolean;
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
    };
  }

  _handleStateMenu = () => {
    let { show_menu } = this.state;
    this.setState({ show_menu: !show_menu });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.isAuthen !== prevState.isAuthen) {
      let name = localStorage.getItem("name");
      return {
        name,
        isAuthen: nextProps.isAuthen,
      };
    } else
      return {
        name: "",
      };
  }

  _clearStorage = () => {
    clearStorage();
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  _showSideBar = () => {
    this.props.openSideBar();
  };

  _closeNoti = () => {
    this.setState({ show_noti: false });
  };

  _openNoti = () => {
    this.setState({ show_noti: true });
  };

  menuUser = () => {
    return (
      <Menu style={{ fontWeight: 500,  }}>
        <Menu.Item style={{ fontWeight: 500,  }}>
          <div>
            <Icon type="user" style={{marginRight: 5, color: "#1890ff"}}/><Link to="/profile">Hồ sơ</Link>
          </div>
        </Menu.Item>
        <Menu.Item style={{ fontWeight: 500,  }}>
          <div>
            <Icon type="key"style={{marginRight: 5, color: "#1890ff"}}/><Link to="/reset-password">Đổi mật khẩu</Link>
          </div>
        </Menu.Item >
        <Menu.Item style={{ fontWeight: 500,  }}>
          <div>
          <Icon type="history"style={{marginRight: 5, color: "#1890ff"}}/><Link to="/cong-viec-da-luu">Công việc đã lưu</Link>
          </div>
        </Menu.Item>
        <Menu.Item style={{ fontWeight: 500,  }}>
          <div>
          <Icon type="solution"style={{marginRight: 5, color: "#1890ff"}}/><Link to="/lich-su-ung-tuyen">Lịch sử ứng tuyển</Link>
          </div>
        </Menu.Item>
        <Menu.Item style={{ fontWeight: 500,fontStyle: "italic", color: "red"  }} onClick={this._clearStorage}>
          <Link
            to="/"
            style={{
              pointerEvents: "none",
            }}
          >
            <div style={{color: "red"}}>
              Đăng xuất
            </div>
          </Link>
        </Menu.Item>
      </Menu>
    );
  };

  render() {
    let { isAuthen, show_noti, hover_on } = this.state;
    let { noti, show_bar, eventStart, param } = this.props;
    let number_noti = 0;
    noti.items &&
      noti.items.forEach((item) => {
        !item.seen ? (number_noti += 1) : (number_noti += 0);
      });

    return (
      <>
        <div className="header" style={{ backgroundColor: "#1890ff" }}>
          <div className="logo">
            <Link to={eventStart ? `/${param}` : `/home${param}`}>
              <LazyLoadImage width="auto" height={45} src={logo} alt="itea-scan" />{" "}
            </Link>
          </div>
          <div className="direct-page">
            <div style={{ display: show_bar ? "none" : "block" }}>
              <a
                href={`/${this.props.param}`}
                style={{
                  display:
                    eventStart === false
                      ? "none"
                      : window.location.pathname === "/"
                        ? "none"
                        : "",
                  backgroundColor: this.props.primaryDarkColor,
                }}
              >
                <Icon type={"tags"} />
                Ngày hội việc làm
              </a>
              <a
                href={`/`}
                style={{
                  display: window.location.pathname === "/" ? "none" : "",
                }}
              >
                <Icon type={"home"} />
                Trang chủ
              </a>
              <a href="/result">
                <Icon type={"search"} />
                Tìm việc
              </a>
              
                <Dropdown trigger={['click']} overlay={
                    () => <Menu>
                    <Menu.Item key="0">
                      <Row>
                        <Col span={18}>
                          <a href={'https://apps.apple.com/vn/app/worksvn-sinh-vi%C3%AAn/id1492437454'}>
                            <LazyLoadImage src={AppStore} alt='AppleStore Tìm việc' height='50px' width='auto' />
                          </a>
                        </Col>
                        <Col span={6}>
                          <LazyLoadImage 
                          onClick={() => this.setState({ visible: true, showQRImageType: 1 }) }
                          src={QRCodeAppStore} alt='AppleStore Tìm việc QRCode' 
                          height='47px' 
                          width='auto' 
                          style={{ 
                            marginTop: '1.2px', 
                            marginLeft: '5px', 
                            cursor: 'pointer' }} 
                        />
                        </Col>
                      </Row>
                    </Menu.Item>
                    <Menu.Item key="1">
                      <Row>
                        <Col span={18}>
                          <a href={'https://play.google.com/store/apps/details?id=com.worksvn.candidate&hl=vi'}>
                            <LazyLoadImage src={CHPlay} alt='CHPlay Tìm việc' height='50px' width='auto' />
                          </a>
                        </Col>
                        <Col span={6}>
                          <LazyLoadImage 
                            onClick={() => { this.setState({ visible: true, showQRImageType: 2 }) }} 
                            src={QRCodeCHPlay} alt='CHPlay Tìm việc QRCode' 
                            height='47px' width='auto' 
                            style={{ marginTop: '1.2px', marginLeft: '5px', cursor: 'pointer' }} 
                          />
                        </Col>
                      </Row>
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item key="3" disabled>
                    Ứng dụng Worksvn trên điện thoại!
                    </Menu.Item>
                  </Menu>
                }>
              <a
                // href="http://qrco.de/worksvn-vieclam?fbclid=IwAR2nRSwHv0aFQyVagAIb1EmFBA-0SX4NY3VVDevPwAb5VXQN_qnywhvJfwI"
                // target="_blank"
                rel="noopener noreferrer"
              >
                <Icon
                  type="appstore"
                  theme="filled"
                  style={{ fontSize: "16.3px" }}
                />
                Ứng dụng di động
              </a>

                </Dropdown>
              <a href="/gross-to-net">
                <Icon
                  type={"dollar"}
                  style={{ fontSize: "16.8px" }}
                  theme='outlined'
                />
                Công cụ tính lương
              </a>
              <a
                href="https://employer.works.vn"
                target="_blank"
                rel="noopener noreferrer"
                className="employer"
              >
                <Icon
                  type="shop"
                  theme="filled"
                  style={{ fontSize: "16.8px" }}
                />
                Nhà Tuyển Dụng
              </a>
             
            </div>
          </div>
          <div
            className="function"
            style={{ display: show_bar ? "none" : "flex" }}
          >
            <Notification
              show_noti={show_noti}
              hover_on={hover_on}
              _closeNoti={this._closeNoti}
              _openNoti={this._openNoti}
            >
              <Tooltip title='Thông báo'>
                <span
                  className="label-function"
                  onClick={() => {
                    this.setState({ show_noti: !show_noti });
                  }}
                >
                  <Badge count={number_noti}>
                    <Icon type="bell" theme="filled" style={{ fontSize: 16 }} />
                  </Badge>
                </span>
              </Tooltip>
            </Notification>

            {/* Side Bar */}
            <span
              className="label-function show-mobile"
              onClick={this._showSideBar}
            >
              <Icon type="bars" onClick={() => this.props.openSideBar()} />
            </span>
            {isAuthen ? (
              //@ts-ignore
              <Dropdown
                overlay={this.menuUser}
                placement="bottomRight"
                trigger={["click"]}
              >
                <span
                  className="label-function hidden-mobile"
                  style={{ borderRadius: "25px", padding: 5 }}
                >
                  <Link to="/profile">
                    <Avatar
                      src={localStorage.getItem("avatarUrl")}
                      icon="user"
                      style={{
                        border: "solid #fff 1.5px",
                        objectFit: "cover",
                        margin: 2
                      }}
                    />
                  </Link>
                  {localStorage.getItem("name") ? (
                    <label className="label_name">
                      <b>{localStorage.getItem("name")}</b>
                    </label>
                  ) : null}
                </span>
              </Dropdown>
            ) : (
                <span className="label-login hidden-mobile">
                  <label className="login-btn" onClick={() => goBackWhenLogined("login")}>Đăng nhập</label>
                  <label className="login-btn" onClick={() => goBackWhenLogined("register")}>Đăng ký</label>
                </span>
              )}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthen: state.AuthState.isAuthen,
  noti: state.Noti,
  eventStart: state.EventStatusReducer.status,
  logo: state.DetailEvent.logo,
  primaryColor: state.DetailEvent.primaryColor,
  primaryDarkColor: state.DetailEvent.primaryDarkColor,
  param: state.DetailEvent.param,
});

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: (data, reload) =>
      dispatch({ type: REDUX.AUTHEN.FAIL_AUTHEN, data, reload }),
    openSideBar: () => dispatch({ type: REDUX.SIDE_BAR.OPEN_SIDE_BAR }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
