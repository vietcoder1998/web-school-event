import { EVENT_PUBLIC } from './../../../services/api/public.api';
import { takeEvery, put, call } from 'redux-saga/effects';
import { _requestToServer } from '../../../services/exec';
import { FIND_JOB } from '../../../services/api/public.api';
import { PUBLIC_HOST, STUDENT_HOST } from '../../../environment/development';
import { noInfoHeader, authHeaders } from '../../../services/auth';
import { store } from '../../store';
import { JOBS, EVENT_PRIVATE } from '../../../services/api/private.api';
import { REDUX_SAGA, REDUX } from '../../../const/actions'
import { POST } from '../../../const/method';


function* getListJobResultData(action) {
    yield put({ type: REDUX.JOB_RESULT.SET_LOADING_RESULT, loading: true });
    let res = yield call(getJobResults, action);
    console.log(action.body)
    if (res) {
        console.log(res)
        let data = res.data;
        yield put({ type: REDUX.JOB_RESULT.GET_JOB_RESULT, data });
        yield put({ type: REDUX.JOB_RESULT.SET_LOADING_RESULT, loading: false });
    }
}

function getJobResults(action) {
    let body = {
        employerID: null,
        excludedJobIDs: null,
        excludePriority: null,
        shuffle: true,
        jobNameIDs: null,
        jobGroupID: null,
        jobType: null,
        jobShiftFilter: null,
        jobLocationFilter: {
            regionID: null,
            lat: null,
            lon: null,
        }
    };

    if (action.body) {
        body = action.body;
    }

    let url_string = window.location.href;
    var url = new URL(url_string);
    var jnids = url.searchParams.get("jids");
    var rid = url.searchParams.get("rid");
    var jt = url.searchParams.get("jt");

    if (jnids) {
        body.jobNameIDs = [jnids];
    }

    if (rid) {
        body.jobLocationFilter.regionID = rid;
    }

    if (jt) {
        body.jobType = jt;
    }
    
    let res = _requestToServer(
        POST,
        body,
        EVENT_PRIVATE.JOBS.SEARCH,
        STUDENT_HOST,
        authHeaders,
        {
            pageIndex: action.pageIndex ? action.pageIndex : 0,
            pageSize: action.pageSize ? action.pageSize : 10,
        },
        false
    );
    return res;
}

export function* EventJobResultWatcher() {
    yield takeEvery(REDUX_SAGA.EVENT.JOB.SEARCH, getListJobResultData)
}