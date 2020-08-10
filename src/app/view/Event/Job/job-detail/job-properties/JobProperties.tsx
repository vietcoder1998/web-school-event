import React, { PureComponent } from 'react';
import { Row, Col, Icon } from 'antd';
import { IptLetter, NotUpdate,  } from '../../../../layout/common/Common';
import moment from 'moment';
import { weekDays } from '../.././../../../../utils/day';
import { _checkGender } from './../JobDetail';
import './JobProperties.scss'
import { IShift } from '../../../../../../models/announcements';
// import { convertStringToArray } from '../../../../utils/convertStringToArray';
import { convertSalary } from '../../../../../../utils/convertNumber'

interface JobPropertiesProps {
    jobDetail?: any;
    similarJob?: any;
    _getSimilarJob?: any;
    paging?: any;
    is_loading_similar?: any;
}

interface JobPropertiesState { }

export default class JobProperties extends PureComponent<JobPropertiesProps, JobPropertiesState> {
    render() {
        let { jobDetail, similarJob, is_loading_similar, paging } = this.props;
        // let add_arr = jobDetail && jobDetail.address && jobDetail.address.split(" ");
        // let list_des = convertStringToArray(jobDetail.description);

        return (
            <div className='job-detail'>
                <Row className='des-job' style={{ backgroundColor: 'white' }} >

                    {/* Description job */}
                    <Col xs={24} sm={24} md={24} lg={15} xl={15}>
                        <div className='description-job '>
                            <h6>Mô tả công việc</h6>
                            <div style={{ padding: 10, whiteSpace: 'pre-line', color: '#000' }} dangerouslySetInnerHTML={{ __html: jobDetail && jobDetail.description }} />
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={9} xl={9}>
                        <div className='short-info'>
                            <h6>Thông tin sơ lược</h6>
                            <ul style={{ marginBottom: '5px' }}>
                                {/* <li className='d_j_t'>
                                    <Icon type="environment-o" style={{ color: '#168ECD' }} />
                                    <label>
                                        <IptLetter value={"Nơi đăng: "} />
                                        <span>{jobDetail && jobDetail.address}</span>
                                    </label>
                                </li> */}
                                <li className='d_j_t'>
                                    <Icon type="calendar" style={{ color: 'rgb(74, 74, 74)' }} />
                                    <IptLetter value={"Ngày đăng: "} />
                                    <label style={{ fontSize: '0.95em', color: '#000' }}> {jobDetail && moment(jobDetail.createdDate).format('DD/MM/YYYY')}
                                    </label>
                                </li>
                                <li className='d_j_t'>
                                    <Icon type="calendar" style={{ color: 'rgb(74, 74, 74)' }} />
                                    <IptLetter value={"Ngày hết hạn: "} />
                                    <label style={{ fontSize: '0.95em', color: '#000' }}> {jobDetail && moment(jobDetail.expirationDate).format('DD/MM/YYYY')}
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </Col>
                </Row>
                <Row>
                    {/* Time */}
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Row className='time-job '>
                            <h6>Ca làm việc</h6>
                            {jobDetail.shifts && jobDetail.shifts ? jobDetail.shifts.map((item?: IShift, index?: any) => {
                                return (
                                    <Col key={index} xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                        <div className='time-content' style={{ border: '1px solid rgb(119, 197, 255)', borderRadius: '3px' }}>
                                            <p style={{ color: 'black', fontSize: '1.1em', borderBottom: '1px solid rgb(119, 197, 255)', paddingBottom: 5, paddingLeft: '15px', backgroundColor: 'rgb(226, 242, 254)', margin: '0', paddingTop: 5 }}>
                                                Ca số {index + 1}
                                            </p>
                                            <p><Icon type="clock-circle" style={{ color: '#168ECD' }} />{' ' + item.startTime + '-' + item.endTime}</p>
                                            <p><Icon type="dollar" style={{ color: '#168ECD' }} />
                                                {/* {
                                                    item.minSalary && item.maxSalary && item.minSalary !== 0 && item.maxSalary !== 0 ?
                                                        (<span>{' ' + (item.minSalary ? item.minSalary : ' ') + maxSalary + '/' + item.unit}</span>) : "Thỏa thuận"
                                                } */}
                                                {convertSalary(item.minSalary, item.maxSalary, item.unit)}
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
                                                        let day = 'T' + (index + 2);
                                                        if (index === 6) {
                                                            day = 'CN'
                                                        }
                                                        return (<label key={index} className='time-span-unselected'>
                                                            {day}
                                                        </label>)
                                                    }
                                                })}
                                            </div>
                                            {item.genderRequireds[0] ? _checkGender(item.genderRequireds[0]) : null}
                                            {item.genderRequireds[1] ? _checkGender(item.genderRequireds[1]) : null}
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
