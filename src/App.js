import React, { Suspense, Fragment } from "react";
import "./app/view/sass/_common.scss";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Home from './app/view/home/Home';
import { connect } from "react-redux";
import asyncComponent from "./routes/AppRoutes";
import { REDUX, REDUX_SAGA } from "./const/actions";
import $ from "jquery";
import { Loading } from "./app/view/layout/common/Common";
import { _get } from "./services/base-api";
import { EVENT_PUBLIC } from "./services/api/public.api";
import { PUBLIC_HOST } from "./environment/development";
import { noInfoHeader } from "./services/auth";

const EventHome = asyncComponent(() =>
  import("./app/view/Event/Home/Home").then((module) => module.default)
);

const EventCountDown = asyncComponent(() =>
  import("./app/view/Event/Home/CountDown").then((module) => module.default)
);
const Home = asyncComponent(() =>
  import("./app/view/home/Home").then((module) => module.default)
);
const Profile = asyncComponent(() =>
  import("./app/view/profile/Profile").then((module) => module.default)
);

const NotFound = asyncComponent(() =>
  import("./app/view/home/Home").then((module) => module.default)
);

const Login = asyncComponent(() =>
  import("./app/view/login/Login").then((module) => module.default)
);

const ResetPassword = asyncComponent(() =>
  import("./app/view/reset-password/ResetPassword").then(
    (module) => module.default
  )
);

const Register = asyncComponent(() =>
  import("./app/view/register/Register").then((module) => module.default)
);

const ForgotPassword = asyncComponent(() =>
  import("./app/view/forgot/ForgotPassword").then((module) => module.default)
);

// const ChatPage = asyncComponent(() =>
//   import('./app/view/chat/ChatPage').then(module => module.default)
// )

const Result = asyncComponent(() =>
  import("./app/view/result/Result").then((module) => module.default)
);

const AllNoti = asyncComponent(() =>
  import("./app/view/all-noti/AllNoti").then((module) => module.default)
);

const SaveJob = asyncComponent(() =>
  import("./app/view/save-job/SaveJob").then((module) => module.default)
);
const HistoryApply = asyncComponent(() =>
  import("./app/view/history-apply/HistoryApply").then(
    (module) => module.default
  )
);
const JobDetail = asyncComponent(() =>
  import("./app/view/job-detail/JobDetail").then((module) => module.default)
);

const EmInfo = asyncComponent(() =>
  import("./app/view/em-info/EmInfo").then((module) => module.default)
);

const DataRegions = asyncComponent(() =>
  import("./app/view/data-regions/DataRegions").then((module) => module.default)
);

const DataJobNames = asyncComponent(() =>
  import("./app/view/data-job-names/DataJobNames").then(
    (module) => module.default
  )
);

//event

const EventJobDetail = asyncComponent(() =>
  import("./app/view/Event/Job/job-detail/JobDetail").then((module) => module.default)
);


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthen: true,
    };
  }

  resizeInterface = null;

  componentDidMount() {
    this._loadLocal();
    this.setState({ loading: false });
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

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.isAuthen !== prevState.isAuthen) {
      if (nextProps.isAuthen) {
        nextProps.getData();
      }

      return {
        isAuthen: nextProps.isAuthen,
      };
    }

    return null;
  }

  checkEvent() {
    let res = _get(null, `/api/schools/${process.env.REACT_APP_SCHOOL_ID}/events/${process.env.REACT_APP_EVENT_ID}?activeCheck=true`, PUBLIC_HOST, noInfoHeader)
    return res
  }
  _loadLocal = async () => {
    let token = localStorage.getItem("accessToken");
    console.log(localStorage.getItem("accessToken"));
    this.checkEvent()
      .then(res => {
        this.props.checkEvent(true)
      })
      .catch(e => {
        this.props.checkEvent(false)
      })
    if (token !== null) {
      await this.props.checkAuthen(token);
    }
  };

  render() {
    let {eventStart} = this.props
    return (
      <Fragment>
        <Router>
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route exact path="/" component={eventStart ? EventHome : EventCountDown} />
              <Route exact path="/event-job-detail/:id" component={EventJobDetail} />
              <Route exact path="/count" component={EventCountDown} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/reset-password" component={ResetPassword} />
              <Route
                exact
                path="/profile"
                component={this.props.isAuthen === true ? Profile : Home}
              />
              <Route exact path="/register" component={Register} />
              <Route exact path="/forgot-password" component={ForgotPassword} />
              <Route path="/result" component={Result} />
              <Route exact path="/save-job" component={SaveJob} />
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
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </Router>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthen: state.AuthState.isAuthen,
  eventStart: state.EventStatusReducer.status
});

const mapDispatchToProps = (dispatch) => ({
  checkAuthen: (token) =>
    dispatch({
      type: REDUX.AUTHEN.EXACT_AUTHEN,
      accessToken: token,
    }),

  getData: () =>
    dispatch({
      type: REDUX_SAGA.PERSON_INFO.GET_PERSON_INFO,
    }),

  setMobileState: (state) =>
    dispatch({
      type: REDUX.MOBILE_STATE.SET_MOBILE_STATE,
      state,
    }),
  checkEvent: (status) => {
    dispatch({
      type: REDUX.EVENT.START,
      status
    })
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
