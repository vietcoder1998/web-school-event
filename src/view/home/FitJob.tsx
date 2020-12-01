import React, { PureComponent } from 'react';
import { Col, Row, Skeleton, Pagination, Icon } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
//@ts-ignore
import DefaultImage from '../../assets/image/base-image.jpg';
import { REDUX_SAGA } from '../../const/actions';
import { JobType } from '../layout/common/Common';
import LinkToolTip from '../layout/common/LinkToolTip';
import { convertFullSalary } from '../../utils/convertNumber';
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface IProps {
    getFitJob?: Function;
    getInDay?: Function;
    topJob?: any;
    indayJob?: any;
    setLoadingGetFitJob?: Function;
    loading?: any;
    param?: any
};


class TopJob extends PureComponent<IProps> {
    componentDidMount = async () => {
        let is_brid = localStorage.getItem("branchIDs");
        if (is_brid&& is_brid !==null) {
            let  branchIDs = localStorage.getItem("branchIDs")
            await this.props.getFitJob(0, 12, [parseInt(branchIDs)]);
        }
    };

    changePage = (event?: number) => {
        this.props.getFitJob(event - 1)
    };

    render() {
        let { topJob, loading, param } = this.props;
        return (
            <div className='home-job'>
                <Row  style={{ display: topJob.totalItems === 0 ? 'none' : '' }}>
                    <h5 style={{ textAlign: 'center' }}><Icon type="check"style={{marginRight:10}} />VIỆC LÀM PHÙ HỢP</h5>
                    {
                        topJob && topJob.items ? topJob.items.map((item, index) => {
                            let logoUrl = item.employerLogoUrl;

                            if (!logoUrl) {
                                logoUrl = DefaultImage
                            }

                            return <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6} key={index}>
                                {loading ?
                                    (
                                        <Skeleton
                                            key={index}
                                            loading={true}
                                            avatar
                                            paragraph={{ rows: 1 }}
                                            active={true} />
                                    )
                                    :
                                    (
                                        <div key={index} className='h-j-item'>
                                            <div className='img-job'>
                                                <Link to={`/employer/${btoa(item.employerID)}`}>
                                                    <LazyLoadImage src={logoUrl} alt="employer logo" />
                                                </Link>
                                                <JobType>{item.jobType}</JobType>
                                            </div>
                                            <div className='job-content'>
                                                <ul>
                                                    <li className='j-d'>
                                                        <Link to={`/chi-tiet-cong-viec/${window.btoa(item.id)}${param}`}
                                                            target='_blank'>
                                                            <h6 className='l_c'
                                                                style={{
                                                                    color: item.titleHighlight ? "red" : "black",
                                                                }}
                                                            >
                                                                <LinkToolTip
                                                                    title={item.jobTitle}
                                                                    name={
                                                                        <>
                                                                            <span
                                                                                className="in-day-badge"
                                                                                style={{ marginRight: 5 }}
                                                                                children={"GẤP"}
                                                                            />
                                                                            {item.jobTitle}
                                                                        </>
                                                                    }
                                                                    transform={"uppercase"}
                                                                />
                                                            </h6>
                                                        </Link>
                                                    </li>
                                                    <li className='l_c'>
                                                        <Link
                                                            to={`/employer/${window.btoa(item.employerID)}${param}`}
                                                            target='_blank'
                                                            className="name_employer"
                                                        >
                                                            <LinkToolTip
                                                                title={item.employerName}
                                                                name={
                                                                    <>
                                                                        <Icon
                                                                            type="shop"
                                                                            style={{ marginRight: 5 }}

                                                                        />
                                                                        {item.employerName}
                                                                    </>}
                                                                transform={"initial"}
                                                            />
                                                        </Link>
                                                    </li>
                                                    <li className="region">
                                                        <Icon type="environment" style={{ marginRight: 3 }} />
                                                        {item.region && item.region.name
                                                            ? item.region.name
                                                            : null}
                                                    </li>
                                                    <li className="region">
                                                        <span className="salary-label">
                                                            <Icon type="dollar" style={{ marginRight: 3 }} />
                                                            {convertFullSalary(item.minSalary, item.minSalaryUnit,
                                                                item.maxSalary, item.maxSalaryUnit)}
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    )
                                }
                            </Col>
                        }) : null}
                    <Col span={24} style={{ textAlign: 'center' }}>
                        <Pagination
                            pageSize={topJob.pageSize}
                            total={topJob.totalItems}
                            style={{ margin: '25px 0px 10px' }}
                            onChange={this.changePage}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    topJob: state.FitJob.data,
    loading: state.FitJob.loading,
    param: state.DetailEvent.param
})

const mapDispatchToProps = dispatch => ({
    getFitJob: (pageIndex?: number, pageSize?: number,branchIDs?: Array<any>) => dispatch({
        type: REDUX_SAGA.FIT_JOB.GET_FIT_JOB,
        pageIndex,
        pageSize,
        branchIDs
    }),
})

export default connect(mapStateToProps, mapDispatchToProps)(TopJob);