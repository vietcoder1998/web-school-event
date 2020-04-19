import React, { PureComponent } from 'react';
import { Row, Col, Icon } from 'antd';
import { IptLetter, NotUpdate } from '../../layout/common/Common';
import moment from 'moment';
import { weekDays } from './../../../../utils/day';
import { _checkGender } from './../JobDetail';
import './JobProperties.scss'
import { IShift } from '../../../../models/announcements';
// import { convertStringToArray } from '../../../../utils/convertStringToArray';

interface JobPropertiesProps {
    jobDetail?: any;
}

interface JobPropertiesState { }

export default class JobProperties extends PureComponent<JobPropertiesProps, JobPropertiesState> {
    render() {
        let { jobDetail } = this.props;
        // let add_arr = jobDetail && jobDetail.address && jobDetail.address.split(" ");
        // let list_des = convertStringToArray(jobDetail.description);

        return (
            <div className='job-detail'>
                <Row className='des-job' style={{ backgroundColor: 'white' }} >
                    <Col xs={24} sm={24} md={24} lg={9} xl={9}>
                        <div className='short-info'>
                            <h6>Thông tin sơ lược</h6>
                            <ul>
                                <li className='d_j_t'>
                                    <Icon type="environment-o" style={{ color: '#168ECD' }} />
                                    <label>
                                        <IptLetter value={"Nơi đăng: "} />
                                        <span>{jobDetail && jobDetail.address}</span>
                                    </label>
                                </li>
                                <li className='d_j_t'>
                                    <Icon type="calendar" style={{ color: '#168ECD' }} />
                                    <IptLetter value={"Ngày đăng: "} />
                                    <label> {jobDetail && moment(jobDetail.createdDate).format('DD/MM/YYYY')}
                                    </label>
                                </li>
                                <li className='d_j_t'>
                                    <Icon type="calendar" style={{ color: '#168ECD' }} />
                                    <IptLetter value={"Ngày hết hạn: "} />
                                    <label> {jobDetail && moment(jobDetail.expirationDate).format('DD/MM/YYYY')}
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </Col>
                    {/* Description job */}
                    <Col xs={24} sm={24} md={24} lg={15} xl={15}>
                        <div className='description-job '>
                            <h6>Mô tả công việc</h6>
                            <div style={{ padding: 10 }} dangerouslySetInnerHTML={{ __html: jobDetail && jobDetail.description }} />
                        </div>
                    </Col>
                </Row>
                <Row>
                    {/* Time */}
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Row className='time-job '>
                            <h6>Ca làm việc</h6>
                            {jobDetail.shifts && jobDetail.shifts ? jobDetail.shifts.map((item?: IShift, index?: any) => {
                                let maxSalary = '' + item.maxSalary && item.maxSalary === 0 ? '' : ('-' + item.maxSalary);
                                return (
                                    <Col key={index} xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                        <div className='time-content test'>
                                            <p>
                                                Ca số {index + 1}
                                            </p>
                                            <p><Icon type="clock-circle" style={{ color: '#168ECD' }} />{' ' + item.startTime + '-' + item.endTime}</p>
                                            <p><Icon type="dollar" style={{ color: '#168ECD' }} />
                                                {
                                                    item.minSalary && item.maxSalary && item.minSalary !== 0 && item.maxSalary !== 0 ?
                                                        (<span>{' ' + (item.minSalary ? item.minSalary : ' ') + maxSalary + '/' + item.unit}</span>) : "Thỏa thuận"
                                                }
                                            </p>

                                            <div className='week-day'>
                                                {weekDays.map((itemWeek, index) => {
                                                    if (item[itemWeek] === true) {
                                                        let day = 'T' + (index + 2);
                                                        if (index === 6) {
                                                            day = 'CN'
                                                        }
                                                        return (<label key={index} className='time-span'>
                                                            {day}
                                                        </label>)
                                                    }
                                                    else {
                                                        return null
                                                    }
                                                })}
                                            </div>
                                            {item.genderRequireds[0] ? _checkGender(item.genderRequireds[0]) : null}
                                        </div>
                                    </Col>)
                            }) : <NotUpdate msg={'Ca làm việc không tồn tại'} />}
                        </Row>
                    </Col>
                </Row>
                <Row>
                    {/* Skills job */}
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <div className='skills-job-detail '>
                            <h6>Kĩ năng khác</h6>
                            <div style={{ padding: 15 }}>
                                {jobDetail.requiredSkills && jobDetail.requiredSkills.length > 0 ?
                                    jobDetail.requiredSkills.map(
                                        (item, index) => { return <label key={index} className='skills-detail'>{item.name}</label> })
                                    : <NotUpdate msg='Ứng viên không đòi hỏi kỹ năng khác' />
                                }
                            </div>
                        </div>
                    </Col >
                </Row>
            </div>
        )
    }
}
