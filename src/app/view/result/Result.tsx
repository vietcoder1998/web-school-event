import React from 'react';
import './Result.scss'
import Layout from '../layout/Layout';
import { Row, Col, Pagination, BackTop } from 'antd';
import { connect } from 'react-redux';
import { moveScroll } from '../../../utils/moveScroll';
// @ts-ignore
import Cookie from 'universal-cookie';
import { REDUX_SAGA, REDUX } from '../../../const/actions';
import ListResult from './list-result/ListResult';
import SearchMore from './search-more/SearchMore';
import ListHlJob from './list-hl-job/ListHlJob';
import { IJobSearchFilter } from '../../../models/job-search';
import SearchFilter from './search-filter/SearchFilter';
import ResultFilter from './result-filter/ResultFilter';
import qs from 'query-string';

const cookie = new Cookie();

interface IPropsResult extends StateProps, DispatchProps {
    getJobResults: Function;
    getHighLightData: Function;
    match?: any;
    getListJobNames: (name?: string) => any;
    getListRegions: (name?: string) => any;
    loading_high_light_data?: any;
    loading?: any;
    jobType?: any;
    area?: any;
    location?: any;
    setFilterJobType?: any;
    history?: any;

}

interface IStateResult {
    is_search: boolean;
    loading: boolean;
    search_word: string;
    jobNameID: string;
    dataSource: any;
    show_job: boolean;
    region: {
        name: string;
        totalJobs: number;
    };
    pageIndex?: number;
    pageSize?: number;
    list_last_word: any;
    body?: IJobSearchFilter;
    job?: any;
    pageIndexHighLight?: any;
};

class Result extends React.Component<IPropsResult, IStateResult> {
    constructor(props) {
        super(props);
        this.state = {
            is_search: false,
            loading: false,
            search_word: '',
            jobNameID: null,
            dataSource: [],
            pageIndex: 0,
            pageIndexHighLight: -1,
            pageSize: 0,
            show_job: false,
            region: JSON.parse(localStorage.getItem('region')),
            job: JSON.parse(localStorage.getItem('job')),
            list_last_word: [],
            body: {
                employerID: null,
                excludedJobIDs: null,
                jobNameIDs: null,
                jobType: null,
                shuffle: false,
                jobPriorityFilter: null,
                jobShiftFilter: {
                    gender: null,
                    weekDays: null,
                    dayTimes: null,
                },
                jobLocationFilter: {
                    regionID: null,
                    lat: null,
                    lon: null,
                    distance: 20000
                },
                schoolConnected: null
            }
        }
    }

    componentDidMount() {
        let { search_word, body, pageIndex, pageSize } = this.state;
        let { regions, jobNames } = this.props;
        if (regions.length === 0) {
            this.props.getListRegions();
        }

        if (jobNames.length === 0) {
            this.props.getListJobNames(search_word);
        }

        this.props.getHighLightData(0);
        // this._callLoading();
        this._callLastWord();

        let queryParam = qs.parse(this.props.location.search, { ignoreQueryPrefix: true })
        let jobType, jobNameID, regionID;
        let newWeekDays = [];
        let newDayTimes= [];
        if (this.props.setFilter) {
            // console.log(this.props.jobType)
            if (this.props.jobType) {
                jobType = this.props.jobType
            }
            if (this.props.job_dto && this.props.job_dto.name) {
                jobNameID = this.props.job_dto.id
            }
            if (this.props.area && this.props.area.id) {
                regionID = this.props.area.id
            }
            Object.keys(this.props.list_day).map((key) => {
                if (this.props.list_day[key] === true) {
                    newWeekDays.push(key)
                }
            });
            Object.keys(this.props.list_shift).map((key) => {
                if (this.props.list_shift[key] === true) {
                    newDayTimes.push(key)
                }
            });
        } else {
            // console.log(queryParam.jobNameID)
            if (queryParam.jobNameID) {
                jobNameID = Number(queryParam.jobNameID)
            } else {
                jobNameID = this.props.job_dto.id
            }
            if (queryParam.regionID) {
                regionID = Number(queryParam.regionID)
            } else {
                if (this.props.area && this.props.area.id) {
                    regionID = this.props.area.id
                } else {
                    regionID = null
                }
            }
            if (queryParam.jobType) {
                jobType = queryParam.jobType
            } else {
                jobType = this.props.jobType
            }
            Object.keys(this.props.list_day).map((key) => {
                if(queryParam[key] == 'true') {
                    newWeekDays.push(key)
                }
            })
            Object.keys(this.props.list_shift).map((key) => {
                if (queryParam[key] == 'true') {
                    newDayTimes.push(key)
                }
            });
        }
        this.setState({
            body: {
                ...body,
                jobType: jobType,
                jobNameIDs: jobNameID ? [jobNameID] : null,
                jobLocationFilter: {
                    ...body.jobLocationFilter,
                    regionID: regionID ? regionID : null
                },
                jobShiftFilter: {
                    ...body.jobShiftFilter,
                    weekDays: newWeekDays.length > 0 ? newWeekDays : null,
                    dayTimes: newDayTimes.length > 0 ? newDayTimes: null
                }
            },
            region: this.props.area
        }, () => {
            // console.log(this.state.body);
            if (!this.props.setFilter) {
                this.props.getJobResults(pageIndex, pageSize, this.state.body);
            }
        })
        // await console.log(this.state.body);
        // if (window.performance) {
        //     if (performance.navigation.type === 1) {
        //         this.props.getJobResults(pageIndex, pageSize, body);
        //     }
        // }
    }

