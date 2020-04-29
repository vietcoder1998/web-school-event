import React, { PureComponent } from 'react';
import { Col, Row, Skeleton, Avatar, Pagination } from 'antd';
import './TopJob.scss'
import { connect } from 'react-redux';
import { limitString } from '../../../../utils/limitString';
import { Link } from 'react-router-dom';
//@ts-ignore
import DefaultImage from '../../../../assets/image/carouselGroup/carousel2.jpg';
import { REDUX_SAGA } from '../../../../const/actions';
import { JobType } from '../../layout/common/Common';

interface IProps {
    getHotJob?: Function;
    getInDay?: Function;
    topJob?: any;
    indayJob?: any;
};

interface IState {
    list_job_top: Array<any>,
    pageIndex: number,
    pageSize: number,
    is_loading: boolean,
    atk: string,
};

class TopJob extends PureComponent<IProps, IState> {
    constructor(props) {
        super(props);
        this.state = {
            list_job_top: [

            ],
            pageIndex: 0,
            pageSize: 9,
            atk: 'inday-job',
            is_loading: true
        };
    };

    componentDidMount = async () => {
        await this.props.getEventHotJob(0);
        
        console.log(this.props)
        // await this.setState({ is_loading: false });
        // setInterval(() => {
        //     let { atk } = this.state;

        //     if (atk === 'inday-job') {
        //         this.setState({ atk: 'home-job' })
        //     }

        //     if (atk === 'home-job') {
        //         this.setState({ atk: 'inday-job' })
        //     }
        // }, 60000);
    }

    render() {
        let {  indayJob } = this.props;
        let { is_loading } = this.state;

        if (indayJob && indayJob.totalItems > 0) {
            return (
                <Row className='home-job' style={{ display: indayJob.totalItems === 0 ? 'none' : '' }}>
                    <h5 style={{ textAlign: 'center' }}>VIỆC LÀM TRONG NGÀY</h5>
                    {
                        indayJob && indayJob.items ? indayJob.items.map((item, index) => {
                            let logoUrl = item.employerLogoUrl;

                            if (!logoUrl) {
                                logoUrl = DefaultImage
                            }

                            return <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} key={index}>
                                {is_loading ?
                                    <Skeleton key={index} loading={true} avatar paragraph={{ rows: 1 }} /> :
                                    (<div key={index} className='h-j-item'>
                                        <div className='img-job'>
                                            <Avatar
                                                shape={'square'}
                                                src={logoUrl}
                                                alt='ảnh công ti'
                                                style={{ height: 70, width: 70 }}
                                            />
                                            <JobType>{item.jobType}</JobType>
                                        </div>
                                        <div className='job-content'>
                                            <ul>
                                                <li className='j-d'>
                                                    <Link to={`/job-detail/${window.btoa(item.id)}`} target='_blank' >
                                                        <h6 className='l_c'>{limitString(item.jobTitle, 30)}</h6>
                                                    </Link>
                                                </li>
                                                <li className='l_c'>
                                                    <Link to={`/employer/${window.btoa(item.employerID)}`} target='_blank' >{limitString(item.employerName, 30)}</Link>
                                                </li>
                                                <li className='time-left'>{item.region.name}</li>
                                            </ul>
                                        </div>
                                    </div>)} </Col>
                        }) : null}
                    <Col span={24} style={{ textAlign: 'center' }}>
                        <Pagination
                            pageSize={indayJob.pageSize}
                            total={indayJob.totalItems}
                            style={{ margin: '10px 0px' }}
                            onChange={(event?: number) => this.props.getHotJob(event - 1)}
                        />
                    </Col>
                </Row>
            );
        }
        return null;
    }
}

const mapStateToProps = (state) => ({
    topJob: state.HotJobResult.data,
    indayJob: state.InDayResult.data
})

const mapDispatchToProps = dispatch => ({
    getEventHotJob: (pageIndex?: number, pageSize?: number) => dispatch({ type: REDUX_SAGA.EVENT.JOB.HOT, pageIndex, pageSize }),
   
})

export default connect(mapStateToProps, mapDispatchToProps)(TopJob);