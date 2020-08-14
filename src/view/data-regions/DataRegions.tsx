import React from 'react';
import Layout from '../layout/Layout';
import { IAppState } from '../../redux/store/reducer';
import { DangerousWord } from '../layout/common/Common';
import { connect } from 'react-redux';
import { REDUX_SAGA } from '../../const/actions';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { IJobSearchFilter } from '../../models/job-search';
interface IProps {
    regions?: any;
    getRegions?: Function;
    getJobResult?: Function;
}

function DataRegions(props: IProps) {
    let { regions } = props;
    React.useEffect(() => { props.getRegions() });

    let [body, setBody] =
        React.useState({
            employerID: null,
            excludedJobIDs: null,
            excludePriority: null,
            shuffle: false,
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
        window.scrollTo({ top: 0 });
    }

    return (
        <Layout>
            <div className='content'>
                <div style={{ padding: '10px 20px', backgroundColor: 'white', boxShadow: '0 0.5px 0 rgba(0, 0, 0, 0.1)' }} className='data'>
                    <Row style={{ padding: 10 }}>
                        <h5>Công Việc Theo Tỉnh Thành</h5>
                        {
                            regions &&
                            regions.map(
                                (item?: any, i?: number) => (
                                    <Col sm={24} md={12} lg={8} xl={8} xxl={4} key={i} >
                                        <div
                                            onClick={
                                                () => {
                                                    let newBody = body;
                                                    newBody.jobLocationFilter.regionID = item.id;
                                                    localStorage.setItem('region', JSON.stringify(item))
                                                    setBody(newBody);
                                                    searchJob()
                                                }
                                            }
                                        >
                                            <Link to={`/result?rid=${item.id}`} >
                                                {item.name}<DangerousWord size={item.totalJobs} />
                                            </Link>
                                        </div>

                                    </Col>))
                        }
                    </Row>
                </div>
            </div>
        </Layout >)
}

const mapStateToProps = (state: IAppState, ownProps) => ({
    regions: state.Regions.items
})


const mapDispatchToProps = (dispatch) => ({
    getRegions: (pageIndex?: number, pageSize?: number) => dispatch({ type: REDUX_SAGA.REGIONS.GET_REGIONS, pageIndex, pageSize }),
    getJobResult: (body?: IJobSearchFilter) => dispatch({ type: REDUX_SAGA.JOB_RESULT.GET_JOB_RESULT, body })

})

export default connect(mapStateToProps, mapDispatchToProps)(DataRegions)