import React, { Component } from 'react';
import './FixEducation.scss';
import { Col, Row, Input, DatePicker } from 'antd';
import { connect } from 'react-redux'
import { educationController } from '../../../../../services/api/private.api';
import { _requestToServer } from '../../../../../services/exec';
import moment from 'moment';
import { REDUX_SAGA } from '../../../../../const/actions';
import { POST } from '../../../../../const/method';
import IEducation from '../../../../../models/education';

interface IProps {
    getData?: Function;
    _fixData?: Function;
}

interface IState {
    education?: IEducation;
}

class FixEducation extends Component<IProps, IState>{
    constructor(props) {
        super(props);
        this.state = {
            education: {
                school: "",
                branchOfLearning: "",
                startedDate: 0,
                finishedDate: 0,
                description: ''
            }
        }
    }

    _handleData = (event) => {
        let { education } = this.state;
        let params;
        params = event.target.id;
        education[params] = event.target.value;
        this.setState({ education });
    }

    _handleChangeStartedTime = (value) => {
        let { education } = this.state;
        let time = 1000 * moment(value, 'YYYY/MM/DD').unix();
        education.startedDate = time;
        this.setState({ education });
    }

    _handleChangeFinishedTime = (value) => {
        let { education } = this.state;
        let time = 1000 * moment(value, 'YYYY/MM/DD').unix();
        education.finishedDate = time;
        this.setState({ education });
    }

    _createRequest = () => {
        this.requestServer(POST);
    }

    async requestServer(method) {
        let { education } = this.state;

        if (education.description === ''
            || education.school === ''
            || education.branchOfLearning === ''
            || education.startedDate === 0
            || education.finishedDate === 0) { } else if (method === POST) {

                let res = await _requestToServer(POST, education, educationController, null, null, null, true);
                if (res) {
                    await this.props.getData();
                    await this.props._fixData('education');
                }
            }
    }

    render() {
        let { education } = this.state;
        return (
            <div className='wrapper'>
                <div className='education'>
                    {/* Branch of learning */}
                    <div className='education-content'>
                        <p><label style={{ color: 'red' }}>*</label>Tên ngành/nghề đào tạo</p>
                        <Input className='input_outside' placeholder='Ví dụ: Công nghệ thông tin' value={education.branchOfLearning} onChange={this._handleData} />
                    </div>

                    {/* School */}
                    <div className='education-content'>
                        <p><label style={{ color: 'red' }}>*</label>Tên cơ sở đào tạo</p>
                        <Input className='input_outside' placeholder='Ví dụ: Trường Cao đẳng nghề' value={education.school} onChange={this._handleData} />
                    </div>

                    <div className='education-content'>
                        <Row >
                            {/* Started Date */}
                            <Col xs={24} sm={24} md={12} lg={12} xl={12} className='column'>
                                <p> <label style={{ color: 'red' }}>*</label>Từ tháng</p>
                                <DatePicker
                                    onChange={this._handleChangeStartedTime}
                                    placeholder='Ví dụ: 26/6/2018'
                                />
                            </Col>
                            {/* DatePicker Finished Time */}
                            <Col xs={24} sm={24} md={12} lg={12} xl={12} className='column'>
                                <p><label style={{ color: 'red' }}>*</label>Từ tháng</p>
                                <DatePicker
                                    onChange={this._handleChangeFinishedTime}
                                    placeholder='Ví dụ: 26/6/2018'
                                />
                            </Col>
                        </Row>
                    </div>

                    {/* Description */}
                    <div className='education-content'>
                        <p> <label style={{ color: 'red' }}>*</label>Mô tả nội dung</p>
                        <textarea
                            id='description'
                            placeholder='Mô tả sơ lược quá trình học bạn làm những công việc gì, có tham gia các hoạt động ngoại khóa và chức vụ gì trong lớp'
                            value={education.description}
                            onChange={this._handleData}
                        >
                        </textarea>
                    </div>
                    <p><label style={{ color: 'red' }}>*</label>Thông tin bắt buộc</p>
                </div>
                <Row className='holder-button' >
                    <Col xs={12}>
                        <button className='danger' onClick={() => { this.props._fixData('education') }}> Hủy</button>
                    </Col>
                    <Col xs={12}>
                        <button className='request' onClick={() => this._createRequest()}> Lưu</button>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    getData: () => dispatch({ type: REDUX_SAGA.PERSON_INFO.GET_PERSON_INFO }),
})

export default connect(null, mapDispatchToProps)(FixEducation);
