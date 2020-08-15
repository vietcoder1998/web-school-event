import React, { Suspense, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Home from './app/home/Home';
import { connect } from "react-redux";
import asyncComponent from "../routes/AppRoutes";
import { REDUX, REDUX_SAGA } from "../const/actions";
import './sass/_common.scss';
import $ from "jquery";
// import { Loading } from "./app/layout/common/Common";
import { _get } from "../services/base-api";
import { PUBLIC_HOST } from "../environment/development";
import { noInfoHeader } from "../services/auth";
import BarLoader from "react-spinners/BarLoader";
import qs from "query-string";

const EventHome = asyncComponent(() =>
  import("./event").then((module) => module.default)
);

const EventCountDown = asyncComponent(() =>
  import("./event/home/CountDown").then((module) => module.default)
);
const Home = asyncComponent(() =>
  import("./home").then((module) => module.default)
);
const Profile = asyncComponent(() =>
  import("./profile").then((module) => module.default)
);

const NotFound = asyncComponent(() =>
  import("./home").then((module) => module.default)
);

const Login = asyncComponent(() =>
  import("./login/Login").then((module) => module.default)
);

const ResetPassword = asyncComponent(() =>
  import("./reset-password/ResetPassword").then(
    (module) => module.default
  )
);

const Register = asyncComponent(() =>
  import("./register/Register").then((module) => module.default)
);

const ForgotPassword = asyncComponent(() =>
  import("./forgot/ForgotPassword").then((module) => module.default)
);

// const ChatPage = asyncComponent(() =>
//   import('./app/chat/ChatPage').then(module => module.default)
// )

const Result = asyncComponent(() =>
  import("./result").then((module) => module.default)
);

const AllNoti = asyncComponent(() =>
  import("./all-noti/AllNoti").then((module) => module.default)
);

const SaveJob = asyncComponent(() =>
  import("./save-job/SaveJob").then((module) => module.default)
);

const HistoryApply = asyncComponent(() =>
  import("./history-apply/HistoryApply").then(
    (module) => module.default
  )
);
const JobDetail = asyncComponent(() =>
  import("./job-detail").then((module) => module.default)
);

const EmInfo = asyncComponent(() =>
  import("./em-info/EmInfo").then((module) => module.default)
);

const DataRegions = asyncComponent(() =>
  import("./data-regions/DataRegions").then((module) => module.default)
);

const DataJobNames = asyncComponent(() =>
  import("./data-job-names/DataJobNames").then(
    (module) => module.default
  )
);

//event

const EventJobDetail = asyncComponent(() =>
  import("./event/job-detail").then(
    (module) => module.default
  )
);

const Article = asyncComponent(() =>
  import("./article").then((module) => module.default)
);

const ArticleDetail = asyncComponent(() =>
  import("./article/detail/ArticleDetail").then(
    (module) => module.default
  )
);


const override = `
display: block;
margin: 0 auto;
border-color: red;
font-size: 150px;
`;


interface IProps {
  checkAuthen?: Function;
  checkEvent?: Function;
  setInfoEvent?: Function;
  noEvent?: Function;
  getData?: Function;
  isAuthen?: boolean;
  setMobileState?: Function;
  setEventID?: Function;
}

interface IState {
  isAuthen?: boolean;
  loading?: boolean;
}

class App extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      isAuthen: true,
      loading: true,
    };
  }

  resizeInterface = null;

  componentWillMount() {
    return (<BarLoader />)
  }

  async componentDidMount() {
    await this._loadLocal();
    if (this.props.isAuthen) {
      this.props.getData();
    }
    this._callResize();
    $(window).resize(() => {
      this._callResize();
    });
  }

  componentWillUnmount() {
    this.resizeInterface = null;

  }

  _callResize = () => {
    if (window.innerWidth < 476) {
      this.props.setMobileState(true);
    } else {
      this.props.setMobileState(false);
    }
  };

  checkEvent(schoolID, eventID) {
    let res = _get(
      null,
      `/api/schools/${schoolID}/events/${eventID}/simple?activeCheck=false`,
      PUBLIC_HOST,
      noInfoHeader
    );
    return res
  }
  getInfoSchool(schoolID) {
    let res = _get(
      null,
      `/api/schools/${schoolID}/simple`,
      PUBLIC_HOST,
      noInfoHeader
    );
    return res
  }
  _loadLocal = async () => {
    let token = localStorage.getItem("accessToken");

    let queryParam = qs.parse(window.location.search, {
      //@ts-ignore

      ignoreQueryPrefix: true,
    });
    if (queryParam.data) {
      //@ts-ignore
      let data = window.atob(queryParam.data)
      let queryParam2 = qs.parse(data)

      if (queryParam2.schoolID && queryParam2.eventID) {
        this.getInfoSchool(queryParam2.schoolID).then((res) => {
          if (res && res.data) {
            this.props.setInfoEvent(res.data.logoUrl, res.data.primaryColor, res.data.primaryDarkColor, window.location.search, queryParam2.schoolID, queryParam2.eventID)
          }
        }).finally(() => {

          this.setState({ loading: false })
        })
        this.checkEvent(queryParam2.schoolID, queryParam2.eventID)
          .then((res) => {
            if (res.data.started === true && res.data.finished === false) {
              this.props.checkEvent(
                true,
                new Date(res.data.startedDate),
                res.data.name
              );
            } else if (res.data.started === false) {
              this.props.checkEvent(false, new Date(res.data.startedDate));
            } else {
              this.props.noEvent(false, null)
            }
          })
          .catch((e) => {
            try {
              this.props.noEvent(false, e.response.msg);
            } catch (e) {
              this.props.noEvent(false, null);
            }
          });
      } else if (!queryParam2.schoolID && queryParam2.eventID) {
        this.props.setEventID(queryParam2.eventID)
      }
    } else {
      this.props.noEvent(false, null);
      this.setState({ loading: false })
      this.props.setInfoEvent(null, null, null, '', '', '')
    }

    if (token !== null) {
      this.props.checkAuthen(token);
    };

  };

  render() {
    // let { eventStart } = this.props;  
    return (
      <Fragment>
        <Router>
          <Suspense fallback={
            <BarLoader
              css={override}
              //@ts-ignore
              size={150}
              color={"#32A3F9"}
              loading={true}
            />
          }>
            <Switch>
              <Route
                exact
                path="/events"
                component={EventHome}
              />
              <Route
                exact
                path="/countdown"
                component={EventCountDown}
              />
              <Route
                exact
                path="/event-job-detail/:id"
                component={EventJobDetail}
              />
              <Route exact path="/count" component={EventCountDown} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/login" component={this.props.isAuthen ? Home : Login} />
              <Route exact path="/reset-password" component={ResetPassword} />
              <Route
                exact
                path="/profile"
                component={this.props.isAuthen === true ? Profile : Home}
              />
              <Route exact path="/register" component={this.props.isAuthen ? Home : Register} />
              <Route
                exact
                path="/forgot-password"
                component={ForgotPassword}
              />
              <Route path="/result" component={Result} />
              <Route exact path="/save-job" component={SaveJob} />
              {/* <Route exact path="/download-apps-student" component={DownloadApps} /> */}
              <Route exact path="/history-apply" component={HistoryApply} />
              <Route exact path="/job-detail/:id" component={JobDetail} />
              <Route exact path="/notifications" component={AllNoti} />
              <Route exact path="/tat-ca-cac-tinh" component={DataRegions} />
              <Route
                exact
                path="/tat-ca-cac-cong-viec"
                component={DataJobNames}
              />
              <Route exact path="/employer/:id" component={EmInfo} />
              <Route exact path="/announcement/:id" component={Article} />
              <Route exact path="/announcementDetail/:id" component={ArticleDetail} />
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </Router>
      </Fragment>
    );
    // }
  }
}

