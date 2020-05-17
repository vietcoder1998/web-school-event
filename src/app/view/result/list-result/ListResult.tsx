import React from 'react';
import { Row, Col, Icon, Spin, Tooltip, Empty } from 'antd';
import { Link } from 'react-router-dom';
import { limitString } from '../../../../utils/limitString';
import moment from 'moment';
//@ts-ignore
import TextImage from './../../../../assets/image/carouselGroup/carousel1.jpg';


interface IListResultProps {
    list_result?: Array<any>;
    loading?: boolean;
    isSearchEvent?: boolean; // phân biệt job-event và job-normal ở 2 trang khác nhau 
}

export default function ListResult(props?: IListResultProps) {
    let { loading, list_result, isSearchEvent } = props;

    return (
        <div className='result' >
            {loading ? <div className='loading'><Spin /></div> : (list_result.length > 0 ? list_result.map((item, index) => {
                // console.log(item);
                let color = "#fde8c7";
                switch (item.jobType) {
                    case 'PARTTIME':
                        color = 'rgb(239, 253, 239)';
                        break;

                    case 'FULLTIME':
                        color = 'rgb(229, 239, 255)';
                        break;
                    default:
                        break;
                }

                return (<Row key={index} className='result-item' >
                    {/* Image */}
                    <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={3} >
                        <Link to={`/job-detail/${window.btoa(item.id)}`} target='_blank'>
                            <div className='image-content'>
                                <img src={item.employerLogoUrl ? item.employerLogoUrl : TextImage} alt='logo ct' />
                                <span className={item.jobType}>
                                    {item.jobType === 'FULLTIME' ? 'FullTime' : null}
                                    {item.jobType === 'PARTTIME' ? 'Part-Time' : null}
                                    {item.jobType === 'INTERNSHIP' ? 'InternShip' : null}
                                </span>
                            </div>
                        </Link>

                    </Col>
                    {/* Content */}
                    <Col xs={20} sm={20} md={20} lg={20} xl={20} xxl={21} className='item-content'>
                        <div className='item-header'>
                            <h4 >
                                <Link
                                    style={{ color: item.priority === 'TOP' ? 'red' : 'black' }}
                                    to={isSearchEvent ? `event-job-detail/${window.btoa(item.id)}` : `/job-detail/${window.btoa(item.id)}`}
                                    target='_blank'
                                > {limitString(item.jobTitle, 80)}</Link>
                                {item.priority === 'TOP' ? <Tooltip title='Công việc hot'>
                                    <span> <Icon type='fire' twoToneColor="#eb2f96" style={{ color: 'red' }} /></span>
                                </Tooltip> : null}
                            </h4>
                        </div>
                        {/* Info */}
                        <div className='item-info'
                        >
                            <div>
                                {/* <p> */}
                                <Link to={`/employer/${window.btoa(item.employerID)}`} target='_blank' className="name_employer" style={{ fontWeight: 550}}>{item.employerName ? item.employerName.toUpperCase() : null}</Link>
                                {/* </p> */}
                            </div>
                            <div className='item-detail'
                            >
                                <Row style={{ marginBottom: 5 }}>
                                    <div className='item-time '>
                                        <Icon type="calendar" style={{ color: '#168ECD' }} /> Ngày đăng: {moment(item.createdDate).format('DD/MM/YY')}
                                    </div>
                                </Row>
                                <Row>
                                    <Col xs={8} sm={8} md={6} lg={6} xl={6} >
                                        <Icon type='environment' style={{ color: '#168ECD' }} /><span>{item.region.name}</span>
                                    </Col>
                                    <Col xs={16} sm={16} md={18} lg={18} xl={18} >
                                        <Icon type="profile" style={{ color: '#168ECD' }} /><span>{item.jobType === 'PARTTIME' ? 'Không cần kinh nghiệm' : 'Thỏa thuận'}</span>
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
                </Row>)
            }) : <Empty style={{ minHeight: '500px', backgroundColor: 'white', padding: '8.5vw 0', margin: '0' }} description={'Không tìm thấy công việc liên quan'} />)}
        </div>
    )
}