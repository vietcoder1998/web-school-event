import React from 'react';
import { Row, Col, Icon, Pagination, Skeleton, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
//@ts-ignore
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { JobType } from '../../layout/common/Common';
// import { limitString } from './../../../utils/limitString';

interface IListHlJobProps {
    highlightData?: any;
    is_loading?: boolean;
    getHighLightJobs?: Function;
    loadingHlData?: boolean;
    param?: string;
    history?: any;
}

export default class ListHlJob extends React.Component<IListHlJobProps> {
    render() {
        let { highlightData, loadingHlData, param } = this.props;
        // let {loadingHlData} = this.state;
        return (
            <div className='hl-job hidden-only-phone'>
                <div className='all-hl-job'>
                    <Row>
                        {highlightData && highlightData.items && highlightData.items.map((item, index) => {
                            return (
                                <Col key={index} xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
                                    {loadingHlData ?
                                        <Skeleton key={index} loading={true} avatar paragraph={{ rows: 1 }} active={true} /> :
                                        <Tooltip title="Công việc hot" style={{ backgroundColor: "white", color: "black" }}>
                                            <div key={index} className='item-hl-job'>
                                                <div style={{ flex: 1}}>
                                                    {item.employerLogoUrl ? <LazyLoadImage src={item.employerLogoUrl} alt='works result' height='60px' width='60px' style={{ objectFit: 'contain' }} /> :
                                                        <div style={{ width: 60, height: 60, backgroundColor: '#f2f2f2', borderRadius: 3, display: 'inline-block' }}></div>
                                                    }
                                                    <JobType>{item.jobType}</JobType>
                                                </div>
                                                <ul style={{ flex: 4, marginLeft: 10, marginBottom: 0 }}>
                                                    <li className="maxline-2">
                                                        <Link to={`/job-detail/${window.btoa(item.id)}${param}`}
                                                            target='_blank'
                                                            style={{fontStyle: "italic", fontWeight: "bold"}}
                                                        >
                                                            <Icon type='fire' theme={"filled"}/> {item.jobTitle + " [HOT]"}
                                                        </Link>
                                                    </li>
                                                    <li className="maxline-1">
                                                        <Icon type='shop' />{item.employerName}
                                                    </li>
                                                    <li className="maxline-1">
                                                        <Icon type="environment" /> {item.region.name}
                                                        {/* <i className="fa fa-briefcase" aria-hidden="true" style={{ color: '#168ECD' }} /> */}
                                                    </li>

                                                </ul>
                                            </div>
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
                        style={{padding: -6}}
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