import React from 'react';
import { Row, Col, Icon, Spin, Tooltip, Empty } from 'antd';
import { Link } from 'react-router-dom';
import { limitString } from '../../../../utils/limitString';
import moment from 'moment';
//@ts-ignore
import TextImage from './../../../../assets/image/carouselGroup/carousel1.jpg';
import { convertFullSalary } from '../../../../utils/convertNumber';
import { IJobDetail } from '../../../../models/job-detail';
// import { IAnnouncement } from '../../../../models/announcements';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import LinkToolTip from '../../layout/common/LinkToolTip';


interface IListResultProps {
    listResult?: Array<IJobDetail>;
    loading?: boolean;
    isSearchEvent?: boolean; // phân biệt job-event và job-normal ở 2 trang khác nhau ,
    param?: any
}

export default function ListResult(props?: IListResultProps) {
    let { loading, listResult, isSearchEvent, param } = props;
    return (
        <div className='result' >
            {loading ? <div className='loading'><Spin /></div> : (listResult.length > 0 ? listResult.map((item?: IJobDetail, index?: number) => {
                let jobTitle=  item.jobTitle;
                if (jobTitle ) {
                    jobTitle = jobTitle.toLowerCase();
                }
                return (<Row key={index} className='result-item' >
                    {/* Image */}
                    <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4} >
                        <Link to={`/job-detail/${window.btoa(item.id)}`} target='_blank'>
                            <div className='image-content'>
                                <LazyLoadImage src={item.employerLogoUrl ? item.employerLogoUrl : TextImage} alt={item.employerName} />
                                <span className={item.jobType}>
                                    {item.jobType === 'FULLTIME' ? 'FullTime' : null}
                                    {item.jobType === 'PARTTIME' ? 'Part-Time' : null}
                                    {item.jobType === 'INTERNSHIP' ? 'InternShip' : null}
                                </span>
                            </div>
                        </Link>

                    </Col>
                    {/* Content */}
                    <Col xs={20} sm={20} md={20} lg={20} xl={20} xxl={20} className='item-content'>
                        <div className='item-header'>
                            <h4 >
                                <Link
                                    style={{ color: item.priority === 'TOP' ? 'red' : 'black' }}
                                    to={isSearchEvent ? `event-job-detail/${window.btoa(item.id)}${param}` : `/job-detail/${window.btoa(item.id)}${param}`}
                                    target='_blank'
                                >
                                    <LinkToolTip
                                        title={jobTitle}
                                        name={limitString(jobTitle, 60)}
                                        transform={"uppercase"}
                                    />
                                </Link>
                                {item.priority === 'TOP' ? <Tooltip title='Công việc hot'>
                                    <span> <Icon type='fire' twoToneColor="#eb2f96" style={{ color: 'red' }} /></span>
                                </Tooltip> : null}
                            </h4>
                        </div>
                        {/* Info */}
                        <div
                            className='item-info'
                        >
                            <div>
                                {/* <p> */}
                                <Link
                                    to={`/employer/${window.btoa(item.employerID)}${param}`}
                                    target='_blank'
                                    className="name_employer" style={{ fontWeight: 550 }}
                                >
                                    <Icon type="shop" style={{ color: '#168ECD', marginRight: 5 }} />
                                    {item.employerName ? item.employerName.toUpperCase() : null}
                                </Link>
                                {/* </p> */}
                            </div>
                            <div
                                className='item-detail'
                            >
                                <Row style={{ margin: "10px 0px" }}>
                                    <Col xs={24} sm={24} md={10} lg={10} xl={10} >
                                        <Icon type="calendar" style={{ color: '#168ECD' }} /> <span>Ngày đăng: {moment(item.createdDate).format('DD/MM/YY')}</span>
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={10} xl={12} >
                                        <Icon type="calendar" style={{ color: '#168ECD' }} /> <span>Hết hạn: {moment(item.finishedDate).format('DD/MM/YY')}</span>
                                    </Col>
                                    <Col xs={24} sm={24} md={10} lg={10} xl={10} >
                                        <Icon type='environment' style={{ color: '#168ECD' }} /><span>Tỉnh thành: {item.region.name}</span>
                                    </Col>
                                    <Col xs={24} sm={24} md={14} lg={14} xl={14} >
                                        <Icon type="dollar" style={{ color: '#168ECD' }} /> <span>Lương: {convertFullSalary(item.minSalary, item.minSalaryUnit, item.maxSalary, item.maxSalaryUnit)}</span>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                    {/* Save */}
                    {/* <Col xs={2} sm={2} md={4} lg={3} xl={3} className='item-option '> */}
                    {/* <div className='item-job-type hidden-only-phone'  >
                            <span className={item.jobType}>
                                {item.jobType}
                            </span>
                        </div> */}

                    {/* <Tooltip title='Lưu lại'> */}
                    {/* <div className='item-save' style={{ display: isAuthen ? 'block' : 'none' }}> */}
                    {/* <Icon type="save" style={{ color }} /> */}
                    {/* </div> */}
                    {/* </Tooltip> */}
                    {/* </Col> */}
                </Row >)
            }) : <Empty style={{ minHeight: '500px', backgroundColor: 'white', padding: '8.5vw 0', margin: '0' }} description={'Không tìm thấy công việc liên quan'} />)}
        </div >
    )
}