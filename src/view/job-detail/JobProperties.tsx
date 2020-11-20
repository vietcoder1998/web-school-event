import React, { PureComponent } from 'react';
import { Row, Col, Icon, Skeleton, Avatar, Empty, Pagination } from 'antd';
import { IptLetter, NotUpdate, JobType } from '../layout/common/Common';
import moment from 'moment';
import { weekDays } from '../../utils/day';
import { IShift } from '../../models/announcements.interface';
// import { convertStringToArray } from '../../utils/convertStringToArray';
import { convertSalary } from '../../utils/convertNumber'
import { Link } from 'react-router-dom';
import { _checkGender } from './../event/job-detail';

interface JobPropertiesProps {
    jobDetail?: any;
    similarJob?: any;
    _getSimilarJob?: any;
    paging?: any;
    is_loading_similar?: any;
    param?: string
}

interface JobPropertiesState { }

export default class JobProperties extends PureComponent<JobPropertiesProps, JobPropertiesState> {
    render() {
        let { jobDetail, similarJob, is_loading_similar, paging, param } = this.props;
        // let add_arr = jobDetail && jobDetail.address && jobDetail.address.split(" ");
        // let list_des = convertStringToArray(jobDetail.description);

        return (
            <div className='job-detail'>
                <Row className='des-job' style={{ backgroundColor: 'white' }} >

                    {/* Description job */}
                    <Col xs={24} sm={24} md={24} lg={15} xl={15}>
                        <div className='description-job '>
                            <h6>Thông tin công việc</h6>
                            <div style={{ padding: 10, whiteSpace: 'pre-line', color: '#000' }} dangerouslySetInnerHTML={{ __html: jobDetail && jobDetail.description }} />
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={9} xl={9}>
                        <div className='short-info'>
                            <p>
                                <b>Thông tin sơ lược</b>
                            </p>
                            <ul style={{ marginBottom: '5px' }}>
                                <li className='d_j_t'>
                                    <Icon type="calendar" style={{ color: 'rgb(74, 74, 74)' }} />
                                    <IptLetter value={"Ngày đăng: "} />
                                    <b> {jobDetail && moment(jobDetail.createdDate).format('DD/MM/YYYY')}
                                    </b>
                                </li>
                                <li className='d_j_t'>
                                    <Icon type="calendar" style={{ color: 'rgb(74, 74, 74)' }} />
                                    <IptLetter value={"Ngày hết hạn: "} />
                                    <b> {jobDetail && moment(jobDetail.expirationDate).format('DD/MM/YYYY')}</b>
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

                                            <div className='week-day' style={{overflowX: "auto"}}>
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
                            <div style={{ padding: 15, overflowX:"scroll" }}>
                                {jobDetail.requiredSkills && jobDetail.requiredSkills.length > 0 ?
                                    jobDetail.requiredSkills.map(
                                        (item, index) => { return <label key={index} className='skills-detail'>{item.name}</label> })
                                    : <NotUpdate msg='Ứng viên không đòi hỏi kỹ năng khác' />
                                }
                            </div>
                        </div>
                    </Col >
                </Row>
                <div className='company-more '>
                    <h6> Công việc tương tự</h6>
                    <Row style={{margin: '10px -5px'}}>
                            {similarJob && similarJob.items ? similarJob.items.map((item, index) =>
                                (<Col key={index} xs={24} sm={12} md={12} lg={8} xl={8}>
                                    {is_loading_similar ? <Skeleton loading={true} avatar paragraph={{ rows: 1 }} /> :
                                        (<Row className='item-job' >
                                            <Col span={7} style={{ flex: 3, display: 'flex', flexDirection: 'column' }}>
                                                <Avatar shape={'square'} src={item.employerLogoUrl} size={60}/>
                                                <JobType width='60px' fontSize='0.7em'>
                                                    {item && item.jobType}
                                                </JobType>
                                            </Col>
                                            <Col  span={14}>
                                                <p style={{ textAlign: 'left', fontSize: '1.1em', fontWeight: 500 }} className="info-silimar-job"><Link to={`/job-detail/${window.btoa(item.id)}${param}`} target='_blank'>{item.jobTitle}</Link></p>
                                                <p style={{ textAlign: 'left' }} className="info-silimar-job"><span><Icon type='environment' style={{ marginRight: 3 }} />{item.address}</span></p>
                                            </Col>
                                        </Row>)}
                                </Col>)
                            ) : <Empty description={"Không tìm thấy công việc nào"} />
                            }
                    </Row>
                    <div style={{ textAlign: 'center' }}>
                        <Pagination defaultCurrent={1} total={paging} onChange={(event) => this.props._getSimilarJob(event)} />
                    </div>
                </div>
            </div>
        )
    }
}
