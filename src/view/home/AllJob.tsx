import React, {PureComponent} from 'react';
import {Col, Row, Skeleton, Pagination, Icon} from 'antd';
// import './AllJob.scss'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
//@ts-ignore
import DefaultImage from '../../assets/image/base-image.jpg';
import {REDUX_SAGA} from '../../const/actions';
import {JobType} from '../layout/common/Common';
import {convertFullSalary} from '../../utils/convertNumber'
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface IProps {
    getAllJob?: Function;
    allJob?: any;
    loading_all_job?: any;
    param?: any
}

class AllJob extends PureComponent<IProps> {

    componentDidMount = async () => {
        await this.props.getAllJob(0);
    };

    changePage = (event?: number) => {
        this.props.getAllJob(event - 1)
    };

    render() {
        let {allJob, loading_all_job, param} = this.props;
        return (
            <Row className='home-job' style={{display: allJob.totalItems === 0 ? 'none' : ''}}>
                <h5 style={{textAlign: 'center'}}>VIỆC LÀM ĐANG TUYỂN</h5>
                {
                    allJob && allJob.items ? allJob.items.map((item, index) => {
                        let logoUrl = item.employerLogoUrl;

                        if (!logoUrl) {
                            logoUrl = DefaultImage
                        }

                        return <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6} key={index}>
                            {loading_all_job ?
                                (
                                    <Skeleton key={index}
                                              loading={true}
                                              avatar
                                              paragraph={{rows: 1}}
                                              active={true}/>
                                )
                                :
                                (
                                    <div key={index} className='h-j-item'>
                                        <div className='img-job'>
                                            <LazyLoadImage src={logoUrl} alt="employer logo"/>
                                            <JobType>{item.jobType}</JobType>
                                        </div>
                                        <div className='job-content'>
                                            <ul>
                                                <li className='j-d'>
                                                    <Link to={`/job-detail/${window.btoa(item.id)}${param}`}
                                                          target='_blank'>
                                                        <h6 className='l_c'>{item.jobTitle}</h6>
                                                    </Link>
                                                </li>
                                                <li className='l_c'>
                                                    <Link to={`/employer/${window.btoa(item.employerID)}${param}`}
                                                          target='_blank'
                                                          className="name_employer">{item.employerName}
                                                    </Link>
                                                </li>
                                                <li className="region">
                                                    <Icon type="environment" style={{marginRight: 3}}/>
                                                    {item.region && item.region.name
                                                        ? item.region.name
                                                        : null}
                                                </li>
                                                <li className="salary">
                                                    <Icon type="dollar" style={{marginRight: 3}}/>
                                                    <span className="salary-label">
                                                        <b>
                                                            {convertFullSalary(item.minSalary, item.minSalaryUnit,
                                                                item.maxSalary, item.maxSalaryUnit)}
                                                        </b>
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                )
                            }
                        </Col>
                    }) : null}
                <Col span={24} style={{textAlign: 'center'}}>
                    <Pagination
                        pageSize={allJob.pageSize}
                        total={allJob.totalItems}
                        style={{margin: '25px 0px 10px'}}
                        onChange={this.changePage}
                    />
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state) => ({
    allJob: state.AllJobResult.data,
    loading_all_job: state.AllJobResult.loading,
    param: state.DetailEvent.param
});

const mapDispatchToProps = dispatch => ({
    getAllJob: (pageIndex?: number, pageSize?: number) => dispatch({
        type: REDUX_SAGA.ALL_JOB.GET_ALL_JOB,
        pageIndex,
        pageSize
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllJob);