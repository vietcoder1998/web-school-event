import React, { Component } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { timeConverter } from '../../../../utils/convertTime';
import { Row, Col, DatePicker, Input, Popconfirm, Icon, Button } from 'antd';
import { experienceController } from '../../../../services/api/private.api';
import { _requestToServer } from '../../../../services/exec';
import { connect } from 'react-redux';
import moment from 'moment';
import { REDUX_SAGA } from '../../../../const/actions';
import { PUT, DELETE } from '../../../../const/method';

interface Props {
    item?: any;
    complete?: any;
    experience?: any;
    id?: string;
    fix?: string;
    getData?: Function
}

interface State {
    activeKey?: string,
    experience?: {
        jobName?: string,
        companyName?: string,
        startedDate?: number,
        finishedDate?: number,
        description?: string
    },
    id?: string
}

class ExperienceItem extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            activeKey: '',
            experience: {
                jobName: '',
                companyName: '',
                startedDate: 0,
                finishedDate: 0,
                description: ''
            },
            id: ''
        }
    }

    componentDidMount = () => {
        let { item, complete } = this.props;
        let { experience, activeKey } = this.state;
        experience = item;
        activeKey = complete
        this.setState({ experience, activeKey });
    }

    _handleInput = (type) => (event) => {
        let value = event.target.value;
        let { experience } = this.state;
        experience[type] = value;
        this.setState({ experience });
    }

    _handleSelect = (key) => {
        let { activeKey } = this.state;
        activeKey = key;
        this.setState({ activeKey })
    }

    _handleChangeStartedTime = (value) => {
        let { experience } = this.state;
        if (value !== null) {
            let time = 1000 * moment(value, 'YYYY/MM/DD').unix();
            experience.startedDate = time;
            this.setState({ experience });
        }
    }

    _handleChangeFinishedTime = (value) => {
        let { experience } = this.state;
        if (value !== null) {
            let time = 1000 * moment(value, 'YYYY/MM/DD').unix();
            experience.finishedDate = time;
            this.setState({ experience });
        }
    }

    _createRequest = (method) => {
        this.requesToServer(method)
    }

    async requesToServer(method) {
        let { experience } = this.state;
        let { id, complete } = this.props;
        let res;

        if (method === PUT) {
            if (
                experience.companyName === '' ||
                experience.jobName === '' ||
                experience.startedDate === null ||
                experience.finishedDate === null
            ) {
            } else
                if (experience.startedDate > experience.finishedDate) {
                } else {
                    res = await _requestToServer(PUT, experience, experienceController + '/' + id, null, null, null, true);
                }
        }

        if (method === DELETE) {
            res = await _requestToServer(DELETE, null, experienceController + '/' + id, null, null, null, true);
        }

        if (res && res) {
            await this.props.getData();
            await this._handleSelect(complete);
        }
    }

    render() {
        let { item, complete, fix } = this.props;
        let { experience, activeKey } = this.state;
        let startedDate = timeConverter(experience.startedDate);
        let finishedDate = timeConverter(experience.finishedDate);
        return (
            <Tabs activeKey={activeKey} onSelect={() => { }}>
                {/* Delete */}
                <Tab eventKey={complete} onSelect={this._handleSelect} id={complete}  >
                    <div className='wrapper' id={complete} >
                        <div className="edit-delete">
                            <Icon type="form" onClick={() => { this._handleSelect(fix) }} />
                            <Popconfirm
                                title="Bạn muốn xóa mục này ？"
                                okText="Xóa"
                                cancelText="Hủy"
                                onConfirm={() => this._createRequest(DELETE)}
                                okType={'danger'}                            >
                                <Icon type="delete" />
                            </Popconfirm>
                        </div>
                        <div>
                            <p className='header-experience'>{item.label}</p>
                            <b>Công việc: </b>
                            <li> {item.jobName}</li>
                            <b>Nơi làm việc: </b>
                            <li> {item.companyName}</li>
                            <b>Thời gian làm việc: </b>
                            <li>
                                {item.startedDate > 0 ?
                                    timeConverter(item.startedDate) : 'Chưa cập nhật'}
                                 - {item.finishedDate > 0 ? timeConverter(item.finishedDate) : 'Chưa cập nhật'} </li>
                            <b>Mô tả: </b>
                            <li> {item.description}</li>
                        </div>
                    </div>
                </Tab>
                {/* Update */}
                <Tab eventKey={fix}>
                    <div className='wrapper'>
                        <div className='experience'>
                            {/* jobName */}
                            <div className='experience-content'>
                                <p><label style={{ color: 'red' }}>*</label>Tên vị trí</p>
                                <Input type='text' className='input_outside' placeholder='Ví dụ: UX-UI Designer' value={experience.jobName} onChange={this._handleInput("jobName")} />
                            </div>

                            {/* Company */}
                            <div className='experience-content'>
                                <p><label style={{ color: 'red' }}>*</label>Tên Tổ chức</p>
                                <Input type='text' className='input_outside' placeholder='Ví dụ: Công ti cổ phần Works.vn' value={experience.companyName} onChange={this._handleInput("companyName")} />
                            </div>

                            <div className='experience-content'>
                                <Row >
                                    {/* Started Date */}
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12} className='column' >
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
                            <div className='experience-content'>
                                <p> <label style={{ color: 'red' }}>*</label>Mô tả nội dung</p>
                                <textarea id='description' placeholder='Nhập nội dung và mô tả cụ thể công việc đã làm' value={experience.description} onChange={this._handleInput("description")}></textarea>
                            </div>
                            <p><label style={{ color: 'red' }}>*</label>Thông tin bắt buộc</p>
                        </div>
                        <Row className="holder-button">
                            <Col span={12}>
                                <Button
                                    className="danger"
                                    size="large"
                                    icon="close"
                                    onClick={() => {
                                        this._handleSelect(complete);
                                    }}
                                >
                                    Hủy
                                </Button>
                            </Col>
                            <Col span={12}>
                                <Button
                                    type="primary"
                                    size="large"
                                    icon="save"
                                    onClick={() => this._createRequest(PUT)}
                                >
                                    Lưu
                            </Button>
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

export default connect(null, mapDispatchToProps)(ExperienceItem);
