import { takeEvery, put,  call } from 'redux-saga/effects';
import { _requestToServer } from '../../services/exec';
import { STUDENT_HOST } from '../../environment/development';
import { authHeaders } from '../../services/auth';
import { notiController } from '../../services/api/private.api';
import { REDUX_SAGA, REDUX } from '../../const/actions'
import { GET } from '../../const/method';
import { store } from '../store';


function* getListNotiData(action) {
    let isAuthen = store.getState().AuthState.isAuthen;
    if (isAuthen) {
        let res = yield call(getNotiData, action);
        if (res) {
            let data = res.data;
            yield put({ type: REDUX.NOTI.GET_NOTI, data });
        }
    }
}

function getNotiData(action) {
    let res = _requestToServer(
        GET,
        null,
        notiController,
        STUDENT_HOST,
        authHeaders,
        { pageIndex: action.pageIndex, pageSize: 10 },
        false
    );
    return res;
}

export function* notiInfoWatcher() {
    yield takeEvery(REDUX_SAGA.NOTI.GET_NOTI, getListNotiData)
}