import React, { Component } from 'react';
// import { Tabs, Tab } from 'react-bootstrap';
import { Row, Col, DatePicker, Input, Popconfirm } from 'antd';
import { _requestToServer } from '../../../services/exec';
import { timeConverter } from '../../../utils/convertTime';
import { EDUCATIONS } from '../../../services/api/private.api';
import { connect } from 'react-redux';
import moment from 'moment';
import { PUT, DELETE } from '../../../const/method';
import { REDUX_SAGA } from '../../../const/actions';
import { IptLetterP } from '../../layout/common/Common';
import IEducation from '../../../models/education';
import { Tab, Tabs } from 'react-bootstrap';

interface IProps {
    item?: any;
    complete?: any;
    id?: string | number;
    getData?: Function;
    fix?: string;
    _fixData?: Function;
};

interface IStates {
    education?: IEducation;
    activeKey?: string;
    fix?: string;
};

class EducationItem extends Component<IProps, IStates> {
    constructor(props) {
        super(props);
        this.state = {
            education: {
                school: "",
                branchOfLearning: "",
                startedDate: 0,
                finishedDate: 0,
                description: ''
            },
            activeKey: ''
        }
    }

    componentDidMount = () => {
        let { item, complete } = this.props;
        let { education, activeKey } = this.state;
        if (item !== null) {
            education = item;
        }
       

        activeKey = complete;
        this.setState({ education, activeKey });
    }

    _handleSelect = (key) => {
        let { activeKey } = this.state;
        activeKey = key;
        this.setState({ activeKey })
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

    _createRequest = (method) => {
        let { education } = this.state;
        this.requestServer(method, education);
    }

    async requestServer(method, education) {
        let res;
        let { id } = this.props;
        if (method === PUT) {
            if (
                education.school === '' ||
                education.branchOfLearning === '' ||
                education.startDate === null ||
                education.fininshedDate === null) {
            } else if (
                education.startedDate > education.finishedDate
            ) {
            }
            else {
                res = await _requestToServer(PUT, education, EDUCATIONS + '/' + id, null, null, null, true);
            }
        } else if (method === DELETE) {
            res = await _requestToServer(DELETE, null, EDUCATIONS + '/' + id, null, null, null, true);
        }

        if (res && res) {
            await this.props.getData();
        }
    }

    render() {
        let { item, complete, fix } = this.props;
        let { education, activeKey } = this.state;
        let startedDate = timeConverter(education.startedDate);
        let finishedDate = timeConverter(education.finishedDate);
        return (
            <Tabs activeKey={activeKey} onSelect={() => { }}>
                {/* Delete */}
                <Tab eventKey={complete} onSelect={this._handleSelect} id={complete}  >
                    <div className='wrapper'>
                        <div className="edit-delete">
                            <i className="fa fa-edit" onClick={() => { this._handleSelect(fix) }} />
                            <Popconfirm
                                title="Bạn muốn xóa mục này ？"
                                okText="Xóa"
                                cancelText="Hủy"
                                onConfirm={() => this._createRequest(DELETE)}
                                okType={'danger'}
                            >
                                <i className="fa fa-trash" />
                            </Popconfirm>
                        </div>
                        <div>
                            <IptLetterP>Nơi học: </IptLetterP>
                            <div style={{ padding: '5px 10px' }}> {item.school}</div>
                            <IptLetterP>Ngành học: </IptLetterP>
                            <div style={{ padding: '5px 10px' }}> {item.branchOfLearning}</div>
                            <IptLetterP>Thời gian học: </IptLetterP>
                            <div style={{ padding: '5px 10px' }}>{item.startedDate > 0 ? timeConverter(item.startedDate, 1000) : 'Chưa cập nhật'} đến {item.finishedDate > 0 ? timeConverter(item.finishedDate, 1000) : 'Chưa cập nhật'} </div>
                            <IptLetterP>Mô tả: </IptLetterP>
                            <div style={{ padding: '5px 10px' }}> {item.description}</div>
                        </div>
                    </div>
                </Tab>
                <Tab eventKey={fix} >
                    <div className='wrapper' >
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
                                            defaultValue={moment(startedDate, 'DD/MM/YY')}
                                            onChange={this._handleChangeStartedTime}
                                            placeholder='Ví dụ: 26/6/2018'
                                        />
                                    </Col>
                                    {/* DatePicker Finished Time */}
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12} className='column'>
                                        <p><label style={{ color: 'red' }}>*</label>Từ tháng</p>
                                        <DatePicker
                                            defaultValue={moment(finishedDate, 'DD/MM/YY')}
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

                        {/* submit button */}
                        <Row className='holder-button' >
                            <Col xs={12}>
                                <button className='danger' onClick={() => this._handleSelect(complete)}> Hủy</button>
                            </Col>
                            <Col xs={12}>
                                <button className='request' onClick={() => this._createRequest(PUT)}> Lưu</button>
                            </Col>
                        </Row>
                    </div>
                </Tab>
            </Tabs>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    getData: () => dispatch({ type: REDUX_SAGA.PERSON_INFO.GET_FULL_PERSON_INFO }),
})

export default connect(null, mapDispatchToProps)(EducationItem);
