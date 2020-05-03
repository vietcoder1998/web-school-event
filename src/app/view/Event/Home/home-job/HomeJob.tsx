import React, { PureComponent } from "react";
import { Col, Row, Skeleton, Pagination } from "antd";
import "./HomeJob.scss";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
//@ts-ignore
import DefaultImage from "../../../../../assets/image/carouselGroup/carousel2.jpg";
import { REDUX_SAGA } from "../.././../../../const/actions";
import { JobType } from "../../../layout/common/Common";

interface IProps {
  getEvenJob?: Function;
  getInDay?: Function;
  normalJob?: any;
  indayJob?: any;
  setLoadinggetEvenJob?: Function;
  loading_hot_job?: any;
}

class HomeJob extends PureComponent<IProps> {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      title: "VIỆC LÀM NHÓM NGÀNH",
    };
  }
  componentDidMount = async () => {
    await this.props.getEvenJob(0);
  };

  changePage = (event?: number) => {
    this.props.getEvenJob(event - 1);
    this.setState({
      current: event,
    });
  };
  render() {
    let { normalJob, loading_hot_job } = this.props;
    let title = localStorage.getItem("branch_name");
    return (
      <Row
        className="home-job"
        style={{ display: normalJob.totalItems === 0 ? "none" : "" }}
        id="normal_job"
      >
        <h5 style={{ textAlign: "center", textTransform: "uppercase", fontSize: '1.75rem' }}>
          {title}
        </h5>
        {normalJob && normalJob.items
          ? normalJob.items.map((item, index) => {
              let logoUrl = item.employerLogoUrl;

              if (!logoUrl) {
                logoUrl = DefaultImage;
              }

              return (
                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={6} key={index}>
                  {loading_hot_job ? (
                    <Skeleton
                      key={index}
                      loading={true}
                      avatar
                      paragraph={{ rows: 1 }}
                      active={true}
                    />
                  ) : (
                    <div key={index} className="h-j-item">
                      <div className="img-job">
                        <img
                          src={logoUrl}
                          alt="ảnh công ty"
                          height="130px"
                          width="100px"
                          style={{ borderRadius: 7 }}
                        />
                      </div>
                      <div className="job-content">
                        <ul>
                          <li className="j-d">
                            <Link
                              to={`/event-job-detail/${window.btoa(item.id)}`}
                              target="_blank"
                            >
                              <h6
                                className="l_c"
                                style={{
                                  color: item.titleHighlight ? "red" : "black",
                                }}
                              >
                                {item.jobTitle}
                              </h6>
                            </Link>
                          </li>
                          <li className="l_c">
                            <Link
                              to={`/employer/${window.btoa(item.employerID)}`}
                              target="_blank"
                              className="name_employer"
                            >
                              {item.employerName}
                            </Link>
                          </li>
                          <li
                            className="time-left"
                            style={{ paddingTop: 0, fontWeight: 550 }}
                          >
                            {item.region && item.region.name
                              ? item.region.name
                              : null}
                          </li>
                          <li>
                            <JobType>{item.jobType}</JobType>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}{" "}
                </Col>
              );
            })
          : null}
        <Col span={24} style={{ textAlign: "center" }}>
          <Pagination
            current={this.state.current}
            pageSize={normalJob.pageSize}
            total={normalJob.totalItems}
            style={{ margin: "25px 0px 10px" }}
            onChange={this.changePage}
          />
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  normalJob: state.EventJobResults.data,
});

const mapDispatchToProps = (dispatch) => ({
  getEvenJob: (pageIndex?: number, pageSize?: number) =>
    dispatch({ type: REDUX_SAGA.EVENT.JOB.NORMAL, pageIndex, pageSize }),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeJob);
