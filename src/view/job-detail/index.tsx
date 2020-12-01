import React, { Component } from "react";
import { Tabs, Row, Col, Icon, Button, Modal, Checkbox, Avatar, Affix } from "antd";
import { connect } from "react-redux";
import { _requestToServer } from "../../services/exec";
import { POST, DELETE } from '../../const/method';
import { APPLY_JOB, SAVED_JOB } from "../../services/api/private.api";
import { STUDENT_HOST } from "../../environment/development";
import { authHeaders } from "../../services/auth";
//@ts-ignore
import _ from "lodash";
import { moveScroll } from "../../utils/moveScroll";
import { testImage } from "../../utils/CheckImage";
import { Input } from "antd";
import Layout from "../layout/Layout";
import { NotUpdate, JobType } from "../layout/common/Common";
import { REDUX_SAGA } from "../../const/actions";
import JobProperties from "./JobProperties";
import EmployerDetail from "./EmployerDetail";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { TYPE } from "../../const/type";
import qs from "query-string";
import { goBackWhenLogined } from '../../utils/goBackWhenLogined'
import { LazyLoadImage } from 'react-lazy-load-image-component';
// import SearchFilter from './../result/search-filter/SearchFilter';

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
  loading: boolean;
}

// @ts-ignore
interface IJobDetailProps extends StateProps, DispatchProps {
  match?: any;
  history?: any;
  getEmployerMoreJob?: (
    pageIndex?: number,
    pageSize?: number,
    id?: string,
    param?: string
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
      loading: false,
    };
  }

  show_btn = false;
  l_e = [];
  l_s = [];
  componentDidMount() {
    let queryParam = qs.parse(window.location.search);
    let { isAuthen } = this.props;
    if (queryParam.changeHost === '1') {
      if (isAuthen) {
        this.setState({ visible: true })
        // console.log(window.location.pathname)
        // window.location.search = null;
        this.props.history.replace(`${window.location.pathname}?data=${queryParam.data}`)
      } else {
        goBackWhenLogined('login')
      }
    }
    this.setState({ is_loading: false });
    this._loadData();
    this._loadState();
    moveScroll(0, 0);
    if (!localStorage.getItem("cvUrl") && localStorage.getItem("accessToken")) {
      this.props.getFullProfile()
    }
    this.props.getSimilarJob(0, 6);
  }

  static getDerivedStateFromProps(
    nextProps?: IJobDetailProps,
    prevState?: IJobDetailState
  ) {
    if (
      nextProps.jobDetail &&
      nextProps.jobDetail.employerID &&
      nextProps.jobDetail.employerID !== prevState.employerID
    ) {
      nextProps.getEmployerDetail(nextProps.jobDetail.employerID);
      nextProps.getEmployerMoreJob(0, 6, nextProps.jobDetail.employerID);
      let isSaved = nextProps.jobDetail.saved
      let jobState = nextProps.jobDetail.applyState;

      return {
        employerID: nextProps.jobDetail.employerID,
        isSaved,
        jobState
      };
    }

    return null;
  }

  _loadData = () => {
    let { jobDetail } = this.props;
    this.props.getJobDetail(window.atob(this.props.match.params.id));
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
    localStorage.setItem("last_access", window.location.pathname);
    let path = window.location.pathname + window.location.search
    if (isAuthen !== true) {
      window.location.assign(`/login?path=${window.btoa(path)}`);
    }
  };

  async _saveJob() {
    let { isAuthen, jobDetail } = this.props;
    let { isSaved } = this.state;

    if (isAuthen) {
      let body;
      let method = POST;
      let API = SAVED_JOB + `/${jobDetail.id}/saved`
      if (isSaved) {
        API = SAVED_JOB + '/saved';
        body = [jobDetail.id];
        method = DELETE
      }
      this.setState({ loading: true })
      await _requestToServer(
        method,
        body,
        API,
        STUDENT_HOST,
        authHeaders,
        undefined,
        true
      );
      this.setState({ isSaved: !isSaved, loading: false });
    }
  }

  _createRequest = () => {
    let { message, shiftIDs } = this.state;
    let id = window.atob(this.props.match.params.id);
    let newMsg = message + '\n' + "Link CV:" + (localStorage.getItem("cvUrl") ? localStorage.getItem("cvUrl") : "Ứng viên chưa cập nhật CV")
    this.requestToServer({ newMsg, shiftIDs }, id);
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
            buttons: {
              // type: "OK",
              catch: {
                text: "Lịch sử ứng tuyển",
                value: "catch",
              },
            },
            title: "Worksvns thông báo",
            text: `Ứng tuyển thành công!
            Hồ sơ của bạn đã được gửi đến nhà tuyển dụng`,
            icon: TYPE.SUCCESS,
            dangerMode: false
          }).then((value) => {
            switch (value) {
              case "catch":
                window.open('/lich-su-ung-tuyen')
                break;
            }
          })
          this.props.getJobDetail(id);
          this._loadState();
        }
        else {
          for (let i in results) {
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
  // componentWillUnmount() { }

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
      param,
    } = this.props;
    let { is_loading, visible, confirmLoading, jobState, isSaved, loading } = this.state;
    // let isSaved = jobDetail.saved;

    if (is_loading) {
      return (
        <Layout>
          <div className="loading">
            <Icon type="loading-3-quarters" spin />
          </div>
        </Layout>
      );
    }
    let content;
    let applyState = jobDetail.applyState;
    if (!isAuthen) {
      content = <i>Đăng nhập để ứng tuyển</i>;
    }
    switch (jobState) {
      case "PENDING":
        content = "Đang chờ nhà tuyển dụng";
        break;
      case "ACCEPTED":
        content = "Đã chấp nhận";
        break;
      default:
        content = "Ứng tuyển"
        break;
    }

    let coverUrl = require("./../../assets/image/countdown.jpg");

    if (jobDetail.employerCoverUrl) {
      coverUrl = jobDetail.employerCoverUrl
    };

    let logoUrl = jobDetail.employerLogoUrl;

    return (
      <>
        {/* Info Requirement */}
        <Modal
          title={
            <div>
              <h6><b>Ứng tuyển vào công việc:</b></h6>
              <p>
                <i>{jobDetail && jobDetail.jobTitle ? jobDetail.jobTitle : ""}</i>
              </p>
            </div>
          }
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
                <div style={{ fontStyle: 'italic' }}>
                  <span className="asterisk">*</span> Hồ sơ của bạn sẽ được gửi đến Nhà tuyển dụng!
                  <a href="/profile" target="_blank">
                    Hoàn thiện hồ sơ
                  </a>
                </div>
                <div>
                  <a href={localStorage.getItem("cvUrl")} target="_blank" >LinkCV: {localStorage.getItem("cvUrl")}</a>
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
          {/* Cover Image */}

          <div className="content">
            <div className="cover-image-job ">
              <Link to={`/employer/${window.btoa(employerDetail.id)}${param}`}
                target="_blank"
                style={{ fontSize: "1.05em", fontWeight: 450 }}
              >
                <LazyLoadImage
                  alt={employerDetail && employerDetail.employerName}
                  src={coverUrl}
                  onError={() => coverUrl = require("./../../assets/image/countdown.jpg")}
                  className="company-image"
                />
              </Link>
            </div>
            <Row style={{ marginTop: '0.5vw' }}>
              <Col xs={0} sm={0} md={0} lg={1} xl={2} xxl={3} />
              <Col xs={24} sm={24} md={24} lg={22} xl={20} xxl={18}>
                <div id="requirement-job" className="job-detail-content">
                  {/* Button recruitment */}
                  <div className="btn-candidate show-mobile">
                    <Button
                      onClick={() => {
                        this.setState({ visible: true });
                      }}
                    >
                      <Icon type="solution" />
                    </Button>
                  </div>
                  {/* Header */}
                  <div className="job-header">
                    <div className="company-header">
                      <Row>
                        <Col onClick={() => window.location.assign(`/employer/${window.btoa(employerDetail.id)}${param}`)}
                          xs={6} sm={8} md={4} lg={3} xl={3} xxl={3} className="a_c" style={{ padding: 5, marginRight: 5 }}>
                          <Avatar
                            shape={"square"}
                            src={testImage(logoUrl, "logo")}
                            alt={employerDetail && employerDetail.employerName}
                            style={{
                              margin: '5px 0',
                              width: '80px',
                              height: "80px",
                              border: "solid #80808038 1px",
                              cursor: "pointer"
                            }}
                          />
                          <JobType width={'80px'}>{jobDetail && jobDetail.jobType}</JobType>
                        </Col>
                        <Col xs={17} sm={11} md={15} lg={14} xl={15} xxl={16} style={{ padding: 10 }}>
                          <h4 style={{ textTransform: "capitalize" }}>{jobDetail && jobDetail.jobTitle}</h4>
                          <i>Chi nhánh: {jobDetail && jobDetail.employerBranchName ? jobDetail.employerBranchName: "Chính"}</i>
                          <div className="d_j_t">
                            <Icon type="home" style={{ color: "#168ECD" }} />
                            <label>
                              <Link
                                to={`/employer/${window.btoa(employerDetail.id)}${param}`}
                                target="_blank"
                                style={{ fontSize: "1.1em" }}
                              >
                                <b>
                                  {employerDetail && employerDetail.employerName}
                                </b>
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
                        <Col xs={24} sm={24} md={12} lg={10} xl={14} xxl={10}>
                          <Button
                            type={applyState ? "ghost" : "default"}
                            style={{
                              height: 50,
                              width: '68%',
                              margin: "10px",
                              backgroundColor: applyState ? "" : "rgb(249, 96, 49)",
                              borderColor: applyState ? "" : "white",
                              color: applyState ? "" : "white",
                              fontSize: '1rem'
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
                          {
                            isAuthen ? <Button
                              onClick={() => this._saveJob()}
                              style={{
                                height: 48, fontSize: '1rem',
                                color: isSaved ? "#21252959" : "orange",
                                borderColor: isSaved ? "" : "navajowhite"
                              }}
                            >
                              {loading ? <Icon type="loading" /> : (isSaved ? "Đã lưu" : "Lưu")}
                            </Button> : null
                          }
                        </Col>
                      </Row>
                    </div>
                  </div>
                  <div className="job-content">
                    <Tabs defaultActiveKey="1" className="">
                      <TabPane tab="Chi tiết công việc" key="1">
                        <JobProperties
                          jobDetail={jobDetail}
                          similarJob={similarJob}
                          _getSimilarJob={this._getSimilarJob}
                          paging={totalSimilarJob}
                          is_loading_similar={is_loading_similar}
                          param={param}
                        />
                      </TabPane>
                      <TabPane tab="Thông tin Công ty" key="2">
                        <EmployerDetail
                          employerDetail={employerDetail}
                          employerMoreJob={employerMoreJob}
                          _getMoreJob={this._getMoreJob}
                          paging={totalMoreJob}
                          is_loading_more={is_loading_more}
                          param={param}
                        />
                      </TabPane>
                    </Tabs>
                  </div>
                </div>
              </Col>
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
  param: state.DetailEvent.param
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
  getFullProfile: () =>
    dispatch({ type: REDUX_SAGA.PERSON_INFO.GET_FULL_PERSON_INFO })
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToprops>;

export default connect(mapStateToProps, mapDispatchToprops)(JobDetail);
