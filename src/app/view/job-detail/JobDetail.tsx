import React, { Component } from "react";
import "./JobDetail.scss";
import { Tabs, Row, Col, Icon, Button, Modal, Checkbox, Avatar } from "antd";
import { connect } from "react-redux";
import { _requestToServer } from "../../../services/exec";
import { POST } from "../../../const/method";
import { APPLY_JOB, SAVED_JOB } from "../../../services/api/private.api";
import { STUDENT_HOST } from "../../../environment/development";
import { authHeaders } from "../../../services/auth";
//@ts-ignore
import _ from "lodash";
import { moveScroll } from "../../../utils/moveScroll";
import { testImage } from "../../../utils/CheckImage";
import { Input } from "antd";
import Layout from "./../layout/Layout";
import { NotUpdate, JobType } from "./../layout/common/Common";
import { REDUX_SAGA } from "../../../const/actions";
import JobProperties from "./job-properties/JobProperties";
import EmployerDetail from "./employer-detail/EmployerDetail";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { TYPE } from "../../../const/type";

const { TabPane } = Tabs;
const { TextArea } = Input;

interface IJobDetailState {
  is_loading?: boolean;
  visible?: boolean;
  confirmLoading?: boolean;
  message?: string;
  genderRequired: Array<any>;
  shiftIDs?: Array<string | number>;
  list_shiftIDs?: Array<any>;
  check_box_state?: Array<any>;
  jobState?: string;
  is_loading_more?: boolean;
  isSaved?: boolean;
  jobID?: string;
  employerID?: string;
}

// @ts-ignore
interface IJobDetailProps extends StateProps, DispatchProps {
  match?: any;
  getEmployerMoreJob?: (
    pageIndex?: number,
    pageSize?: number,
    id?: string
  ) => any;
  getJobDetail?: (jobID?: string) => any;
  getEmployerDetail?: (id?: string) => any;
  getSimilarJob?: (pageIndex?: number, pageSize?: number) => any;
}

export const _checkGender = (data) => {
  if (data.gender) {
    switch (data.gender) {
      case "BOTH":
        return (
          <div>
            <p>
              <label style={{ marginBottom: 0, marginRight: 3 }}>
                <Icon type="man" style={{ color: "rgb(21, 148, 255)" }} />
                Nam &{" "}
              </label>
              <label style={{ marginBottom: 0, marginRight: 5 }}>
                <Icon type="woman" style={{ color: "#ff395c" }} />
                Nữ{" "}
              </label>
            </p>
            <p>
              Số lượt đã ứng tuyển: {data.applied}/{data.quantity}
            </p>
            {/* <p>Số lượng nhận: {data.quantity}</p> */}
          </div>
        );
      case "MALE":
        return (
          <div>
            <p>
              <label style={{ marginBottom: 0 }}>
                <Icon type="man" style={{ color: "#168ECD" }} />
              </label>{" "}
              Nam -
              <label style={{ marginLeft: 5, marginBottom: 0 }}>
                Số lượt đã ứng tuyển: {data.applied}/{data.quantity}
              </label>
            </p>

            {/* <p>Số lượng nhận: {data.quantity}</p> */}
          </div>
        );
      case "FEMALE":
        return (
          <div>
            <p>
              <label style={{ marginBottom: 0 }}>
                <Icon type="woman" style={{ color: "#ff395c" }} />
              </label>{" "}
              Nữ -
              <label style={{ marginLeft: 5, marginBottom: 0 }}>
                Số lượt đã ứng tuyển: {data.applied}/{data.quantity}
              </label>
            </p>
          </div>
        );
      default:
        return <NotUpdate />;
    }
  }
};

class JobDetail extends Component<IJobDetailProps, IJobDetailState> {
  constructor(props) {
    super(props);
    this.state = {
      is_loading: true,
      visible: false,
      confirmLoading: false,
      message: "",
      genderRequired: [],
      shiftIDs: [],
      list_shiftIDs: [],
      check_box_state: [],
      jobState: "PENDING",
      is_loading_more: false,
      isSaved: true,
      jobID: null,
      employerID: null,
    };
  }

  show_btn = false;
  l_e = [];
  l_s = [];
  componentDidMount() {
    this.setState({ is_loading: false });
    this._loadData();
    this._loadState();
    moveScroll(0, 0);
    this.props.getSimilarJob(0, 6);
  }

