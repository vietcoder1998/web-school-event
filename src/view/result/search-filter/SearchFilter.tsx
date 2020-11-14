import React from "react";
import { Select, Row, Col, Button } from "antd";
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
    };
  }
  componentDidMount() {
    let queryParam = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    });

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
  render() {
    let { regions, jobNames, loading, eventName, isAuthen } = this.props;
    let { jobType, regionID, isEvent, jobTitle } = this.state;
    // let [filter, setFilter] = React.useState({ regionID: null, jobNameID: null });
    // console.log(this.props.jobNames)

    return (
      <div className="filter-name-job">
        <Row>
          <Col xs={11} sm={12} md={5} lg={4} xl={4} xxl={5}>
            <Select
              size={"large"}
              showSearch
              onChange={(event: string) => {
                let newFilter = {
                  jobType: null,
                  regionID: this.state.regionID,
                  jobNameID: this.state.jobNameID,
                  isEvent: this.state.isEvent,
                };
                newFilter.jobType = event;
                // setFilter(newFilter);
                this.setState({ jobType: event });
                this.props.onChangeJobFilter(newFilter);
              }}
              style={{ width: "100%", margin: "5px 0px" }}
              placeholder={"Chọn loại công việc"}
              value={jobType ? jobType : undefined}
            >
              <Option key={"1"} value={null}>
                Tất cả
              </Option>
              <Option key={"2"} value={TYPE.FULLTIME}>
                Fulltime
              </Option>
              <Option key={"3"} value={TYPE.PARTTIME}>
                Parttime
              </Option>
              <Option key={"4"} value={TYPE.INTERNSHIP}>
                Internship
              </Option>
            </Select>
          </Col>
          <Col xs={2} sm={0} md={0} lg={0} xl={0} xxl={0} />
          <Col xs={11} sm={12} md={5} lg={4} xl={4} xxl={4}>
            <Select
              size={"large"}
              showSearch
              style={{ width: "100%", margin: "5px 0px" }}
              placeholder={"Chọn tỉnh thành"}
              value={regionID && regions.length > 0 ? regions.find(element => element.id === regionID).name : undefined}
            >
              <Option key={"1"} value={'Tất cả '}
                onClick={() => {
                  let newFilter = {
                    jobType: null,
                    regionID: this.state.regionID,
                    jobNameID: this.state.jobNameID,
                    isEvent: this.state.isEvent,
                  };
                  // let region =
                  //   regions && regions.filter((element) => item.id === element.id);
                  // let regionID = null;

                  // if (region && region.length > 0) {
                  //   regionID = region[0].id;
                  // }

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
                      key={index} 
                      id={item.id} 
                      value={item.name}
                      style={{fontWeight:"bold"}}
                      onClick={() => {
                        let newFilter = {
                          jobType: null,
                          regionID: this.state.regionID,
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
          </Col>
          <Col
            xs={24}
            sm={12}
            md={7}
            lg={isAuthen ? 8 : 12}
            xl={isAuthen ? 8 : 12}
            xxl={isAuthen ? 7 : 12}
          >
            <Select
              size={"large"}
              showSearch
              style={{ width: "100%", margin: "5px 0px" }}
              placeholder={"Chọn tên công việc"}
              onChange={(e) => {
                let newFilter = {
                  jobType: this.state.jobType,
                  regionID: this.state.regionID,
                  jobNameID: this.state.jobNameID,
                  isEvent: this.state.isEvent,
                  jobTitle: this.state.jobTitle
                };

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
                this.props.onChangeJobFilter(newFilter);
              }}
              onSearch={e => this.props.getJobNames(e)}
              defaultValue={localStorage.getItem("wls") && localStorage.getItem("wls")!=='null' ? localStorage.getItem("wls") : "Tất cả các công việc"}
            >
              <Option 
                key={"1"} 
                value={""} 
                style={{
                  fontWeight:"bold", 
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
                    style={{fontWeight:"bold"}}
                    children={jobTitle}
                  /> : null
              }
              {
                jobNames.length > 0
                ? jobNames.map(item =>
                  <Option
                    key={item.id}
                    value={item.name}
                    style={{fontWeight:"bold"}}
                    children={item.name}
                  />
                )
                : null}
            </Select>
          </Col>
          <Col
            xs={24}
            sm={12}
            md={6}
            lg={4}
            xl={4}
            xxl={4}
            style={{ display: isAuthen ? "" : "none" }}
          >
            <Select
              allowClear
              size={"large"}
              showSearch
              onChange={(event: string) => {
                let newFilter = {
                  jobType: this.state.jobType,
                  regionID: this.state.regionID,
                  jobNameID: this.state.jobNameID,
                  isEvent: this.state.isEvent,
                };
                newFilter.isEvent = event;
                this.setState({ isEvent: event });
                this.props.onChangeJobFilter(newFilter);
              }}
              style={{ width: "100%", margin: "5px 0px" }}
              placeholder={"Chọn nhóm"}
              value={isEvent ? eventName : "Bình thường"}
            >
              <Option key={"1"} value={false}>
                Tuyển dụng thường
              </Option>
              <Option key={"2"} value={true}>
                {eventName}
              </Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <Button
              size="large"
              type="danger"
              icon={loading ? "loading" : "search"}
              children={"Tìm"}
              style={{
                width: "100%",
                margin: "5px 0px",
                // backgroundColor: 'orange',
                backgroundColor: "#ff5658",
                borderColor: "#ff5658",
                color: "white",
              }}
              onClick={() => {
                // this.props.onChangeJobFilter(filter)
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
  JobNames: state.JobNames.items
});

const mapDispatchToProps = (dispatch) => ({
  getJobNames: (jobName) => dispatch({ type: REDUX_SAGA.JOB_NAMES.GET_JOB_NAMES, jobName })
});




export default connect(mapStateToProps, mapDispatchToProps)(SearchFilter);
