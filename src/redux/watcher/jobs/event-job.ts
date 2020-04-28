import { takeEvery, put, call } from 'redux-saga/effects';
import { _requestToServer } from '../../../services/exec';
import { FIND_JOB } from '../../../services/api/public.api';
import { PUBLIC_HOST, STUDENTS_HOST } from '../../../environment/development';
import { noInfoHeader, authHeaders } from '../../../services/auth';
import { store } from '../../store';
import { JOBS } from '../../../services/api/private.api';
import { REDUX_SAGA, REDUX } from '../../../const/actions'
import { POST } from '../../../const/method';


function* getListJobResultData(action) {
    let res = yield call(getEventJobResults, action);
    if (res) {
        let data = res.data;
        yield put({ type: REDUX.JOB_RESULT.GET_JOB_RESULT, data });
    }
}

function getEventJobResults(action) {
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


    let isAuthen = store.getState().AuthState.isAuthen;
    let res = _requestToServer(
        POST,
        body,
        (isAuthen ? JOBS.EVENT.ACTIVE : FIND_JOB),
        isAuthen ? STUDENTS_HOST : PUBLIC_HOST,
        isAuthen ? authHeaders : noInfoHeader,
        {
            pageIndex: action.pageIndex ? action.pageIndex : 0,
            pageSize: action.pageSize ? action.pageSize : 10,
        },
        false
    );

    return res;
}

export function* JobResultWatcher() {
    yield takeEvery(REDUX_SAGA.JOB_RESULT.GET_JOB_RESULT, getListJobResultData)
}