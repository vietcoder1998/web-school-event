import React from 'react';
import { Row, Col } from 'antd';
import './Option.scss'
import { connect } from 'react-redux';

import { REDUX_SAGA } from './../../../../../const/actions';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { TYPE } from './../../../../../const/type';
import { IJobSearchFilter } from './../../../../../models/job-search';

interface IProps {
    getOption?: Function;
    inday_data?: any;
    regions: Array<any>,
    jobNames: Array<any>,
    history?: any,
    getJobResult: Function,
    getJobNames: Function,
}
interface IState {
    body?: any;
}

function Option(props?: IProps) {
    React.useEffect(() => { props.getJobNames() }, []);

    let [body, setBody] =
        React.useState({
            employerID: null,
            excludedJobIDs: null,
            excludePriority: null,
            shuffle: true,
            jobNameIDs: null,
            jobGroupID: null,
            jobType: null,
            jobShiftFilter: null,
            jobLocationFilter: {
                regionID: null
            }
        })


    function searchJob() {
        props.getJobResult(body);
        props.getJobNames(body)
        window.scrollTo({ top: 0 });
    }
    let {jobNames} = props
    return (
        <div className='option content-footer'>
            <Row >
                <Col xs={24} sm={24} md={8} lg={8} className='rule' >
                    <h6>Theo tỉnh thành</h6>
                    <ul >
                        <li onClick={() => { let newBody = body; newBody.jobLocationFilter.regionID = 24; setBody(newBody); searchJob() }}>
                            <Link to={'/result'}>
                                Hà Nội
                            </Link>
                        </li>
                        <li onClick={() => { let newBody = body; newBody.jobLocationFilter.regionID = 29; searchJob() }}>
                            <Link to={'/result'}>
                                TP.Hồ Chí Minh
                            </Link>
                        </li>
                        <li onClick={() => { let newBody = body; newBody.jobLocationFilter.regionID = 15; searchJob() }}>
                            <Link to={'/result'}>
                                Đà Nẵng
                            </Link>
                        </li>
                        <li onClick={() => { let newBody = body; newBody.jobLocationFilter.regionID = 27; searchJob() }}>
                            <Link to={'/result'}>
                                Hải Phòng
                            </Link>
                        </li>
                    </ul>
                    <p>
                        <Link to='/tat-ca-cac-tinh' style={{textDecoration: 'underline', fontSize: '0.93em'}}>Xem tất cả >></Link>
                    </p>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} className='rule' >
                    <h6>Theo tên công việc</h6>
                    <ul className='hidden-only-phone'>
                        {
                            jobNames && jobNames.length > 0 ? jobNames.map((item?: { name?: string, id?: number }, i?: number) => {
                                if (i < 4) return <li key={i} onClick={() => { let newBody = body; newBody.jobNameIDs = [item.id]; searchJob() }}>
                                    <Link to={'/result'}>
                                        {item.name}
                                    </Link>
                                </li>

                                return ''
                            }
                            ) : ''
                        }
                    </ul>
                    <p>
                        <Link to='/tat-ca-cac-cong-viec' style={{textDecoration: 'underline', fontSize: '0.93em'}}>Xem tất cả >></Link>
                    </p>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} className='rule' >
                    <h6>Theo loại công việc</h6>
                    <ul >
                        <li onClick={() => { let newBody = body; newBody.jobType = TYPE.FULLTIME; searchJob() }} >
                            <Link to={'/result'}>
                                FullTime
                            </Link>
                        </li>
                        <li onClick={() => { let newBody = body; newBody.jobType = TYPE.PARTTIME; searchJob() }}>
                            <Link to={'/result'}>
                                PartTime
                            </Link>
                        </li>
                        <li onClick={() => { let newBody = body; newBody.jobType = TYPE.INTERNSHIP; searchJob() }}>
                            <Link to={'/result'}>
                                Thực tập
                            </Link>
                        </li>
                        <li>

                        </li>
                    </ul>
                    <p>
                        <Link to='/result' style={{textDecoration: 'underline', fontSize: '0.93em'}}>Xem tất cả >></Link>
                    </p>
                </Col>
            </Row>
        </div>
    );
};

const mapStateToProps = (state) => ({
    regions: state.Regions.items,
    jobNames: state.JobNames.items,
})

const mapDispatchToProps = dispatch => ({
    getJobNames: (pageIndex?: number, pageSize?: number) => dispatch({ type: REDUX_SAGA.JOB_NAMES.GET_JOB_NAMES, pageIndex, pageSize }),
    getJobResult: (body?: IJobSearchFilter) => dispatch({ type: REDUX_SAGA.JOB_RESULT.GET_JOB_RESULT, body })
})

export default connect(mapStateToProps, mapDispatchToProps)(Option);