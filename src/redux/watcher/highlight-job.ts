import { TYPE } from './../../const/type';
import { takeEvery, put, call } from 'redux-saga/effects';
import { _requestToServer } from '../../services/exec';
import { FIND_JOB } from '../../services/api/public.api';
import { PUBLIC_HOST, STUDENTS_HOST } from '../../environment/development';
import { noInfoHeader, authHeaders } from '../../services/auth';
import { store } from '../store';
import { JOBS } from '../../services/api/private.api';
import { REDUX_SAGA, REDUX } from '../../const/actions'
import { POST } from '../../const/method';



function* getListHighLightJobData(action) {
    let res = yield call(getHighLightJobData, action);
    if (res) {
        let data = res.data;
        yield put({ type: REDUX.HIGH_LIGHT.GET_HIGH_LIGHT_JOB, data });
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
        }
    };

    let isAuthen = store.getState().AuthState.isAuthen;

    let res = _requestToServer(
        POST,
        action.body ? action.body : body,
        (isAuthen ? JOBS + '/active' : FIND_JOB),
        isAuthen ? STUDENTS_HOST : PUBLIC_HOST,
        isAuthen ? authHeaders : noInfoHeader,
        {
            pageIndex: action.pageIndex ? action.pageIndex : 0,
            pageSize: action.pageSize ? action.pageSize : 6,
        },
        false
    );
    return res
}

export function* HighLightJobWatcher() {
    yield takeEvery(REDUX_SAGA.HIGH_LIGHT.GET_HIGH_LIGHT_DATA, getListHighLightJobData)
}