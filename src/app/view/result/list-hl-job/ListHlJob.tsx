import React from 'react';
import { Row, Col, Icon, Tooltip, Avatar, Pagination } from 'antd';
import { Link } from 'react-router-dom';
import { limitString } from '../../../../utils/limitString';
import './ListHlJob.scss';
//@ts-ignore

interface IListHlJobProps {
    highlightData?: any;
    is_loading?: boolean;
    getHighLightJobs?: Function;
}

export default function ListHlJob(props?: IListHlJobProps) {
    let { highlightData } = props;

    return (
        <div className='hl-job hidden-only-phone'>
            <h5>Công việc hàng đầu</h5>
            <div className='all-hl-job'>
                <Row>
                    {highlightData && highlightData.items && highlightData.items.map((item, index) => {
                        return (
                            <Col key={index} xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
                                <div key={index} className='item-hl-job'>
                                    <Avatar shape='square' size={50} alt='works result' src={item.employerLogoUrl} />
                                    <div className='name-job'>
                                        <ul>
                                            <li >
                                                <Link to={`/job-detail/${window.btoa(item.id)}`}
                                                    target='_blank'
                                                    style={{ color: '#ff6f6f', fontSize: '1rem' }}
                                                >
                                                    <label className='l_c' >{limitString(item.jobTitle, 25)}</label>
                                                </Link>
                                                <Tooltip title='Công việc hot'>
                                                    <span> <Icon type='fire' twoToneColor="#168ECD" style={{ color: 'red' }} /></span>
                                                </Tooltip>
                                            </li>
                                            <li style={{ fontSize: '0.8rem' }}>
                                                <Icon type="environment" style={{ color: "#168ECD" }} theme={'filled'} />
                                                <label style={{ minWidth: 80, }}> {item.region.name + ' '}</label>
                                                <i className="fa fa-briefcase" aria-hidden="true" style={{ color: '#168ECD' }} />
                                                <label className='l_c'>{item.jobType + ' '}</label>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </Col>)
                    })}
                </Row>
            </div>
            <div className='pagination-result'>
                <Pagination
                    defaultCurrent={1}
                    size={'6'}
                    total={highlightData.totalItems}
                    onChange={
                        (page?: number) => {
                            console.log(page);
                            props.getHighLightJobs(page - 1)
                        }
                    }
                />
            </div>
        </div>
    )
}