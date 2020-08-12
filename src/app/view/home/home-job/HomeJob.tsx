import React, {PureComponent} from 'react';
import {Col, Row, Skeleton, Pagination, Icon} from 'antd';
import './HomeJob.scss'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
//@ts-ignore
import DefaultImage from '../../../../assets/image/carouselGroup/carousel2.jpg';
import {REDUX_SAGA} from '../../../../const/actions';
import {JobType} from '../../layout/common/Common';
import {convertFullSalary} from '../../../../utils/convertNumber'

interface IProps {
    getHotJob?: Function;
    getInDay?: Function;
    topJob?: any;
    indayJob?: any;
    setLoadingGetHotJob?: Function;
    loading_hot_job?: any;
    param?: any
};


class HomeJob extends PureComponent<IProps> {

    componentDidMount = async () => {
        await this.props.getHotJob(0);
    };

    changePage = (event?: number) => {
        this.props.getHotJob(event - 1)
    };

    render() {
        let {topJob, loading_hot_job, param} = this.props;
        return (
            <Row className='home-job' style={{display: topJob.totalItems === 0 ? 'none' : ''}}>
                <h5 style={{textAlign: 'center'}}>VIỆC LÀM NỔI BẬT</h5>
                {
                    topJob && topJob.items ? topJob.items.map((item, index) => {
                        let logoUrl = item.employerLogoUrl;

                        if (!logoUrl) {
                            logoUrl = DefaultImage
                        }

                        return <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6} key={index}>
                            {loading_hot_job ?
                                (
                                    <Skeleton
                                        key={index}
                                        loading={true}
                                        avatar
                                        paragraph={{rows: 1}}
                                        active={true}/>
                                )
                                :
                                (
                                    <div key={index} className='h-j-item'>
                                        <div className='img-job'>
                                            <img src={logoUrl} alt="employer logo"/>
                                            <JobType>{item.jobType}</JobType>
                                        </div>
                                        <div className='job-content'>
                                            <ul>
                                                <li className='j-d'>
                                                    <Link to={`/job-detail/${window.btoa(item.id)}${param}`}
                                                          target='_blank'>
                                                        <h6 className='l_c'
                                                            style={{
                                                                color: item.titleHighlight ? "red" : "black",
                                                            }}
                                                        >
                                                             <span className="top-badge"
                                                                   style={{marginRight: 5}}>Hot</span>
                                                            {item.jobTitle}
                                                        </h6>
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
                        pageSize={topJob.pageSize}
                        total={topJob.totalItems}
                        style={{margin: '25px 0px 10px'}}
                        onChange={this.changePage}
                    />
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state) => ({
    topJob: state.HotJobResult.data,
    loading_hot_job: state.HotJobResult.loading,
    param: state.DetailEvent.param
})

const mapDispatchToProps = dispatch => ({
    getHotJob: (pageIndex?: number, pageSize?: number) => dispatch({
        type: REDUX_SAGA.HOT_JOB.GET_HOT_JOB,
        pageIndex,
        pageSize
    }),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeJob);