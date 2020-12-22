import React from "react";
import { Select, Row, Col, Button, Drawer, Icon } from "antd";
import { TYPE } from "../../../const/type";
import { connect } from "react-redux";
import qs from "query-string";
import { REDUX_SAGA } from '../../../const/actions';

const { Option } = Select;

interface ISearchFilterProps {
  regions?: Array<any>;
  jobNames?: Array<any>;
  jobType?: string;
  loading?: boolean;
  onChangeJobFilter?: (event?: any) => any;
  area?: any;
  jobName?: any;
  location?: any;
  setFilter?: boolean;
  eventName?: string;
  isAuthen?: boolean;
  primaryColor?: string;
  getJobNames?: Function;
}
interface IStateSearchFilter {
  jobType?: any;
  regionID?: any;
  jobNameID?: any;
  isEvent?: any;
  jobTitle?: any;
  openFilter?: boolean;
}
class SearchFilter extends React.Component<
  ISearchFilterProps,
  IStateSearchFilter
  > {
  constructor(props) {
    super(props);
    this.state = {
      jobType: null,
      regionID: null,
      jobNameID: null,
      isEvent: false,
      jobTitle: null,
      openFilter: false
    };
  }
  componentDidMount() {
    let queryParam = qs.parse(this.props.location.search);

    if (this.props.setFilter) {
      if (this.props.jobType) {
        this.setState({ jobType: this.props.jobType });
      }
      if (this.props.jobName && this.props.jobName.name) {
        this.setState({ jobNameID: this.props.jobName.id });
      }
      if (this.props.area && this.props.area.id) {
        this.setState({ regionID: this.props.area.id });
      }
    } else {
      if (queryParam.jobNameID) {
        this.setState({ jobNameID: Number(queryParam.jobNameID) });
      } else {
        this.setState({ jobNameID: this.props.jobName.id });
      }
      if (queryParam.regionID) {
        this.setState({ regionID: Number(queryParam.regionID) });
      } else {
        if (this.props.area && this.props.area.id) {
          this.setState({ regionID: this.props.area.id });
        }
      }
      if (queryParam.jobType) {
        this.setState({ jobType: queryParam.jobType });
      } else {
        this.setState({ jobType: this.props.jobType });
      }
      if (queryParam.jobTitle) {
        this.setState({ jobTitle: queryParam.jobTitle });
      } else {
        this.setState({ jobTitle: this.props.jobTitle });
      }
    }
  }

  areaFilterOption = () => {
    let { regionID, isEvent} = this.state
    let { regions } = this.props
    return (
      <Select
        size={"large"}
        showSearch
        style={{ width: "100%", margin: "5px 0px" }}
        placeholder={"Chọn tỉnh thành"}
        onSelect={()=> setTimeout(() => {
          this.setState({openFilter: false})
        }, 500) }
        value={regionID && regions && regions.length > 0 ? regions.find(element => element.id === regionID).name : "Toàn quốc"}
      >
        <Option key={"1"} value={'Tất cả '}
          style={{color: "red", fontWeight: 500, fontStyle: "italic"}}
          onClick={() => {
            let newFilter = {
              jobType:null,
              regionID: null,
              isEvent,
            };

            newFilter.regionID = null;
            // setFilter(newFilter);
            this.setState({ regionID: null });
            this.props.onChangeJobFilter(newFilter);
          }}
        >
          Tất cả
              </Option>
        {regions.length > 0
          ? regions.map((item, index) => {
            return (
              <Option
                key={item.id}
                value={item.name}
                style={{ fontWeight: "bold" }}
                onClick={() => {
                  let newFilter = {
                    regionID: null,
                    jobNameID: this.state.jobNameID,
                    isEvent: this.state.isEvent,
                  };
                  let region =
                    regions && regions.filter((element) => item.id === element.id);
                  let regionID = null;

                  if (region && region.length > 0) {
                    regionID = region[0].id;
                  }

                  newFilter.regionID = regionID;
                  // setFilter(newFilter);
                  this.setState({ regionID });

                  this.props.onChangeJobFilter(newFilter);
                }}
              >
                {item.name}
              </Option>
            );
          })
          : null}
      </Select>
    )
  }

  jobTypeFilterOption = () => {
    let { jobNameID, isEvent, jobType, regionID} = this.state
    return (
      <Select
        size={"large"}
        showSearch
        onChange={(event: string) => {
          // console.log(event)
          let newFilter = {
            jobType,
            regionID,
            jobNameID,
            isEvent,
          };
          newFilter.jobType = event;
          this.setState({ jobType: event });
          this.props.onChangeJobFilter(newFilter);
        }}
        onSelect={()=> setTimeout(() => {
          this.setState({openFilter: false})
        }, 500) }
        style={{ width: "100%", margin: "5px 0px" }}
        placeholder={"Chọn loại công việc"}
        value={jobType ? jobType : "Tất cả loại việc"}
      >
        <Option key={TYPE.ALL} value={null} style={{color: "red", fontWeight: 500, fontStyle: "italic"}}>
          Tất cả
        </Option>
        <Option key={TYPE.FULLTIME} value={TYPE.FULLTIME}>
          Fulltime
        </Option>
        <Option key={TYPE.PARTTIME} value={TYPE.PARTTIME}>
          Parttime
        </Option>
        <Option key={TYPE.INTERNSHIP} value={TYPE.INTERNSHIP}>
          Thực tập
        </Option>
      </Select>
    )
  }

  render() {
    let {jobNames, loading, isMobile } = this.props;
    let {jobTitle, openFilter } = this.state;
    // let [filter, setFilter] = React.useState({ regionID: null, jobNameID: null });
    // console.log(this.props)

    return (
      <div className="filter-name-job">
        <Drawer
          className="show-only-phone"
          visible={openFilter}
          onClose={() => this.setState({ openFilter: !openFilter })}
          title="Bộ lọc công việc"
        >
          {this.areaFilterOption()}
          {this.jobTypeFilterOption()}
        </Drawer>
        <Row>
          <Col xs={5} sm={0} md={0} lg={0} xl={0} xxl={0}>
            <Button
            className={"show-only-phone"}
              style={{ margin: 5, height: 38 }}
              onClick={() => this.setState({ openFilter: true })}
            >
              <Icon type="filter" />
              <label>Lọc</label>
            </Button>
          </Col>
          <Col xs={0} sm={12} md={5} lg={4} xl={4} xxl={4}>
            {this.jobTypeFilterOption()}
          </Col>
          <Col xs={1} sm={0} md={0} lg={0} xl={0} xxl={0} />
          <Col xs={0} sm={12} md={5} lg={4} xl={4} xxl={4}>
            {this.areaFilterOption()}
          </Col>
          <Col
            xs={13}
            sm={12}
            md={7}
            lg={12}
            xl={12}
            xxl={12}
          >
            <Select
              size={"large"}
              showSearch
              style={{ width: "100%", margin: "5px 0px" }}
              placeholder={"Chọn tên công việc"}
              onChange={(e) => {
                console.log(e)
                let newFilter = {
                  jobType: this.state.jobType,
                  regionID: this.state.regionID,
                  jobNameID: this.state.jobNameID,
                  isEvent: this.state.isEvent,
                  jobTitle: this.state.jobTitle
                };

                if (e && e!=="" ){
                   if (jobNames && jobNames.length > 0) {
                  let jobName = jobNames.find(element => element.name === e);
                  if (jobName && jobName.id) {
                    newFilter.jobNameID = jobName.id;
                    this.setState({ jobNameID: jobName.id });
                  } else {
                    newFilter.jobTitle = e;
                    this.setState({ jobTitle: e });
                  }
                } else {
                  newFilter.jobTitle = e;
                  this.setState({ jobTitle: e });
                }
                } else {
                  newFilter.jobNameID = null
                }

                this.props.onChangeJobFilter(newFilter);
              }}
              onSearch={e => this.props.getJobNames(e)}
              defaultValue={localStorage.getItem("wls") && localStorage.getItem("wls") !== 'null' ? localStorage.getItem("wls") : "Tất cả các công việc"}
            >
              <Option
                key={"1"}
                value={""}
                style={{
                  fontWeight: "bold",
                  color: "red",
                  fontStyle: "italic"
                }}
                children="Tất cả các công việc"
              />
              {
                jobTitle ?
                  <Option
                    key={"1"}
                    value={jobTitle}
                    style={{ fontWeight: "bold" }}
                    children={jobTitle}
                  /> : null
              }
              {
                jobNames.length > 0
                  ? jobNames.map(item =>
                    <Option
                      key={item.id}
                      value={item.name}
                      style={{ fontWeight: "bold" }}
                      children={item.name}
                    />
                  )
                  : null}
            </Select>
          </Col>
          <Col xs={1} sm={0} md={0} lg={0} xl={0} xxl={0}/>
          <Col xs={3} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <Button
              size="large"
              type="danger"
              icon={loading ? "loading" : "search"}
              children={!isMobile?"Tìm ngay": null}
              style={{
                width: "100%",
                margin: "5px 0px",
                height: 38,
                // backgroundColor: 'orange',
                backgroundColor: "#ff5658",
                borderColor: "#ff5658",
                color: "white",
              }}
              onClick={() => {
                this.props.onChangeJobFilter()
              }}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthen: state.AuthState.isAuthen,
  jobType: state.JobResult.filter.jobType,
  area: state.JobResult.filter.area,
  jobName: state.JobResult.filter.jobName,
  setFilter: state.JobResult.setFilter,
  eventName: state.EventStatusReducer.name,
  primaryColor: state.DetailEvent.primaryColor,
  JobNames: state.JobNames.items,
  isMobile: state.MobileState.isMobile
});

const mapDispatchToProps = (dispatch) => ({
  getJobNames: (jobName) => dispatch({ type: REDUX_SAGA.JOB_NAMES.GET_JOB_NAMES, jobName })
});




export default connect(mapStateToProps, mapDispatchToProps)(SearchFilter);