    static getDerivedStateFromProps(nextProps?: IPropsResult, prevState?: IStateResult) {
        if (nextProps.match.param) {
            let { body } = prevState;
            nextProps.getJobResults(prevState.pageIndex, prevState.pageSize, body);
        }

        return null
    }

    _handleIndex = (pageIndex?: number, pageSize?: number) => {
        let { body } = this.state;
        moveScroll(0, 0);
        localStorage.setItem('paging', JSON.stringify({ pageIndex: pageIndex - 1, pageSize }));
        this.props.getJobResults(pageIndex - 1, pageSize, body);
        this.setState({ pageIndex: pageIndex - 1, pageSize })
        this._callLoading()
    }

    _callLastWord = () => {
        let { list_last_word } = this.state;
        let part = cookie.get('list_last_word');
        if (part) {
            list_last_word = part
        }
        this.setState({ list_last_word })
    }

    _callLoading = () => {
        this.setState({ loading: true });
        setTimeout(() => { this.setState({ loading: false }) }, 250);
    }

    _callJob = async () => {
        let { body, list_last_word, pageIndex, pageSize } = this.state;
        cookie.set('list_last_word', list_last_word, { path: '/result' });
        this.props.getJobResults(pageIndex, pageSize, body);
        this._callLoading();
    }

    onChangeJobFilter = async (event?: any) => {
        // console.log(event);
        let queryParam = qs.parse(this.props.location.search, { ignoreQueryPrefix: true })

        let { body } = this.state;
        if (event.jobType !== 'PARTTIME') {
            body.jobShiftFilter = {
                gender: null,
                weekDays: null,
                dayTimes: null,
            }
        }
        if (event.jobType) {
            body.jobType = event.jobType;
            queryParam.jobType = event.jobType
        } else {
            body.jobType = null;
        }
        // console.log(event.jobNameID)
        queryParam.jobNameID = event.jobNameID;
        if (event.jobNameID !== null && event.jobNameID !== undefined && event.jobNameID !== 0) {
            body.jobNameIDs = [event.jobNameID];
        } else {
            body.jobNameIDs = []
        }
        // console.log(event.regionID)
        queryParam.regionID = event.regionID
        body.jobLocationFilter.regionID = event.regionID;

        this.props.history.replace('?' + qs.stringify(queryParam))
        await this.setState({ body, pageIndex: 0 });
        // await console.log(this.state.pageIndex)
        await this._callJob();

    }

    onChangeShiftsFilter = async (event?: any) => {
        let { body } = this.state;
        let queryParam = qs.parse(this.props.location.search, { ignoreQueryPrefix: true })
        body.jobShiftFilter.weekDays = event.weekDays;
        body.jobShiftFilter.dayTimes = event.dayTimes;
        Object.keys(this.props.list_day).map((key) => {
            if (event.weekDays.includes(key)) {
                queryParam[key] = true
            } else {
                queryParam[key] = false
            }
        })
        Object.keys(this.props.list_shift).map((key) => {
            if (event.dayTimes.includes(key)) {
                queryParam[key] = true
            } else {
                queryParam[key] = false
            }
        })
        this.props.history.replace('?' + qs.stringify(queryParam))
        await this.setState({ body });
        await this._callJob();
    }

