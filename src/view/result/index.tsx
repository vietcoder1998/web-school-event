import React from "react";
import Layout from "../layout/Layout";
import { Row, Col, Pagination, Affix } from "antd";
import { connect } from "react-redux";
import { moveScroll } from "../../utils/moveScroll";
// @ts-ignore
import Cookie from "universal-cookie";
import { REDUX_SAGA, REDUX } from "../../const/actions";
import ListResult from "./list-result/ListResult";
import SearchMore from "./search-more/SearchMore";
import ListHlJob from "./list-hl-job/ListHlJob";
import { IJobSearchFilter } from "../../models/job-search";
import SearchFilter from "./search-filter/SearchFilter";
import ResultFilter from "./result-filter/ResultFilter";
import qs from "query-string";
//@ts-ignore
import banner from '../../assets/image/event/banner-worksvn.jpg'
import { LazyLoadImage } from 'react-lazy-load-image-component';
const cookie = new Cookie();

interface IProps extends StateProps, DispatchProps {
  getJobResults: Function;
  getEventJobResults: Function;
  getHighLightData: Function;
  match?: any;
  getListJobNames: (name?: string) => any;
  getListRegions: (name?: string) => any;
  loadingHlData?: any;
  loading?: boolean;
  jobType?: any;
  area?: any;
  location?: any;
  setFilterJobType?: any;
  history?: any;
  results?: any;
}

interface IStateResult {
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
  isSearchEvent?: boolean;
  param?: string
}

