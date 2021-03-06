import React, { Component } from "react";
import "./Login.scss";
import swal from "sweetalert";
// import * as auth from '../../service/auth';
import { connect } from "react-redux";
import { authUserPassword } from "../../services/api/private.api";
import { loginHeaders } from '../../services/auth';
import { AUTH_HOST } from "../../environment/development";
import { Input, Tooltip, Icon, Button, Row, Carousel } from "antd";
import { Col } from "antd";
import { _requestToServer } from "../../services/exec";
import { POST } from "../../const/method";
import Layout from "../layout/Layout";
import { REDUX } from "../../const/actions";
// import queryString from "query-string";
//@ts-ignore
import logo from "../../assets/image/logo-01.png";
//@ts-ignore
import imageLogin from "../../assets/image/Break750x600.jpg";
//@ts-ignore
import imageEvent from "../../assets/image/DIEMCHAMDAUTIEN750X600.jpg";
import { goBackWhenLogined } from "../../utils/goBackWhenLogined";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FacebookProvider, LoginButton } from 'react-facebook';
import setupLogin from "../../config/setup-login";
import { TYPE } from "../../const/type";
// import { exceptionShowNotiConfig } from "../../config/config-exception";
// import { TYPE } from './../../const/type';

interface IState {

}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: "",
      password: "",
      loading: false,
    };

    this.key_icon = <i className="fa fa-key"></i>;
    this.letter_icon = <i className="fa fa-envelope"></i>;
  }

  handleUsername = (e) => {
    this.setState({
      user_name: e.target.value.trim(),
    });
  };

  handlePassword = (e) => {
    this.setState({
      password: e.target.value.trim(),
    });
  };

  _createResponse = () => {
    this.setState({ loading: true });
    this.getResponse();
  };

  onLoginFB = async (data) => {
    if (data) {
      console.log(data);
      localStorage.setItem("fb_actk", data.tokenDetail.accessToken)
      localStorage.setItem("fb_mail", data.profile.email)
      localStorage.setItem("fb_fn", data.profile.first_name)
      localStorage.setItem("fb_ls", data.profile.last_name)

      await _requestToServer(
        POST,
        {
          client_id: process.env.REACT_APP_CLIENT_ID,
          sercret: process.env.REACT_APP_CLIENT_SECRET,
          fbAccessToken: data.tokenDetail.accessToken
        },
        "/api/oauth2/authentication/facebook",
        process.env.REACT_APP_API_HOST,
        loginHeaders
      ).then((res) => {
        if (res) {
          localStorage.setItem("login_type", "FB")
          this._loginAction(res, res.data)
        }
      })
    }
  }

  handleError = (error) => {
    this.setState({ error });
  }

  _loginAction = (res?: any, data?: any, type?: string) => {
    if (res && res.data) {
      setupLogin(data)
    }

    if (type === TYPE.ALL) {
      localStorage.setItem("user_exists", 'true');
      localStorage.setItem("login_type", "BASIC")
      let last_access = localStorage.getItem("last_access");
      last_access
        ? window.location.href = last_access
        : window.location.assign("/");
    } else
      if (data.target === "STUDENT") {
        if (data.userExists) {
          localStorage.setItem("user_exists", 'true');
          let last_access = localStorage.getItem("last_access");
          last_access
            ? window.location.href = last_access
            : window.location.assign("/");
        } else {
          console.log(data);
          localStorage.setItem("user_exists", 'false');
          localStorage.setItem("fb_uid", data.userID);

          swal({
            title: "Worksvn thông báo",
            text: "Xác thực thông tin để đăng nhập",
            icon: "success",
            dangerMode: true,
          }).then(() => {
            window.location.assign("/register");
          });
        }
      }
  }

  getResponse = async () => {
    let data = {
      username: this.state.user_name,
      password: this.state.password,
    };

    _requestToServer(
      POST,
      data,
      authUserPassword,
      AUTH_HOST,
      loginHeaders,
      null,
      false
    ).then((res) => {
      if (res) {
        this._loginAction(res, res.data, TYPE.ALL)
        swal({
          title: "Worksvns thông báo",
          text: "Đăng nhập thành công",
          icon: "success",
          dangerMode: true,
        }).then(() => {
          let last_access = localStorage.getItem("last_access");
          last_access
            ? window.location.href = last_access
            : window.location.assign("/");
        });
      }
    }).catch(err => {
      console.log(err.response.data.msg);
      swal({
        title: "Worksvns thông báo",
        text: err.response.data.msg,
        icon: "error",
        dangerMode: true,
      });
    }).finally(() => {
      setTimeout(() => {
        this.setState({ loading: false });
      }, 1000);
    });
  };

  render() {
    let { user_name, password, loading } = this.state;
    let { mobile } = this.props;
    return (
      <Layout disableFooterData={false}>
        {/* <form> */}
        <Row className="login-content">
          <Col
            xs={mobile ? 24 : 12}
            sm={mobile ? 24 : 12}
            md={mobile ? 24 : 12}
            lg={mobile ? 24 : 10}
            xl={mobile ? 24 : 8}
            xxl={mobile ? 24 : 8}
          >
            <div className="login-form">
              <LazyLoadImage src={logo} alt="logo" width="240" height="80" />
              <p className="title a_c" style={{ fontWeight: 600 }}>
                ĐĂNG NHẬP
              </p>
              <form>
                <p className="nomal">
                  <Input
                    placeholder="Email"
                    size={"large"}
                    prefix={
                      <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    suffix={
                      <Tooltip title="Vui lòng nhập email">
                        <Icon
                          type={!user_name ? "exclamation" : ""}
                          style={{ color: "red" }}
                        />
                      </Tooltip>
                    }
                    value={user_name}
                    onChange={this.handleUsername}
                    type="text"
                  />
                </p>
                <p className="nomal">
                  <Input.Password
                    placeholder="Password"
                    size={"large"}
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    // suffix={
                    //     <Tooltip title="Điền đúng mật khẩu">
                    //         <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                    //     </Tooltip>
                    // }
                    value={password}
                    onChange={this.handlePassword}
                    onPressEnter={this._createResponse}
                    type="password"
                  />
                </p>
                <p className="fogot-password a_r">
                  <a href="/forgot-password" style={{ color: "gray" }}>
                    Quên mật khẩu ?
                  </a>
                </p>
                <p>
                  <Button
                    className="btn-login"
                    size={"large"}
                    type="primary"
                    onClick={this._createResponse}
                    block
                    icon={!loading ? "key" : "loading"}
                  >
                    {loading ? "" : "Đăng nhập"}
                  </Button>
                </p>
                <p>
                  <label>hoặc</label>
                </p>
                <p className="a_c">
                  <FacebookProvider
                    appId="184179509691561"
                    version='v8.0'
                    cookie={true}
                    xfbml={true}
                  >
                    <LoginButton
                      scope="email"
                      className="fb-login-btn btn-login a_l"
                      onCompleted={this.onLoginFB}
                      onError={this.handleError}
                    >
                      <Icon type="facebook" style={{ marginRight: 10 }} />Đăng nhập với facebook
                    </LoginButton>
                  </FacebookProvider>
                </p>
                <p className="a_c">
                  Bạn chưa có tài khoản ?{" "}
                  <label
                    onClick={() => goBackWhenLogined("register")}
                    style={{ color: "#fb4141" }}
                  >
                    <b>Đăng ký</b>
                  </label>
                </p>
              </form>
            </div>
          </Col>
          <Col
            xs={mobile ? 0 : 0}
            sm={mobile ? 0 : 0}
            md={mobile ? 0 : 12}
            lg={mobile ? 0 : 14}
            xl={mobile ? 0 : 16}
            xxl={mobile ? 0 : 16}
            style={{ marginTop: 10 }}
          >
            <Carousel
              dots={true}
              autoplay
              autoplaySpeed={3000}
              dotPosition={"bottom"}
            >
              <div style={{marginTop: -10}}>
                <a href={"https://www.facebook.com/WORKSVN.Official"} target="_blank" rel="noopener noreferrer">
                  <LazyLoadImage alt="Đăng nhập tìm việc" src={imageLogin} className="image-login" />
                </a>
              </div>
              <div style={{marginTop: -10}}>
                <a href={"https://www.facebook.com/WORKSVN.Official/photos/a.679864142789713/839440720165387/"} target="_blank" rel="noopener noreferrer">
                  <LazyLoadImage alt="Sự kiện trên works.vn" src={imageEvent} className="image-login" />
                </a>
              </div>
            </Carousel>
          </Col>
        </Row>
        {/* </form> */}
      </Layout >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    prop: state.prop,
    mobile: state.MobileState.isMobile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openPopup: (data) => dispatch({ type: REDUX.POPUP.OPEN_POPUP, data }),
    setAuthen: () => dispatch({ type: REDUX.AUTHEN.EXACT_AUTHEN }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