    render() {
        const { region, body } = this.state;
        const { results, highlightData, jobNames, regions, loading_high_light_data, loading } = this.props;
        const list_result = results.items;

        return (
            <Layout>
                <div className='content'>
                    <Row>
                        <Col xs={0} sm={0} md={0} lg={0} xl={0} xxl={2}></Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={20}>
                            <div className='search-result'>
                                {/* Search Result */}
                                <Row>
                                    <ListHlJob loading_high_light_data={loading_high_light_data} highlightData={highlightData} getHighLightJobs={(pageIndex) => {
                                        this.props.getHighLightData(pageIndex, 6)
                                    }} />
                                </Row>
                                {/* SearChTab */}
                                <div className='search-tab'>
                                    <SearchFilter
                                        loading={loading}
                                        jobNames={jobNames}
                                        // jobType={body.jobType}
                                        regions={regions}
                                        onChangeJobFilter={this.onChangeJobFilter}
                                        location={this.props.location}
                                    />
                                </div>

                                <ResultFilter numberRs={results.totalItems} regionName={region && region.name} totalJobs={region && region.totalJobs} />
                                <Row>
                                    <Col xs={24} sm={24} md={16} lg={16} xl={17} xxl={20} >
                                        <ListResult
                                            loading={loading}
                                            list_result={list_result}
                                        />
                                    </Col>
                                    <Col xs={0} sm={0} md={8} lg={8} xl={7} xxl={4} >
                                        <SearchMore
                                            loading={loading}
                                            onChangeShiftsFilter={this.onChangeShiftsFilter}
                                            jobType={body.jobType}
                                            location={this.props.location}

                                        />
                                    </Col>
                                </Row>
                                {/* Paginition */}
                                <div className='pagination-result'>
                                    <Pagination
                                        showSizeChanger
                                        defaultCurrent={1}
                                        total={results.totalItems}
                                        onChange={this._handleIndex}
                                        current={this.state.pageIndex + 1}
                                        onShowSizeChange={(current?: number, size?: number) => this._handleIndex(current, size)}
                                    />
                                </div>
                                {/* {Job} */}
                            </div>
                        </Col>
                        <Col xs={0} sm={0} md={0} lg={0} xl={0} xxl={2}></Col>
                    </Row>
                </div>
                <BackTop>
                </BackTop>
            </Layout>
        );
    }
};

const mapStateToProps = (state) => ({
    results: state.JobResult.result,
    loading: state.JobResult.loading,
    highlightData: state.HighLightResult.data,
    loading_high_light_data: state.HighLightResult.loading_high_light_data,
    isAuthen: state.isAuthen,
    jobNames: state.JobNames.items,
    regions: state.Regions.items,
    isMobile: state.MobileState.isMobile,
    jobType: state.JobResult.filter.jobType,
    area: state.JobResult.filter.area,
    setFilter: state.JobResult.setFilter,
    job_dto: state.JobResult.filter.job_dto,
    list_day: state.JobResult.filter.list_day,
    list_shift: state.JobResult.filter.list_shift,
});

const mapDispatchToProps = (dispatch) => ({
    getJobResults: (pageIndex?: number, pageSize?: number, body?: IJobSearchFilter) =>
        dispatch({ type: REDUX_SAGA.JOB_RESULT.GET_JOB_RESULT, pageIndex, pageSize, body }),
    getHighLightData: (pageIndex?: number, pageSize?: number) =>
        dispatch({ type: REDUX_SAGA.HIGH_LIGHT.GET_HIGH_LIGHT_DATA, pageIndex, pageSize }),
    getListJobNames: (name?: string) =>
        dispatch({
            type: REDUX_SAGA.JOB_NAMES.GET_JOB_NAMES, name
        }),
    getListRegions: (name?: string) =>
        dispatch({
            type: REDUX_SAGA.REGIONS.GET_REGIONS, name
        }),
    setFilterJobType: (jobType, show_days) => dispatch({ type: REDUX.JOB_RESULT.SET_FILTER_JOB_TYPE, jobType, show_days }),
})

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Result)