class Result extends React.Component<IProps, IStateResult> {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      search_word: "",
      jobNameID: null,
      dataSource: [],
      pageIndex: 0,
      pageIndexHighLight: -1,
      pageSize: 15,
      show_job: false,
      region: JSON.parse(localStorage.getItem("region")),
      job: JSON.parse(localStorage.getItem("job")),
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
        },
        branchIDs: []
        // schoolConnected: null,
      },

      isSearchEvent: true, // phân biệt job-event và job-normal ở 2 trang khác nhau. Đưa vào cả list job, chỗ nào cần search normal thì thêm cả cái này
    };
  }

  componentDidMount() {
    let { search_word, body, pageIndex, pageSize } = this.state;
    let { regions, jobNames } = this.props;

    if (regions.length === 0) {
      this.props.getListRegions(); // lấy list vùng
    }
    if (jobNames.length === 0) {
      this.props.getListJobNames(search_word); // lấy list jobs name
    }

    this.props.getHighLightData(0); // job ở bên trên
    // this._callLoading();
    this._callLastWord();
    let queryParam = qs.parse(this.props.location.search);
    let jobType, jobNameID, regionID;
    let newWeekDays = [];
    let newDayTimes = [];
    if (this.props.setFilter) {
      // console.log(this.props.jobType)
      if (this.props.jobType) {
        jobType = this.props.jobType;
      }
      if (this.props.jobName && this.props.jobName.name) {
        jobNameID = this.props.jobName.id;
      }
      if (this.props.area && this.props.area.id) {
        regionID = this.props.area.id;
      }
      Object.keys(this.props.list_day).forEach((key) => {
        if (this.props.list_day[key] === true) {
          newWeekDays.push(key);
        }
      });
      Object.keys(this.props.list_shift).forEach((key) => {
        if (this.props.list_shift[key] === true) {
          newDayTimes.push(key);
        }
      });
    } else {
      // console.log(queryParam.jobNameID)
      if (queryParam.jobNameID) {
        jobNameID = Number(queryParam.jobNameID);
      } else {
        jobNameID = this.props.jobName.id;
      }
      if (queryParam.regionID) {
        regionID = Number(queryParam.regionID);
      } else {
        if (this.props.area && this.props.area.id) {
          regionID = this.props.area.id;
        } else {
          regionID = null;
        }
      }
      if (queryParam.jobType) {
        jobType = queryParam.jobType;
      } else {
        jobType = this.props.jobType;
      }
      Object.keys(this.props.list_day).forEach((key) => {
        if (queryParam[key] === "true") {
          newWeekDays.push(key);
        }
      });
      Object.keys(this.props.list_shift).forEach((key) => {
        if (queryParam[key] === "true") {
          newDayTimes.push(key);
        }
      });
    }
    if (!this.props.isAuthen) {
      this.setState({ isSearchEvent: false })
    }
    this.setState(
      {
        body: {
          ...body,
          jobType: jobType,
          jobNameIDs: jobNameID ? [jobNameID] : null,
          jobLocationFilter: {
            ...body.jobLocationFilter,
            regionID: regionID ? regionID : null,
          },
          jobShiftFilter: {
            ...body.jobShiftFilter,
            weekDays: newWeekDays.length > 0 ? newWeekDays : null,
            dayTimes: newDayTimes.length > 0 ? newDayTimes : null,
          },
        },
        region: this.props.area,
      },
      () => {
        if (!this.props.setFilter) {
          if (this.state.isSearchEvent && this.props.isAuthen) {
            // console.log('SearchEvent')
            this.props.getEventJobResults(pageIndex, pageSize, this.state.body);
          } else {
            // console.log('no SearchEvent')
            this.props.getJobResults(pageIndex, pageSize, this.state.body);
          }
        }
      }
    );
  }

  static getDerivedStateFromProps(
    nextProps?: IProps,
    prevState?: IStateResult
  ) {
    if (nextProps.match.param) {
      let { body } = prevState;
      if (prevState.isSearchEvent) {
        nextProps.getEventJobResults(
          prevState.pageIndex,
          prevState.pageSize,
          body
        );
      } else {
        nextProps.getJobResults(prevState.pageIndex, prevState.pageSize, body);
      }
    }

    return null;
  }

  _handleIndex = (pageIndex?: number, pageSize?: number) => {
    let body = this.state.body;
    // console.log(this.props.jobType);
    if (this.props.jobType === 'FULLTIME' || this.props.jobType === 'INTERSHIP') {
      body.jobShiftFilter = {
        weekDays: null,
        dayTimes: null
      }
    }

    moveScroll(0, 0);
    localStorage.setItem(
      "paging",
      JSON.stringify({ pageIndex: pageIndex - 1, pageSize })
    );
    if (this.state.isSearchEvent) {
      this.props.getEventJobResults(pageIndex - 1, pageSize, body);
    } else {
      this.props.getJobResults(pageIndex - 1, pageSize, body);
    }
    this.setState({ pageIndex: pageIndex - 1, pageSize });
    this._callLoading();
  };

  _callLastWord = () => {
    let { list_last_word } = this.state;
    let part = cookie.get("list_last_word");
    if (part) {
      list_last_word = part;
    }
    this.setState({ list_last_word });
  };

  _callLoading = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 250);
  };

  _callJob = async () => {
    let { body, list_last_word, pageIndex, pageSize } = this.state;
    cookie.set("list_last_word", list_last_word, { path: "/result" });

    if (this.state.isSearchEvent) {
      this.props.getEventJobResults(pageIndex, pageSize);
    } else {
      this.props.getJobResults(pageIndex, pageSize);
    }

    this._callLoading();
  };

  onChangeJobFilter = async (event?: any) => {
    console.log(event)
    let queryParam = qs.parse(this.props.location.search);
    let { body, isSearchEvent } = this.state;
    
    if(event && event.isEvent) {
      isSearchEvent = event.isEvent;
    }

    if (event.jobType !== "PARTTIME") {
      body.jobShiftFilter = {
        gender: null,
        weekDays: null,
        dayTimes: null,
      };
    }

    if (
      event.jobNameID !== null &&
      event.jobNameID !== undefined &&
      event.jobNameID !== "" &&
      event.jobNameID !== 0
    ) {
      body.jobNameIDs = [event.jobNameID];
    }

    if (
      event.branchIDs !== null &&
      event.branchIDs !== undefined &&
      event.branchIDs !== 0
    ) {
      body.branchIDs = [event.branchIDs];
    } else {
      body.branchIDs = [];
    }


    queryParam.regionID = event.regionID;
    queryParam.branchIDs = event.branchIDs;
    queryParam.jobNameID = event.jobNameID;
    queryParam.jobType = event.jobType;
    
    this.setState({body})

    this.props.history.replace("?" + qs.stringify(queryParam));
    await this.setState({ body, pageIndex: 0, isSearchEvent });
    await this._callJob();
  };

  onChangeShiftsFilter = async (event?: any) => {
    let { body } = this.state;
    let queryParam = qs.parse(this.props.location.search, {
      // ignoreQueryPrefix: true,
    });
    body.jobShiftFilter.weekDays = event.weekDays;
    body.jobShiftFilter.dayTimes = event.dayTimes;
    Object.keys(this.props.list_day).forEach((key) => {
      if (event.weekDays.includes(key)) {
        // queryParam[key] = true;
      } else {
        // queryParam[key] = false;
      }
    });
    Object.keys(this.props.list_shift).forEach((key) => {
      if (event.dayTimes.includes(key)) {
        // queryParam[key] = true;
      } else {
        // queryParam[key] = false;
      }
    });
    this.props.history.replace("?" + qs.stringify(queryParam));
    await this.setState({ body });
    await this._callJob();
  };

  render() {
    const { region, body, isSearchEvent } = this.state;
    const {
      results,
      highlightData,
      jobNames,
      regions,
      loadingHlData,
      loading,
      param,
      history,

    } = this.props;
    const listResult = results.items;
    return (
      <Layout>
          <Affix offsetTop={0}>
            <div className="search-tab">
                <SearchFilter
                    loading={loading}
                    jobNames={jobNames}
                    regions={regions}
                    jobNameID={body.jobNameIDs && body.jobNameIDs.length >0 ? body.jobNameIDs[0]:null}
                    jobType={body.jobType}
                    onChangeJobFilter={this.onChangeJobFilter}
                    location={this.props.location}
                  />
            </div>
          </Affix>
          <Row className="content">
            <Col xs={0} sm={0} md={0} lg={0} xl={0} xxl={2}></Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
             
              <div className="search-result">
                {/* Search Result */}
                <Row>
                  <ListHlJob
                    history={history}
                    loadingHlData={loadingHlData}
                    highlightData={highlightData}
                    //@ts-ignore
                    isSearchEvent={isSearchEvent}
                    getHighLightJobs={(pageIndex) => {
                      this.props.getHighLightData(pageIndex, 6);
                    }}
                    param={param}
                  />
                </Row>
                {/* SearChTab */}

                <ResultFilter
                  branchIDs={ body.branchIDs && body.branchIDs.length > 0 ?body.branchIDs[0]:null}
                  numberRs={results.totalItems}
                  regionName={region && region.name}
                  totalJobs={region && region.totalJobs}
                  onChangeJobFilter={this.onChangeJobFilter}
                />
                <Row>
                  <Col xs={24} sm={24} md={16} lg={16} xl={17} xxl={19}>
                    <ListResult
                      loading={loading}
                      listResult={listResult}
                      isSearchEvent={isSearchEvent}
                      param={param}
                    />
                    {/* Paginition */}
                    <div style={{ paddingTop: 10, textAlign: 'center' }}>
                      <Pagination
                        defaultCurrent={1}
                        pageSize={results.pageSize}
                        total={results.totalItems}
                        onChange={this._handleIndex}
                        current={this.state.pageIndex + 1}
                        onShowSizeChange={(current?: number, size?: number) =>
                          this._handleIndex(current, size)
                        }
                      />
                    </div>
                  </Col>
                  <Col xs={0} sm={0} md={8} lg={8} xl={7} xxl={5}>
                    <SearchMore
                      loading={loading}
                      onChangeShiftsFilter={this.onChangeShiftsFilter}
                      jobType={body.jobType}
                      location={this.props.location}
                    />
                    <LazyLoadImage style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.03), 0 6px 20px 0 rgba(0, 0, 0, 0.03)', marginLeft: 11, width: 'calc(100% - 12px)' }} alt="banner" src={banner} />
                  </Col>
                </Row>
                {/* {Job} */}
              </div>
            </Col>
            <Col xs={0} sm={0} md={0} lg={0} xl={0} xxl={2}></Col>
          </Row>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  results: state.JobResult.result,
  loading: state.JobResult.loading,
  highlightData: state.HighLightResult.data,
  loadingHlData: state.HighLightResult.loadingHlData,
  isAuthen: state.isAuthen,
  jobNames: state.JobNames.items,
  regions: state.Regions.items,
  isMobile: state.MobileState.isMobile,
  jobType: state.JobResult.filter.jobType,
  area: state.JobResult.filter.area,
  setFilter: state.JobResult.setFilter,
  jobName: state.JobResult.filter.jobName,
  list_day: state.JobResult.filter.list_day,
  list_shift: state.JobResult.filter.list_shift,
  param: state.DetailEvent.param
});

