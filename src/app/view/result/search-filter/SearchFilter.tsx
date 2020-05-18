import React from "react";
import { Select, Row, Col, Button, Icon } from "antd";
import { TYPE } from "../../../../const/type";
import { connect } from "react-redux";
import qs from "query-string";

const { Option } = Select;

interface ISearchFilterProps {
  regions?: Array<any>;
  jobNames?: Array<any>;
  jobType?: string;
  loading?: boolean;
  onChangeJobFilter?: (event?: any) => any;
  area?: any;
  job_dto?: any;
  location?: any;
  setFilter?: boolean;
  eventName?: string;
  isAuthen?: boolean;
}
interface IStateSearchFilter {
  jobType?: any;
  regionID?: any;
  jobNameID?: any;
  isEvent?: any;
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
      isEvent: true,
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
      if (this.props.job_dto && this.props.job_dto.name) {
        this.setState({ jobNameID: this.props.job_dto.id });
      }
      if (this.props.area && this.props.area.id) {
        this.setState({ regionID: this.props.area.id });
      }
    } else {
      if (queryParam.jobNameID) {
        this.setState({ jobNameID: Number(queryParam.jobNameID) });
      } else {
        this.setState({ jobNameID: this.props.job_dto.id });
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
    }
  }
  render() {
    let { regions, jobNames, loading, eventName, isAuthen } = this.props;
    let { jobType, jobNameID, regionID, isEvent } = this.state;
    // let [filter, setFilter] = React.useState({ regionID: null, jobNameID: null });

    return (
      <div className="filter-name-job" style={{ padding: "10px 2%" }}>
        <Row>
          <Col xs={24} sm={24} md={12} lg={4} xl={4} xxl={4}>
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
              placeholder={"Tất cả loại công việc (FullTime, Part-Time"}
              value={jobType ? jobType : undefined}
            >
              <Option key={"1"} value={null}>
                Tất cả loại công việc (FullTime, Part-Time
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
          <Col xs={24} sm={24} md={12} lg={4} xl={4} xxl={4}>
            <Select
              allowClear
              size={"large"}
              showSearch
              onChange={(event: string) => {
                let newFilter = {
                  jobType: null,
                  regionID: this.state.regionID,
                  jobNameID: this.state.jobNameID,
                  isEvent: this.state.isEvent,
                };
                let region =
                  regions && regions.filter((item) => event === item.id);
                let regionID = null;

                if (region && region.length > 0) {
                  regionID = region[0].id;
                }

                newFilter.regionID = regionID;
                // setFilter(newFilter);
                this.setState({ regionID });

                this.props.onChangeJobFilter(newFilter);
              }}
              style={{ width: "100%", margin: "5px 0px" }}
              placeholder={"Tất cả các tỉnh thành"}
              value={regionID ? regionID : undefined}
            >
              <Option key={"1"} value={null}>
                Tất cả các tỉnh thành
              </Option>
              {regions.length > 0
                ? regions.map((item, index) => {
                    return (
                      <Option key={index} value={item.id}>
                        {item.name}
                      </Option>
                    );
                  })
                : null}
            </Select>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={isAuthen ? 6 : 12}
            xl={isAuthen ? 6 : 12}
            xxl={isAuthen ? 6 : 12}
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
                newFilter.jobNameID = event;
                this.setState({ jobNameID: event });
                this.props.onChangeJobFilter(newFilter);
              }}
              style={{ width: "100%", margin: "5px 0px" }}
              placeholder={"Tất cả các công việc"}
              value={jobNameID ? jobNameID : undefined}
            >
              <Option key={"1"} value={null}>
                Tất cả các công việc
              </Option>
              {jobNames.length > 0
                ? jobNames.map((item, index) => {
                    return (
                      <Option key={index} value={item.id}>
                        {item.name}
                      </Option>
                    );
                  })
                : null}
            </Select>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={6}
            xl={6}
            xxl={6}
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
              <Option key={"1"} value={true}>
                {eventName}
              </Option>
              <Option key={"2"} value={false}>
                Tuyển dụng thường
              </Option>
            </Select>
          </Col>
          <Col xs={24} sm={24} md={12} lg={4} xl={4} xxl={4}>
            <Button
              size="large"
              type="danger"
              children={loading ? <Icon type="loading" /> : "Tìm kiếm"}
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
  job_dto: state.JobResult.filter.job_dto,
  setFilter: state.JobResult.setFilter,
  eventName: state.EventStatusReducer.name,
});

export default connect(mapStateToProps)(SearchFilter);
