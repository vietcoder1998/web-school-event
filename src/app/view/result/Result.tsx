import React from 'react';
import './Result.scss'
import Layout from '../layout/Layout';
import { Row, Col, Pagination, BackTop } from 'antd';
import { connect } from 'react-redux';
import { moveScroll } from '../../../utils/moveScroll';
// @ts-ignore
import Cookie from 'universal-cookie';
import { REDUX_SAGA } from '../../../const/actions';
import ListResult from './list-result/ListResult';
import SearchMore from './search-more/SearchMore';
import ListHlJob from './list-hl-job/ListHlJob';
import { IJobSearchFilter } from '../../../models/job-search';
import SearchFilter from './search-filter/SearchFilter';
import ResultFilter from './result-filter/ResultFilter';

const cookie = new Cookie();

interface IPropsResult extends StateProps, DispatchProps {
    getJobResults: Function;
    getHighLightData: Function;
    match?: any;
    getListJobNames: (name?: string) => any;
    getListRegions: (name?: string) => any;
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
                    distance: null
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
        this._callLoading();
        this._callLastWord();

        if (window.performance) {
            if (performance.navigation.type === 1) {
                this.props.getJobResults(pageIndex, pageSize, body);
            }
        }
    }

    static getDerivedStateFromProps(nextProps?: IPropsResult, prevState?: IStateResult) {
        if (nextProps.match.param) {
            let { body } = prevState;
            nextProps.getJobResults(prevState.pageIndex, prevState.pageSize, body);
        }

        return null
    }

    _handleIndex = (pageIndex?: number, pageSize?: number) => {
        moveScroll(0, 0);
        localStorage.setItem('paging', JSON.stringify({ pageIndex: pageIndex - 1, pageSize }));
        this.props.getJobResults(pageIndex - 1, pageSize);
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
        let { body } = this.state;

        if (event.jobType) {
            body.jobType = event.jobType;
        }

        if (event.jobNameID !== null) {
            body.jobNameIDs = [event.jobNameID];
        }

        body.jobLocationFilter.regionID = event.regionID;

        await this.setState({ body });
        await this._callJob();
    }

    onChangeShiftsFilter = async (event?: any) => {
        let { body } = this.state;
        body.jobShiftFilter.weekDays = event.weekDays;
        body.jobShiftFilter.dayTimes = event.dayTimes;
        await this.setState({ body });
        await this._callJob();
    }

    render() {
        const { loading, region, body } = this.state;
        const { results, highlightData, jobNames, regions } = this.props;
        const list_result = results.items;

        return (
            <Layout>
                <div className='content'>
                    <Row>
                        <Col xs={0} sm={0} md={0} lg={0} xl={0} xxl={2}></Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={20}>
                            <div className='search-result'>
                                {/* SearChTab */}
                                <div className='search-tab'>
                                    <SearchFilter
                                        loading={loading}
                                        jobNames={jobNames}
                                        jobType={body.jobType}
                                        regions={regions}
                                        onChangeJobFilter={this.onChangeJobFilter}
                                    />
                                </div>
                                {/* Search Result */}
                                <Row>
                                    <ListHlJob highlightData={highlightData} getHighLightJobs={(pageIndex) => { this.props.getHighLightData(pageIndex, 6) }} />
                                </Row>
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
    highlightData: state.HighLightResult,
    isAuthen: state.isAuthen,
    jobNames: state.JobNames.items,
    regions: state.Regions.items,
    isMobile: state.MobileState.isMobile
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
})

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Result)
