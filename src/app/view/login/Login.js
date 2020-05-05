import React, { Component } from 'react';
import './Login.scss';

// import * as auth from '../../service/auth';
import { connect } from 'react-redux';
import { authUserPassword } from '../../../services/api/private.api';
import { setAuthSate, loginHeaders } from '../../../services/auth';
import { AUTH_HOST } from '../../../environment/development';
import { Input, Tooltip, Icon, Button } from 'antd';
import { Col } from 'antd';
import { _requestToServer } from '../../../services/exec';
import { POST } from '../../../const/method';
import Layout from '../layout/Layout';
import { REDUX } from '../../../const/actions';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_name: "",
            password: "",
        }

        this.key_icon = <i className="fa fa-key"></i>
        this.letter_icon = <i className="fa fa-envelope"></i>
    }

    handleUsername = (e) => {
        this.setState({
            user_name: e.target.value.trim()
        })
    }

    handlePassword = (e) => {
        this.setState({
            password: e.target.value.trim()
        })
    }

    _createResponse = () => {
        this.getResponse()
    }

    getResponse = async () => {
        let data = {
            username: this.state.user_name,
            password: this.state.password
        }

        _requestToServer(POST, data, authUserPassword, AUTH_HOST, loginHeaders, null, true)
            .then(res => {
                if (res) {
                    setAuthSate(res);
                    this.props.setAuthen();
                    let last_access = localStorage.getItem('last_access');
                    setTimeout(() => {
                        if (last_access) {
                            window.location.assign(last_access);
                        } else {
                            window.location.assign('/');
                        }
                    }, 1500);
                }

            });
    }


    render() {
        let { user_name, password } = this.state;
        return (
            <Layout disableFooterData={false}>
                {/* <form> */}
                <div className='content'>
                    <div className='login-content'>
                        <Col xs={0} sm={0} md={6} lg={6} xl={7} xxl={8} ></Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={10} xxl={8} >
                            <div className="login-form">
                                <p className='title a_c' style={{fontWeight: 600}}>ĐĂNG NHẬP</p>
                                <form>
                                    <p className='nomal'>
                                        <Input
                                            placeholder="Email"
                                            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            suffix={
                                                <Tooltip title="Email của bạn">
                                                    <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                                </Tooltip>
                                            }
                                            value={user_name}
                                            onChange={this.handleUsername} type='text'
                                        />
                                    </p>
                                    <p className='nomal'>
                                        <Input.Password
                                            placeholder="Password"
                                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            // suffix={
                                            //     <Tooltip title="Điền đúng mật khẩu">
                                            //         <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                            //     </Tooltip>
                                            // }
                                            value={password}
                                            onChange={this.handlePassword}
                                            onPressEnter={this._createResponse}
                                            type='password'
                                        />
                                    </p>
                                    <p className='fogot-password a_r'>
                                        <a href='/forgot-password' style={{ color: 'gray' }} >Quên mật khẩu ?</a>
                                    </p>
                                    <p>
                                        <Button style={{backgroundColor: '#31a3f9', borderColor: '#31a3f9'}} type='primary' onClick={this._createResponse} block>Đăng nhập</Button>
                                    </p>
                                    {/* <p className='a_c'>
                                        hoặc
                                     </p>
                                    <p>
                                        <Button type='blue-7' onClick={() => this._createRequest()} block>
                                            <i id='facebook_square' className="fa fa-facebook-square"></i>
                                            Đăng nhập với Facebook
                                        </Button>
                                    </p> */}
                                    <p className='a_c'>
                                        Bạn chưa có tài khoản ? <a href='/register' style={{ color: '#fb4141' }}>Đăng ký</a>
                                    </p>
                                </form>
                            </div>
                        </Col>
                        <Col xs={0} sm={0} md={6} lg={6} xl={7} xxl={8} ></Col>
                    </div>
                </div>
                {/* </form> */}
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        prop: state.prop
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        openPopup: (data) => dispatch({ type: REDUX.POPUP.OPEN_POPUP, data }),
        setAuthen: () => dispatch({ type: REDUX.AUTHEN.EXACT_AUTHEN }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
