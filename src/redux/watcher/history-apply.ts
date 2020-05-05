import { takeEvery, put, call } from 'redux-saga/effects';
import { _requestToServer } from '../../services/exec';
import { STUDENT_HOST } from '../../environment/development';
import { authHeaders } from '../../services/auth';
import { SAVED_JOB } from '../../services/api/private.api';
import { REDUX_SAGA, REDUX } from '../../const/actions'
import { GET } from '../../const/method';

function* getListHistoryApplyData(action) {
    let res = yield call(getHistoryApplyData, action);
    yield put({ type: REDUX.HISTORY_APPLY.SET_LOADING_HISTORY_APPLY, loading: true });
    if (res) {
        let data = res.data;
        yield put({ type: REDUX.HISTORY_APPLY.GET_HISTORY_APPLY, data });
        yield put({ type: REDUX.HISTORY_APPLY.SET_LOADING_HISTORY_APPLY, loading: false });
    }
}

function getHistoryApplyData(action) {
    let token = localStorage.getItem('accessToken');

    if (token) {
        let res = _requestToServer(
            GET,
            undefined,
            SAVED_JOB + '/apply',
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

export function* HistoryApplyWatcher() {
    yield takeEvery(REDUX_SAGA.HISTORY_APPLY.GET_HISTORY_APPLY, getListHistoryApplyData)
}