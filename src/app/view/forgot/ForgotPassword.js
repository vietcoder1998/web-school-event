import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Tooltip, Icon, Button, Col, Row } from 'antd';
import './ForgotPassword.scss';
import Layout from '../layout/Layout';
import swal from 'sweetalert';
import { _requestToServer } from '../../../services/exec';
import { AUTH_HOST } from '../../../environment/development';
import { forgotPassword } from '../../../services/api/private.api';
import { POST } from '../../../const/method';
import {  noInfoHeader } from '../../../services/auth';

class ForgotPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            isLoading: false
        }
        this.textValid = null
    }

    _handleInput = (e) => {
        this.setState({ email: e.target.value })
    }
    valid() {
        if (!this.state.email) {
            this.textValid = 'Bạn chưa nhập email'
            return false;
        }
        if(!this.checkEmail()) {
            this.textValid = 'Email không hợp lệ'
            return false;
        }
        return true
    }
    checkEmail() {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(this.state.email)
    }
    onSubmit = () => {
        this.setState({ isLoading: true })
        if (this.valid()) {
            let data = {
                email: this.state.email,
            }
            _requestToServer(POST, data, forgotPassword, AUTH_HOST, noInfoHeader, null, false)
            .then(res => {
           
                if ( res && res.code == 200) {
                    swal({ title: "Email đổi mật khẩu đã gửi thành công", icon: "success", text: 'Vui lòng kiểm tra email!'}).then(() => {
                            window.location.assign('/login');
                    })  
                }
            })
            .finally(() =>{
                this.setState({ isLoading: false }); 
            })
        } else {
            this.setState({ isLoading: false })
            swal({ title: "Lỗi", icon: "error", text: this.textValid})
        }

    }
    render() {
        let { email, isLoading } = this.state;
        return (
            <Layout disableFooterData={false}>
                {/* <form> */}

                <Row>
                    <Col xs={4} sm={0} md={6} xl={8} lg={7} ></Col>
                    <Col xs={16} sm={24} md={12} xl={8} lg={10} >
                        <div className="forgot-content">
                            <p className='title a_c'>Quên mật khẩu</p>
                            <p className='normal a_c'>
                                Xác nhận mật khẩu qua email
                            </p>
                            <p className='normal'>
                                <Input
                                    placeholder="Email"
                                    prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    suffix={
                                        <Tooltip title="Email của bạn">
                                            <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                        </Tooltip>
                                    }
                                    value={email}
                                    onChange={this._handleInput} type='text'
                                />
                            </p>
                            <p>
                                <Button type='primary' loading={isLoading} onClick={this.onSubmit} block>Gửi</Button>
                            </p>
                            <p className='a_c'>
                                Quay trở lại? <a href='/register' style={{ color: 'red' }}>Đăng kí</a>
                            </p>
                            <p className='a_c'>
                                <a href='/'>Trợ giúp</a>
                            </p>
                        </div>
                    </Col>
                    <Col xs={4} sm={0} md={6} xl={8} lg={7}></Col>
                </Row>
                {/* </form> */}
            </Layout>
        );
    }
}

export default connect(null, null)(ForgotPassword);
