import React, { Component } from 'react';
import './ResetPassword.scss';

// import * as auth from '../../service/auth';
import { connect } from 'react-redux';
import { resetPassword } from '../../services/api/private.api';
import { authHeaders } from '../../services/auth';
import { AUTH_HOST } from '../../environment/development';
import { Input, Icon, Button } from 'antd';
import { Col } from 'antd';
import { _requestToServer } from '../../services/exec';
import { POST } from '../../const/method';
import Layout from '../layout/Layout';
import { REDUX } from '../../const/actions';
import swal from 'sweetalert';

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            newPassword: "",
            reNewPassword: ""
        }
        this.messageError = null;
        this.key_icon = <i className="fa fa-key"></i>
        this.letter_icon = <i className="fa fa-envelope"></i>
    }

    checkValid() {
        if (!this.state.password) {
            this.messageError = 'Chưa nhập mật khẩu cũ'
            return false;
        }
        if (!this.state.newPassword) {
            this.messageError = 'Chưa nhập mật khẩu mới'
            return false;
        }
        if (!this.state.reNewPassword) {
            this.messageError = 'Chưa xác nhận mật khẩu mới'
            return false;
        }
        if (this.state.newPassword !== this.state.reNewPassword) {
            this.messageError = 'Mật khẩu mới và Nhập lại mật khẩu mới không trùng nhau'
            return false;
        }
        return true
    }
    handlePassword = (e) => {
        this.setState({
            password: e.target.value.trim()
        })
    }
    handleNewPassword = (e) => {
        this.setState({
            newPassword: e.target.value.trim()
        })
    }
    handleReNewPassword = (e) => {
        this.setState({
            reNewPassword: e.target.value.trim()
        })
    }

    _createResponse = () => {
        this.setState({ isLoading: true });
        if (!this.checkValid()) {
            // alert('Thông báo', this.messageError, () => this.setState({ isLoading: false }));
            swal({ title: "Thông báo", icon: "error", text: this.messageError,buttons: false })
            this.setState({ isLoading: false }); 
        } else {
            this.getResponse()
        }
    }

    getResponse = async () => {
        let data = {
            oldPassword: this.state.password,
            newPassword: this.state.newPassword
        }

        _requestToServer(POST, data, resetPassword, AUTH_HOST, authHeaders, null, true)
            .then(res => {
                if (res) {
                    setTimeout(() => {
                            window.location.assign('/');
                    }, 1500);
                }

            })
            .finally(() =>{
                this.setState({ isLoading: false }); 
            })
    }


    render() {
        let { password, newPassword, reNewPassword, isLoading } = this.state;
        return (
            <Layout disableFooterData={false}>
                {/* <form> */}
                <div className='content'>
                    <div className='login-content'>
                        <Col xs={0} sm={0} md={6} lg={6} xl={7} xxl={8} ></Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={10} xxl={8} >
                            <div className="login-form">
                                <p className='title a_c' style={{fontWeight: 600}}>ĐỔI MẬT KHẨU</p>
                                <form style={{paddingBottom: 30}}>
                                    <p className='nomal'>
                                        <Input.Password
                                            placeholder="Mật khẩu cũ"
                                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            value={password}
                                            onChange={this.handlePassword}
                                            type='password'
                                        />
                                    </p>
                                    <p className='nomal'>
                                        <Input.Password
                                            placeholder="Mật khẩu mới"
                                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            value={newPassword}
                                            onChange={this.handleNewPassword}
                                            type='password'
                                        />
                                    </p>
                                    <p className='nomal'>
                                        <Input.Password
                                            placeholder="Nhập lại mật khẩu mới"
                                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            value={reNewPassword}
                                            onChange={this.handleReNewPassword}
                                            onPressEnter={this._createResponse}
                                            type='password'
                                        />
                                    </p>
                                    <p>
                                        {isLoading ? <Button style={{backgroundColor: '#31a3f9', borderColor: '#31a3f9'}} type='primary' onClick={this._createResponse} block><Icon type="loading" /></Button> :
                                        <Button style={{backgroundColor: '#31a3f9', borderColor: '#31a3f9'}} type='primary' onClick={this._createResponse} block>Hoàn tất   </Button>}
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

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
