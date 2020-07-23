import { TYPE } from './../../const/type';
import { takeEvery, put, call } from 'redux-saga/effects';
import { _requestToServer } from '../../services/exec';
import {NORMAL_PUBLIC} from '../../services/api/public.api';
import { PUBLIC_HOST, STUDENT_HOST } from '../../environment/development';
import { noInfoHeader, authHeaders } from '../../services/auth';
import { store } from '../store';
import {NORMAL_PRIVATE} from '../../services/api/private.api';
import { REDUX_SAGA, REDUX } from '../../const/actions'
import { POST } from '../../const/method';

function* getListHighLightJobData(action) {
    yield put({ type: REDUX.HIGH_LIGHT.SET_LOADING_HIGH_LIGHT_JOB, loading_high_light_data: true });
    let res = yield call(getHighLightJobData, action);
    if (res) {
        let data = res.data;
        yield put({ type: REDUX.HIGH_LIGHT.GET_HIGH_LIGHT_JOB, data });
        yield put({ type: REDUX.HIGH_LIGHT.SET_LOADING_HIGH_LIGHT_JOB, loading_high_light_data: false });
    }
}

function getHighLightJobData(action) {
    let body = {
        employerID: null,
        excludedJobIDs: null,
        shuffle: true,
        jobNameID: null,
        jobGroupID: null,
        jobType: null,
        jobShiftFilter: null,
        jobLocationFilter: null,
        jobPriorityFilter: {
            searchPriority: TYPE.HIGHLIGHT
        },
        schoolEventID: store.getState().DetailEvent.eventID
    };
    let isAuthen = store.getState().AuthState.isAuthen;
    let res = _requestToServer(
        POST,
        action.body ? action.body : body,
        (isAuthen ? NORMAL_PRIVATE.JOBS.HOME : NORMAL_PUBLIC.JOBS.HOME),
        isAuthen ? STUDENT_HOST : PUBLIC_HOST,
        isAuthen ? authHeaders : noInfoHeader,
        {
            pageIndex: action.pageIndex ? action.pageIndex : 0,
            pageSize: action.pageSize ? action.pageSize : 6,
            priority: 'TOP'
        },
        false
    );
    return res
}

export function* HighLightJobWatcher() {
    yield takeEvery(REDUX_SAGA.HIGH_LIGHT.GET_HIGH_LIGHT_DATA, getListHighLightJobData)
}