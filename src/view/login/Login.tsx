import React, { Component } from "react";
import "./Login.scss";
import swal from "sweetalert";
// import * as auth from '../../service/auth';
import { connect } from "react-redux";
import { authUserPassword } from "../../services/api/private.api";
import { setAuthSate, loginHeaders } from '../../services/auth';
import { AUTH_HOST } from "../../environment/development";
import { Input, Tooltip, Icon, Button } from "antd";
import { Col } from "antd";
import { _requestToServer } from "../../services/exec";
import { POST } from "../../const/method";
import Layout from "../layout/Layout";
import { REDUX } from "../../const/actions";
// import queryString from "query-string";
//@ts-ignore
import logo from "../../assets/image/logo-01.png";
//@ts-ignore
import imageLogin from "../../assets/image/image-login.png";
import { goBackWhenLogined } from "../../utils/goBackWhenLogined";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FacebookProvider, LoginButton } from 'react-facebook';
// import { TYPE } from './../../const/type';

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
      await _requestToServer(
        POST,
        {
          client_id: process.env.REACT_APP_CLIENT_ID,
          sercret: process.env.REACT_APP_CLIENT_SECRET,
          fbAccessToken: data.tokenDetail.accessToken
        },
        "/api/authentication/facebook",
        process.env.REACT_APP_API_HOST,
        loginHeaders
      ).then((res) => {
        if (res) {
          
          this._loginAction(res)
        }
      })
    }
  }

  handleError = (error) => {
    this.setState({ error });
  }

  _loginAction = (res?: any, data?: any) => {
    if (res.data.target !== "STUDENT") {
      swal({
        title: "Worksvns thông báo",
        text: "Sai tên đăng nhập hoặc mật khẩu!",
        icon: "error",
        dangerMode: true,
      });
    } else {
      if (res.data.userExists === false) {
        console.log(res)
        localStorage.setItem("user_exists", 'false');
        localStorage.setItem("user_exists_userName", data.username);
        localStorage.setItem("user_exists_password", data.password);
        swal({
          title: "Worksvn thông báo",
          text: "Xác thực thông tin để đăng nhập",
          icon: "success",
          dangerMode: true,
        }).then(() => {
          window.location.assign("/register");
        });
      } else {
        setAuthSate(res);
        // this.props.setAuthen();
        let last_access = localStorage.getItem("last_access");
        last_access
          ? window.location.href = last_access
          : window.location.assign("/");
        // const parsed = queryString.parse(this.props.location.search);
        // console.log(parsed);
        // if (parsed.path) {
        //     window.location.assign(parsed.path);
        // } else if (last_access) {
        //     window.location.assign(last_access);
        // } else {
        //     window.location.assign('/');
        // }

        // console.log(this.props.location.search);
        //   const parsed = queryString.parse(this.props.location.search);
        //   // console.log(window.atob(parsed.path));
        //   // setTimeout(() => {
        //   var base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
        //   if (base64regex.test(parsed.path)) {
        //     if (window.atob(parsed.path)) {
        //       window.location.assign(window.atob(parsed.path));
        //     } else {
        //       window.location.assign("/");
        //     }
        //   } else {
        //     window.location.assign("/");
        //   }
        // }, 3000)
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
    )
      .then((res) => {
        if (res) {
          console.log(data)
          this._loginAction(res,data)
        }
      })
      .finally(() => {
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
        <div className="login-content">
          <Col
            xs={mobile ? 24 : 12}
            sm={mobile ? 24 : 12}
            md={mobile ? 24 : 12}
            lg={mobile ? 24 : 10}
            xl={mobile ? 24 : 10}
            xxl={mobile ? 24 : 10}
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
                    prefix={
                      <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    suffix={
                      <Tooltip title="Email của bạn">
                        <Icon
                          type="info-circle"
                          style={{ color: "rgba(0,0,0,.45)" }}
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
                    type="primary"
                    onClick={this._createResponse}
                    block
                  >
                    {loading ? <Icon type="loading" /> : "Đăng nhập"}
                  </Button>
                </p>
                {/* <p>
                  <label>hoặc</label>
                </p> */}
                {/* <p className="a_c">
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
                      <Icon type="facebook" />Đăng nhập với facebook
                    </LoginButton>
                  </FacebookProvider>
                </p> */}
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
            xl={mobile ? 0 : 14}
            xxl={mobile ? 0 : 14}
          >
            <LazyLoadImage alt="Đăng nhập tìm việc" src={imageLogin} className="image-login" />
          </Col>
        </div>

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