  static getDerivedStateFromProps(
    nextProps?: IJobDetailProps,
    prevState?: IJobDetailState
  ) {
    if (
      nextProps.jobDetail.employerID &&
      nextProps.jobDetail.employerID !== prevState.employerID
    ) {
      nextProps.getEmployerDetail(nextProps.jobDetail.employerID);
      nextProps.getEmployerMoreJob(0, 6, nextProps.jobDetail.employerID);
      return {
        employerID: nextProps.jobDetail.employerID,
      };
    }

    return null;
  }

  _loadData = () => {
    let { jobDetail } = this.props;
    this.props.getJobDetail(window.atob(this.props.match.params.id));
    this.setState({ isSaved: jobDetail.isSaved });
  };

  _getMoreJob = (pageIndex?: number) => {
    this.setState({ is_loading_more: true }, () => {
      this.props.getEmployerMoreJob(pageIndex - 1);
    });

    setTimeout(() => {
      this.setState({ is_loading_more: false });
    }, 500);
  };
  _getSimilarJob = (pageIndex?: number) => {
    this.props.getSimilarJob(pageIndex - 1);
  };

  async _loadState() {
    let { isAuthen, jobDetail } = this.props;

    if (isAuthen) {
      this.setState({ jobState: jobDetail.appliedState });
    }
  }

  _handleOk = () => {
    this.setState({ visible: true });
  };

  _handleCancel = () => {
    this.setState({ visible: false });
  };

  _handleMessage = (event) => {
    this.setState({ message: event.target.value });
  };

  _handleCheckbox = (event, id) => {
    let { shiftIDs } = this.state;
    if (event.target.checked === true) {
      shiftIDs.push(id);
    } else {
      _.remove(shiftIDs, (item) => {
        return item === id;
      });
    }
  };

  _toLogin = () => {
    let { isAuthen } = this.props;
    localStorage.setItem("last_access", window.location.href);

    if (isAuthen !== true) {
      window.location.assign("/login");
    }
  };

  async _saveJob() {
    let { isAuthen, jobDetail } = this.props;
    if (isAuthen) {
      let res = await _requestToServer(
        POST,
        null,
        SAVED_JOB + `/${jobDetail.id}/saved`,
        STUDENT_HOST,
        authHeaders
      );
      if (res && res.data === null) {
        this.setState({ isSaved: true });
      } else {
      }
      this.props.getJobDetail(window.atob(this.props.match.params.id));
    }
  }

  _createRequest = () => {
    let { message, shiftIDs } = this.state;
    let id = window.atob(this.props.match.params.id);
    this.requestToServer({ message, shiftIDs }, id);
    this.setState({ visible: false });
  };

  async requestToServer(data, id) {
    await _requestToServer(
      POST,
      data,
      APPLY_JOB + `/${id}/apply`,
      STUDENT_HOST,
      authHeaders,
      null,
      false
    ).then((res) => {
      if (res) {
        let { results } = res.data;
        if (res.data.success === true) {
          swal({
            title: "Worksvns thông báo",
            text: "Ứng tuyển thành công!",
            icon: TYPE.SUCCESS,
            dangerMode: false,
          });
          this.props.getJobDetail(id);
          this._loadState();
        }
        else {
          for (let i in results) {
            console.log(results[i])
            if (results[i].full === true) {
              swal({
                title: "Worksvns thông báo",
                text: "Số người ứng tuyển đã đầy",
                icon: TYPE.ERROR,
                dangerMode: true,
              });
            } else {
              if (results[i].genderSuitable === false) {
                swal({
                  title: "Worksvns thông báo",
                  text: "Khác giới tính yêu cầu",
                  icon: TYPE.ERROR,
                  dangerMode: true,
                });
              }
            }
          }

        }
      }
    });
  }
  componentWillUnmount() { }

