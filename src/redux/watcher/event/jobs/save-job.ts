import { takeEvery, put, call } from 'redux-saga/effects';
import { _requestToServer } from '../../../../services/exec';
import { STUDENT_HOST } from '../../../../environment/development';
import { authHeaders } from '../../../../services/auth';
import { SAVED_JOB } from '../../../../services/api/private.api';
import { REDUX_SAGA, REDUX } from '../../../../const/actions'
import { GET } from '../../../../const/method';

function* getListJobSaveData(action) {
    let res = yield call(getJobSaveData, action);
    if (res) {
        let data = res.data;
        yield put({ type: REDUX.EVENT.JOB.SAVE, data });
    }
}

function getJobSaveData(action) {
    let token = localStorage.getItem('actk_w_s');

    if (token) {
        let res = _requestToServer(
            GET,
            undefined,
            SAVED_JOB + '/saved',
            STUDENT_HOST,
            authHeaders,
            { 
                pageIndex: action.pageIndex ? action.pageIndex : 0, 
                pageSize: action.pageSize ? action.pageSize : 0, 
            },
            false
        )
        return res
    }
}

export function* JobSaveWatcher() {
    yield takeEvery(REDUX_SAGA.SAVED_JOB.GET_SAVED_JOB, getListJobSaveData)
}