const mapStateToProps = (state) => ({
  isAuthen: state.AuthState.isAuthen,
  eventStart: state.EventStatusReducer.status,
});

const mapDispatchToProps = (dispatch) => ({
  checkAuthen: (token) =>
    dispatch({
      type: REDUX.AUTHEN.EXACT_AUTHEN,
      accessToken: token,
    }),

  getData: () =>
    dispatch({
      type: REDUX_SAGA.PERSON_INFO.GET_SHORT_PERSON_INFO,
    }),

  setMobileState: (state) =>
    dispatch({
      type: REDUX.MOBILE_STATE.SET_MOBILE_STATE,
      state,
    }),
  checkEvent: (status, time, name) => {
    dispatch({
      type: REDUX.EVENT.START,
      time: time,
      status,
      name: name,
    });
  },
  setInfoEvent: (logo, primaryColor, primaryDarkColor, param, schoolID, eventID) => {
    dispatch({
      type: REDUX.EVENT.LOGO_SCHOOL,
      logo,
      primaryColor,
      primaryDarkColor,
      param,
      schoolID,
      eventID
    });
  },
  noEvent: (msg) => {
    dispatch({
      type: REDUX.EVENT.NOT_AVAILABLE,
      msgError: msg,
    });
  },
  setEventID: (eventID) => dispatch({ type: REDUX.EVENT.SET_EVENT_ID, eventID })
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