const mapDispatchToProps = (dispatch) => ({
  getJobResults: (
    pageIndex?: number,
    pageSize?: number,
    body?: IJobSearchFilter
  ) =>
    dispatch({
      type: REDUX_SAGA.JOB_RESULT.GET_JOB_RESULT,
      pageIndex,
      pageSize,
      body,
    }),
  getEventJobResults: (
    pageIndex?: number,
    pageSize?: number,
    body?: IJobSearchFilter
  ) =>
    dispatch({
      type: REDUX_SAGA.EVENT.JOB.SEARCH,
      pageIndex,
      pageSize,
      body,
    }),
  getHighLightData: (pageIndex?: number, pageSize?: number) =>
    dispatch({
      type: REDUX_SAGA.HIGH_LIGHT.GET_HIGH_LIGHT_DATA,
      pageIndex,
      pageSize,
    }),
  getListJobNames: (name?: string) =>
    dispatch({
      type: REDUX_SAGA.JOB_NAMES.GET_JOB_NAMES,
      name,
    }),
  getListRegions: (name?: string) =>
    dispatch({
      type: REDUX_SAGA.REGIONS.GET_REGIONS,
      name,
    }),
  setFilterJobType: (jobType, show_days) =>
    dispatch({
      type: REDUX.JOB_RESULT.SET_FILTER_JOB_TYPE,
      jobType,
      show_days,
    }),
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Result);
