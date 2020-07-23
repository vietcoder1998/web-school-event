import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
//@ts-ignore
import logo from "../../../../assets/image/logo-02.png";
import { connect } from "react-redux";
import "./Header.scss";
import clearStorage from "../../../../services/clear-storage";
import { Icon, Badge, Menu, Dropdown, Avatar } from "antd";
import Notification from "./notification/Notification";
import { REDUX } from "../../../../const/actions";
import { goBackWhenLogined } from "../../../../utils/goBackWhenLogined";
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
      <Menu>
        <Menu.Item>
          <a href="/profile">Hồ sơ</a>
        </Menu.Item>
        <Menu.Item>
          <a href="/reset-password">Đổi mật khẩu</a>
        </Menu.Item>
        <Menu.Item>
          <a href="/save-job">Công việc đã lưu</a>
        </Menu.Item>
        <Menu.Item>
          <a href="/history-apply">Lịch sử ứng tuyển</a>
        </Menu.Item>
        <Menu.Item onClick={this._clearStorage}>
          <a
            href="/"
            style={{
              pointerEvents: "none",
            }}
          >
            Đăng xuất
          </a>
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
              <img width="auto" height={45} src={logo} alt="itea-scan" />{" "}
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
                href={`/home${this.props.param}`}
                style={{
                  display: window.location.pathname === "/home" ? "none" : "",
                }}
              >
                <Icon type={"home"} />
                Việc làm
              </a>
              <a href="/result" style={{ display: isAuthen ? "" : "none" }}>
                <Icon type={"search"} />
                Tìm kiếm
              </a>
              <a
                href="http://qrco.de/worksvn-vieclam?fbclid=IwAR2nRSwHv0aFQyVagAIb1EmFBA-0SX4NY3VVDevPwAb5VXQN_qnywhvJfwI"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon
                  type="appstore"
                  theme="filled"
                  style={{ fontSize: "16.3px" }}
                />
                Ứng dụng trên điện thoại
              </a>
              <a
                href="/announcement/all"
                
                style={{
                  display: window.location.pathname.split('/')[1] === "announcement" ? "none" : "",
                }}
              >
                <Icon type={"fileOut"} />
                Bài viết
              </a>
              <a
                href="https://employer.works.vn"
                target="_blank"
                rel="noopener noreferrer"
                className="employer"
              >
                <Icon
                  type="bank"
                  theme="filled"
                  style={{ fontSize: "16.8px"}}
                />
                Nhà Tuyển Dụng
              </a>
             
            </div>
          </div>
          <div
            className="function"
            style={{ display: show_bar ? "none" : "flex" }}
          >
            {/* IconBell */}

            <Notification
              show_noti={show_noti}
              hover_on={hover_on}
              _closeNoti={this._closeNoti}
              _openNoti={this._openNoti}
            >
              <span
                className="label-function"
                onClick={() => {
                  this.setState({ show_noti: !show_noti });
                }}
              >
                <Badge count={number_noti}>
                  <Icon type="bell" theme="filled" />
                </Badge>
              </span>
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
              <Dropdown overlay={this.menuUser} placement="bottomRight">
                <span
                  className="label-function hidden-mobile"
                  style={{ borderRadius: "5%" }}
                >
                  <Avatar
                    src={localStorage.getItem("avatarUrl")}
                    icon="user"
                    style={{ border: "solid #fff 1.5px", objectFit: "cover" }}
                  />
                  {localStorage.getItem("name") ? (
                    <label className="label_name">
                      {localStorage.getItem("name")}
                    </label>
                  ) : null}
                </span>
              </Dropdown>
            ) : (
              <span className="label-login hidden-mobile">
                <a onClick={() => goBackWhenLogined("login")}>Đăng nhập</a>
                <span
                  style={{
                    borderRight: "solid #efefef 0.8px",
                    padding: "0px 0px 2.2px",
                  }}
                ></span>
                <a onClick={() => goBackWhenLogined("register")}>Đăng ký</a>
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
