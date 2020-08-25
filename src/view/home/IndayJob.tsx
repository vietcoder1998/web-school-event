import React, { PureComponent } from 'react';
import { Col, Row, Skeleton, Pagination, Icon } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
//@ts-ignore
import DefaultImage from '../../assets/image/base-image.jpg';
import { REDUX_SAGA } from '../../const/actions';
import { JobType } from '../layout/common/Common';
import LinkToolTip from '../layout/common/LinkToolTip';
import { IAppState } from '../../redux/store/reducer';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { convertFullSalary } from '../../utils/convertNumber';

interface IProps {
    getHotJob?: Function;
    getInDay?: Function;
    topJob?: any;
    indayJob?: any;
    param?: any;
    loading?: boolean;
}

interface IState {
    list_job_top: Array<any>,
    pageIndex: number,
    pageSize: number,
    loading: boolean,
    atk: string,
}

class IndayJob extends PureComponent<IProps, IState> {
    constructor(props) {
        super(props);
        this.state = {
            list_job_top: [],
            pageIndex: 0,
            pageSize: 9,
            atk: 'inday-job',
            loading: true
        };
    };

    componentDidMount = async () => {
        // await this.props.getHotJob(0);
        await this.props.getInDay(0);
    };

    changePage = (event?: number) => {
        this.props.getInDay(event - 1)
    };

    render() {
        let { indayJob, param, loading } = this.props;
        if (indayJob && indayJob.totalItems > 0) {
            return (
                <div className="home-job">
                    <Row style={{ display: indayJob.totalItems === 0 ? 'none' : '' }}>
                        <h5 style={{ textAlign: 'center' }}>VIỆC LÀM TRONG NGÀY</h5>
                        {
                            indayJob && indayJob.items ? indayJob.items.map((item, index) => {
                                let logoUrl = item.employerLogoUrl;

                                if (!logoUrl) {
                                    logoUrl = DefaultImage
                                }

                                return <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6} key={index}>
                                    {
                                        loading ?
                                            (
                                                <Skeleton key={index}
                                                    loading={true}
                                                    avatar
                                                    paragraph={{ rows: 1 }} />
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
                                                                <Link to={`/job-detail/${window.btoa(item.id)}${param}`}
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
                                                                                        className="top-badge "
                                                                                        style={{ marginRight: 5 }}
                                                                                        children={"HOT"}
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
                                                                    className="name_employer">
                                                                    <LinkToolTip
                                                                        title={item.employerName}
                                                                        name={<>
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
                                pageSize={indayJob.pageSize}
                                total={indayJob.totalItems}
                                style={{ margin: '10px 0px' }}
                                onChange={this.changePage}
                            />
                        </Col>
                    </Row>
                </div>
            );
        }
        return null;
    }
}

const mapStateToProps = (state: IAppState) => ({
    topJob: state.HotJobResult.data,
    indayJob: state.InDayResult.data,
    loading: state.InDayResult.loading,
    param: state.DetailEvent.param,
});

const mapDispatchToProps = dispatch => ({
    getHotJob: (pageIndex?: number, pageSize?: number) => dispatch({
        type: REDUX_SAGA.HOT_JOB.GET_HOT_JOB,
        pageIndex,
        pageSize
    }),
    getInDay: (pageIndex?: number, pageSize?: number) => dispatch({
        type: REDUX_SAGA.IN_DAY.GET_IN_DAY_JOB,
        pageIndex,
        pageSize
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(IndayJob);