  render() {
    let {
      jobDetail,
      employerDetail,
      employerMoreJob,
      isAuthen,
      totalMoreJob,
      is_loading_more,
      similarJob,
      totalSimilarJob,
      is_loading_similar,
    } = this.props;
    let { is_loading, visible, confirmLoading, jobState } = this.state;
    let isSaved = jobDetail.saved;

    if (is_loading) {
      return (
        <Layout>
          <div className="loading">
            <Icon type="loading-3-quarters" spin />
          </div>
        </Layout>
      );
    }

    let content = "Ứng tuyển";
    let applyState = jobDetail.applyState;

    let color = "rgba(255, 238, 224, 0.38)";
    switch (jobDetail.jobType) {
      case "PARTTIME":
        color = "rgb(239, 253, 239)";
        break;

      case "FULLTIME":
        color = "rgb(229, 239, 255)";
        break;
      default:
        break;
    }

    if (isAuthen === false) {
      content = "Ứng tuyển";
    } else {
      if (jobState === "PENDING") {
        content = "Đang chờ";
        applyState = true;
      } else if (jobState === "ACCEPTED") {
        content = "Đã chấp nhận";
        applyState = true;
      }
    }

    let coverUrl = jobDetail.employerCoverUrl;
    let logoUrl = jobDetail.employerLogoUrl;

    return (
      <>
        {/* Info Requirement */}
        <Modal
          title="Thông tin ứng tuyển"
          visible={visible}
          onOk={this._handleOk}
          footer={[
            <Button key="cancel" onClick={this._handleCancel} type="danger">
              Huỷ
            </Button>,
            <Button
              key="ok"
              type="primary"
              onClick={isAuthen ? this._createRequest : this._toLogin}
            >
              {content}
            </Button>,
          ]}
          confirmLoading={confirmLoading}
          onCancel={this._handleCancel}
        >
          <div className="body-requirement">
            {isAuthen ? (
              <div className="content-requirement">
                <TextArea
                  className="body-requirement__text"
                  placeholder="Viết tin nhắn đến nhà tuyển dụng trong đơn ứng tuyển(nếu muốn)"
                  onChange={(event) => this._handleMessage(event)}
                  rows={4}
                  maxLength={160}
                ></TextArea>
                <div className="chose-shift-rq">
                  {jobDetail.shifts &&
                    jobDetail.shifts.map((item, index) => {
                      return (
                        <p
                          key={index}
                          className="require__p"
                          style={{ margin: "10px 0px" }}
                        >
                          <Checkbox
                            id={item.id}
                            onChange={(event) => {
                              this._handleCheckbox(event, event.target.id);
                            }}
                          >
                            Ca số {index + 1}
                          </Checkbox>
                        </p>
                      );
                    })}
                </div>
              </div>
            ) : (
                <div>
                  <p>Bạn cần đăng nhập trước khi đăng tuyển</p>
                </div>
              )}
          </div>
        </Modal>
        <Layout>
          <div className="content">
            <Row>
              <Col xs={0} sm={0} md={0} lg={1} xl={2} xxl={3}></Col>
              <Col xs={24} sm={24} md={24} lg={22} xl={20} xxl={18}>
                <div id="requirement-job" className="job-detail-content">
                  {/* Button recruitment */}
                  <div className="btn-candidate show-mobile">
                    <Button
                      onClick={() => {
                        this.setState({ visible: true });
                      }}
                    >
                      <i className="fa fa-paper-plane-o" aria-hidden="true" />
                    </Button>
                  </div>

                  {/* Cover Image */}
                  <div className="cover-image-job ">
                    <img src={testImage(coverUrl)} className="company-image" />
                  </div>
                  {/* Header */}
                  <div className="job-header">
                    <div className="company-header">
                      <Row>
                        <Col xs={4} sm={8} md={4} lg={3} xl={4} className="a_c">
                          <Avatar
                            size={70}
                            shape={"square"}
                            src={testImage(logoUrl, "logo")}
                            alt="logo-company"
                          />
                          <JobType>{jobDetail && jobDetail.jobType}</JobType>
                        </Col>
                        <Col xs={20} sm={12} md={16} lg={17} xl={14}>
                          <h4>{jobDetail && jobDetail.jobTitle}</h4>
                          <div className="d_j_t">
                            <Icon type="home" style={{ color: "#168ECD" }} />
                            <label>
                              <Link
                                to={`/employer/${window.btoa(
                                  employerDetail.id
                                )}`}
                                target="_blank"
                                style={{ fontSize: "1.05em", fontWeight: 450 }}
                              >
                                {employerDetail && employerDetail.employerName}
                              </Link>
                            </label>
                          </div>
                          <div className="d_j_t">
                            <Icon
                              type="environment-o"
                              style={{ color: "#168ECD" }}
                            />
                            <label>
                              {/* <IptLetter value={"Nơi đăng: "} /> */}
                              <span>{jobDetail && jobDetail.address}</span>
                            </label>
                          </div>
                        </Col>
                        <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                          <Row className="btn-s-c">
                            <Col
                              xs={8}
                              sm={8}
                              md={24}
                              lg={24}
                              xl={24}
                              style={{ marginTop: 10 }}
                            >
                              <Button
                                size="large"
                                type={
                                  isAuthen && !isSaved ? "primary" : "ghost"
                                }
                                onClick={() => this._saveJob()}
                                disabled={isSaved}
                                style={{
                                  marginRight: 5,
                                }}
                                children={
                                  isAuthen && !isSaved ? "Lưu" : "Đã lưu"
                                }
                                block
                              />
                            </Col>
                            <Col
                              xs={4}
                              sm={4}
                              md={4}
                              lg={0}
                              xl={0}
                              className="a_c"
                            ></Col>
                            <Col
                              xs={12}
                              sm={12}
                              md={24}
                              lg={24}
                              xl={24}
                              style={{ marginTop: 10 }}
                            >
                              <Button
                                type={applyState ? "ghost" : "default"}
                                size="large"
                                style={{
                                  padding: "5px 0px",
                                  backgroundColor: applyState ? "" : "#31a3f9",
                                  borderColor: applyState ? "" : "white",
                                  color: applyState ? "" : "white",
                                }}
                                onClick={() => {
                                  isAuthen
                                    ? this.setState({ visible: true })
                                    : this._toLogin();
                                }}
                                disabled={applyState}
                                children={content}
                                block
                              />
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  </div>
                  <div className="job-content ">
                    <Tabs defaultActiveKey="1" className="">
                      <TabPane tab="Chi tiết công việc" key="1">
                        <JobProperties
                          jobDetail={jobDetail}
                          similarJob={similarJob}
                          _getSimilarJob={this._getSimilarJob}
                          paging={totalSimilarJob}
                          is_loading_similar={is_loading_similar}
                        />
                      </TabPane>
                      <TabPane tab="Thông tin Công ty" key="2">
                        <EmployerDetail
                          employerDetail={employerDetail}
                          employerMoreJob={employerMoreJob}
                          _getMoreJob={this._getMoreJob}
                          paging={totalMoreJob}
                          is_loading_more={is_loading_more}
                        />
                      </TabPane>
                    </Tabs>
                  </div>
                </div>
              </Col>
              <Col xs={0} sm={0} md={0} lg={1} xl={2} xxl={3}></Col>
            </Row>
          </div>
        </Layout>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  jobDetail: state.GetJobDetail,
  employerDetail: state.EmployerDetail,
  employerMoreJob: state.EmployerMoreJob.data,
  similarJob: state.SimilarJob.data,
  is_loading_more: state.EmployerMoreJob.loading,
  is_loading_similar: state.SimilarJob.loading,
  totalMoreJob: state.EmployerMoreJob.data.totalItems,
  totalSimilarJob: state.SimilarJob.totalItems,
  isAuthen: state.AuthState.isAuthen,
});

const mapDispatchToprops = (dispatch) => ({
  getJobDetail: (jobID?: string) =>
    dispatch({ type: REDUX_SAGA.JOB_DETAIL.GET_JOB_DETAIL, jobID }),
  getEmployerMoreJob: (
    pageIndex?: number,
    pageSize?: number,
    employerID?: string
  ) =>
    dispatch({
      type: REDUX_SAGA.EMPLOYER_MORE_JOB.GET_EMPLOYER_MORE_JOB,
      pageIndex,
      pageSize,
      employerID,
    }),
  getSimilarJob: (pageIndex?: number, pageSize?: number) =>
    dispatch({
      type: REDUX_SAGA.SIMILAR_JOB.GET_SIMILAR_JOB,
      pageIndex,
      pageSize,
    }),
  getEmployerDetail: (id?: string) =>
    dispatch({ type: REDUX_SAGA.EMPLOYER_DETAIL.GET_EMPLOYER_DETAIL, id }),
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToprops>;

export default connect(mapStateToProps, mapDispatchToprops)(JobDetail);
