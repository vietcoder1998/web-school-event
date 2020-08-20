import React from 'react';
import { Row, Col, Icon, Pagination, Skeleton, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
//@ts-ignore
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { limitString } from './../../../utils/limitString';


interface IListHlJobProps {
    highlightData?: any;
    is_loading?: boolean;
    getHighLightJobs?: Function;
    loadingHlData?: boolean;
    param?: string
}

export default class ListHlJob extends React.Component<IListHlJobProps> {
    render() {
        let { highlightData, loadingHlData, param } = this.props;
        // let {loadingHlData} = this.state;
        return (
            <div className='hl-job hidden-only-phone'>
                <h5>CÔNG VIỆC HÀNG ĐẦU</h5>
                <div className='all-hl-job'>
                    <Row>
                        {highlightData && highlightData.items && highlightData.items.map((item, index) => {
                            return (
                                <Col key={index} xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
                                    {loadingHlData ?
                                        <Skeleton key={index} loading={true} avatar paragraph={{ rows: 1 }} active={true} /> :
                                        <Tooltip title="Công việc hot" style={{ backgroundColor: "white", color: "black" }}>
                                            <Link to={`/job-detail/${window.btoa(item.id)}${param}`}
                                                target='_blank'>
                                                <div key={index} className='item-hl-job'>
                                                    <div style={{ flex: 1, padding: "5px 0px" }}>
                                                        {item.employerLogoUrl ? <LazyLoadImage src={item.employerLogoUrl} alt='works result' height='60px' width='60px' style={{ objectFit: 'contain' }} /> :
                                                            <div style={{ width: 60, height: 60, backgroundColor: '#f2f2f2', borderRadius: 3, display: 'inline-block' }}></div>
                                                        }
                                                        {item.jobType === 'FULLTIME' ? <div className='l_c' style={{ display: 'inline-block', padding: '0 2px', backgroundColor: '#32A3F9', color: '#fff', fontSize: '0.7em', width: '60px', marginTop: 4 }}>FullTime</div> : null}
                                                        {item.jobType === 'PARTTIME' ? <div className='l_c' style={{ display: 'inline-block', padding: '0 2px', backgroundColor: 'rgb(0, 179, 60)', color: '#fff', fontSize: '0.7em', width: '60px', marginTop: 4 }}>Part-Time</div> : null}
                                                        {item.jobType === 'INTERNSHIP' ? <div className='l_c' style={{ display: 'inline-block', padding: '0 2px', backgroundColor: 'rgb(255, 153, 51)', color: '#fff', fontSize: '0.7em', width: '60px', marginTop: 4 }}>InternShip</div> : null}
                                                    </div>
                                                    <ul style={{ flex: 4, marginLeft: 10, marginBottom: 0 }}>
                                                        <li style={{ marginBottom: 5 }} >
                                                            <Link to={`/job-detail/${window.btoa(item.id)}${param}`}
                                                                target='_blank'
                                                            >
                                                                <Icon type='fire' /> {limitString(item.jobTitle, 30) + "[HOT]"}
                                                            </Link>
                                                        </li>
                                                        <li >
                                                            <Icon type='shop' />{limitString(item.employerName, 15)}
                                                        </li>
                                                        <li >
                                                            <Icon type="environment" /> {item.region.name}
                                                            {/* <i className="fa fa-briefcase" aria-hidden="true" style={{ color: '#168ECD' }} /> */}
                                                        </li>

                                                    </ul>

                                                </div>
                                            </Link>
                                        </Tooltip>
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
                                this.setState({ loadingHlData: true })
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