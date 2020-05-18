import React from 'react';
import { Row, Col, Icon, Pagination, Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import './ListHlJob.scss';
//@ts-ignore

interface IListHlJobProps {
    highlightData?: any;
    is_loading?: boolean;
    getHighLightJobs?: Function;
    loading_high_light_data?: boolean;
    
}

export default class ListHlJob extends React.Component<IListHlJobProps> {


    render() {
        let { highlightData, loading_high_light_data, isSearchEvent } = this.props;
        // let {loading_high_light_data} = this.state;
        return (
            <div className='hl-job hidden-only-phone'>
                <h5>Công việc hàng đầu</h5>
                <div className='all-hl-job'>
                    <Row>
                        {highlightData && highlightData.items && highlightData.items.map((item, index) => {
                            return (
                                <Col key={index} xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
                                    {loading_high_light_data ?
                                        <Skeleton key={index} loading={true} avatar paragraph={{ rows: 1 }} active={true} /> :
                                        <Link to={`/job-detail/${window.btoa(item.id)}`}
                                            target='_blank'>
                                            <div key={index} className='item-hl-job'>
                                                <div style={{ flex: 1 }}>
                                                    {item.employerLogoUrl ? <img src={item.employerLogoUrl} alt='works result' height='60px' width='60px' style={{ objectFit: 'contain' }} /> :
                                                        <div style={{ width: 60, height: 60, backgroundColor: '#f2f2f2', borderRadius: 3, display: 'inline-block' }}></div>
                                                    }
                                                    {item.jobType === 'FULLTIME' ? <div className='l_c' style={{ display: 'inline-block', padding: '0 2px', backgroundColor: '#32A3F9', color: '#fff', fontSize: '0.7em', width: '60px', marginTop: 4 }}>FullTime</div> : null}
                                                    {item.jobType === 'PARTTIME' ? <div className='l_c' style={{ display: 'inline-block', padding: '0 2px', backgroundColor: 'rgb(0, 179, 60)', color: '#fff', fontSize: '0.7em', width: '60px', marginTop: 4 }}>Part-Time</div> : null}
                                                    {item.jobType === 'INTERNSHIP' ? <div className='l_c' style={{ display: 'inline-block', padding: '0 2px', backgroundColor: 'rgb(255, 153, 51)', color: '#fff', fontSize: '0.7em', width: '60px', marginTop: 4 }}>InternShip</div> : null}
                                                </div>


                                                <ul style={{ flex: 4, marginLeft: 10, marginBottom: 0 }}>
                                                    <li >
                                                        <Link to={`/job-detail/${window.btoa(item.id)}`}
                                                            target='_blank'
                                                            style={{ color: '#ff6f6f', }}
                                                        >
                                                            <div className='l_c' >{item.jobTitle}</div>
                                                        </Link>
                                                    </li>

                                                    <li>
                                                        <div style={{ color: 'red', fontSize: '0.9em' }}> <Icon type='fire' twoToneColor="#168ECD" style={{ color: 'red' }} />Công Việc Hot</div>
                                                    </li>
                                                    <li style={{ fontSize: '0.71rem' }}>
                                                        <Icon type="environment" style={{ color: "#168ECD" }} theme={'filled'} />
                                                        <label style={{ minWidth: 80, marginBottom: 0 }}>  {item.region.name + ' '}</label>
                                                        {/* <i className="fa fa-briefcase" aria-hidden="true" style={{ color: '#168ECD' }} /> */}

                                                    </li>

                                                </ul>

                                            </div>
                                        </Link>
                                    }
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
                                // console.log(page);
                                this.props.getHighLightJobs(page - 1)
                                this.setState({ loading_high_light_data: true })
                            }
                        }
                    />
                </div>
            </div>
        )
    }
}

// export default function ListHlJob(props?: IListHlJobProps) {

// }