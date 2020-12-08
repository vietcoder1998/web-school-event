
import { NORMAL_PRIVATE } from "./../../services/api/private.api";
import { takeEvery, put, call } from "redux-saga/effects";
import { _requestToServer } from "../../services/exec";
import { NORMAL_PUBLIC } from "../../services/api/public.api";
import { PUBLIC_HOST, STUDENT_HOST } from "../../environment/development";
import { noInfoHeader, authHeaders } from "../../services/auth";
import { store } from "../store";
import { REDUX_SAGA, REDUX } from "../../const/actions";
import { POST } from "../../const/method";
import { IJobSearchFilter } from '../../models/job-search';

function* getListJobResultData(action) {
  yield put({ type: REDUX.JOB_RESULT.SET_LOADING_RESULT, loading: true });
  let res = yield call(getJobResults, action);

  if (res) {
    let data = res.data;
    yield put({ type: REDUX.JOB_RESULT.GET_JOB_RESULT, data });
    yield put({ type: REDUX.JOB_RESULT.SET_LOADING_RESULT, loading: false });
  }
}

function getJobResults(action) {
  let body: IJobSearchFilter = {
    employerID: null,
    excludedJobIDs: null,
    shuffle: false,
    jobNameIDs: null,
    jobGroupIDs: null,
    jobType: null,
    jobShiftFilter: null,
    jobTitle: null,
    jobLocationFilter: {
      regionID: null,
      lat: null,
      lon: null,
      distance: 100,
    },
    schoolEventID: store.getState().DetailEvent.eventID,
    branchIDs: null
  };

  if (action.body) {
    body = action.body;
  }

  let url_string = window.location.href;
  var url = new URL(url_string);
  var jnids = url.searchParams.get("jobNameID");
  var rid = url.searchParams.get("regionID");
  var jt = url.searchParams.get("jt");
  var brids = url.searchParams.get("branchIDs");
  var title = url.searchParams.get("jobTitle");
  var mjid = url.searchParams.get("majorID")
  var pageIndex = url.searchParams.get("pi")
  var pageSize = url.searchParams.get("ps")

  if (jnids) {
    body.jobNameIDs = [parseInt(jnids)];
  }

  if (rid) {
    body.jobLocationFilter.regionID = rid;
  }

  if (jt) {
    body.jobType = jt;
  }

  if (brids) {
    body.branchIDs = [parseInt(brids)];
  }

  if (mjid) {
    body.majorIDs = [parseInt(mjid)]
  }
  if (title) {
    body.jobTitle = title
  }

  body.jobLocationFilter.distance=null;
  body.jobLocationFilter.lat=null;
  body.jobLocationFilter.lon=null;

  let isAuthen = store.getState().AuthState.isAuthen;

  if (action.pageIndex) {
    pageIndex = action.pageIndex
    url.searchParams.append("pi", pageIndex)
  }
  
  if (action.pageSize) {
    pageSize = action.pageSize
    url.searchParams.append("ps", pageSize)
  }

  let res= _requestToServer(
      POST,
      body,
      isAuthen ? NORMAL_PRIVATE.JOBS.SEARCH : NORMAL_PUBLIC.JOBS.SEARCH,
      isAuthen ? STUDENT_HOST : PUBLIC_HOST,
      isAuthen ? authHeaders : noInfoHeader,
      {
        pageIndex: pageIndex ? pageIndex : 0,
        pageSize: pageSize ? pageSize : 15,
      },
      false
    );
   
  return res;
}

export function* JobResultWatcher() {
  yield takeEvery(REDUX_SAGA.JOB_RESULT.GET_JOB_RESULT, getListJobResultData);
}
