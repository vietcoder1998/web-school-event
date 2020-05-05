import React, { Component } from 'react';
import './FixExperience.scss';
import { Col, Row, DatePicker, Input } from 'antd';
import { connect } from 'react-redux';
import { experienceController } from '../../../../../services/api/private.api';
import { _requestToServer } from '../../../../../services/exec';
import moment from 'moment';
import { REDUX_SAGA } from '../../../../../const/actions';
import { POST } from '../../../../../const/method';
import IExperience from '../../../../../models/experience';
import swal from 'sweetalert';
import { TYPE } from '../../../../../const/type';
interface IState {
    getData?: Function;
    _fixData?: Function;
    method?: string;
}

interface IState {
    experience?: IExperience
}

class FixExperience extends Component<IState, IState> {
    constructor(props) {
        super(props);
        this.state = {
            experience: {
                jobName: "",
                companyName: "",
                startedDate: 0,
                finishedDate: 0,
                description: ""
            }
        }
    }

    _handleInput = (type) => (event) => {
        let value = event.target.value;
       
        let { experience } = this.state;
        experience[type] = value;
        this.setState({ experience });
    }

    _handleChangeStartedTime = (value) => {
        let { experience } = this.state;
        let time = 1000 * moment(value, 'YYYY/MM/DD').unix();
        experience.startedDate = time;
        this.setState({ experience });
    }

    _handleChangeFinishedTime = (value) => {
        let { experience } = this.state;
        let time = 1000 * moment(value, 'YYYY/MM/DD').unix();
        experience.finishedDate = time;
        this.setState({ experience });
    }

    _closeFixExperience = () => {
    }

    _createRequest = () => {
        this.requestServer();
    }

    async requestServer() {
        let { method } = this.props;
        let { experience } = this.state;

        if(experience.finishedDate < experience.startedDate) {
            swal({
                title: "Worksvns thông báo",
                text: "Ngày bắt đầu không thể sau ngày kết thúc",
                icon: TYPE.ERROR,
                dangerMode: false,
            });
        }
        
        if (method === POST) {
            let res = await _requestToServer(POST, experience, experienceController, null, null, null, true);
            if (res) {
                await this.props.getData()
                await this.props._fixData('experience');
            }
        }
    }

    render() {
        let { experience } = this.state;
        return (
            <div className='wrapper'>
                <div className='experience'>
                    {/* jobName */}
                    <div className='experience-content'>
                        <p><label style={{ color: 'red' }}>*</label>Tên vị trí</p>
                        <Input className='input_outside' placeholder='Ví dụ: UX-UI Designer' value={experience.jobName} onChange={this._handleInput("jobName")} />
                    </div>

                    {/* Company */}
                    <div className='experience-content'>
                        <p><label style={{ color: 'red' }}>*</label>Tên Tổ chức</p>
                        <Input className='input_outside' placeholder='Ví dụ: Công ti cổ phần Works.vn' value={experience.companyName} onChange={this._handleInput("companyName")} />
                    </div>

                    <div className='experience-content'>
                        <Row >
                            {/* Started Date */}
                            <Col xs={24} sm={24} md={12} lg={12} xl={12} className='properties'>
                                <p> <label style={{ color: 'red' }}>*</label>Từ tháng</p>
                                <DatePicker
                                    onChange={this._handleChangeStartedTime}
                                    placeholder='Ví dụ: 26/6/2018'
                                />
                            </Col>
                            {/* DatePicker Finished Time */}
                            <Col xs={24} sm={24} md={12} lg={12} xl={12} className='properties'>
                                <p><label style={{ color: 'red' }}>*</label>Từ tháng</p>
                                <DatePicker
                                    onChange={this._handleChangeFinishedTime}
                                    placeholder='Ví dụ: 26/6/2018'
                                />
                            </Col>
                        </Row>
                    </div>
                    {/* Description */}
                    <div className='experience-content'>
                        <p> <label style={{ color: 'red' }}>*</label>Mô tả nội dung</p>
                        <textarea id='description' placeholder='Nhập nội dung và mô tả cụ thể công việc đã làm' value={experience.description} onChange={this._handleInput("description")}></textarea>
                    </div>
                    <p><label style={{ color: 'red' }}>*</label>Thông tin bắt buộc</p>
                </div>
                {/* submit button */}
                <Row className='holder-button' >
                    <Col xs={12}>
                        <button className='danger' onClick={() => { this.props._fixData('experience') }}> Hủy</button>
                    </Col>
                    <Col xs={12}>
                        <button className='request' onClick={() => this._createRequest()}> Lưu</button>
                    </Col>

                </Row>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    getData: () => dispatch({ type: REDUX_SAGA.PERSON_INFO.GET_PERSON_INFO })
})

export default connect(null, mapDispatchToProps)(FixExperience);
