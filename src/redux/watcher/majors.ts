import { GET } from './../../const/method';
import { MAJORS } from './../../services/api/public.api';
import { takeEvery, put, call } from 'redux-saga/effects';
import { _requestToServer } from '../../services/exec';
import { PUBLIC_HOST } from '../../environment/development';
import { noInfoHeader } from '../../services/auth';
import { REDUX_SAGA, REDUX } from '../../const/actions'

function* getListMajorData(action) {
    let res = yield call(getMajorData, action);
    
    if (res) {
        let data = res.data;
        yield put({ type: REDUX.MAJOR.GET_MAJOR, data });
    }
}

function getMajorData(action) {
    let res = _requestToServer(
        GET,
        undefined,
        MAJORS,
        PUBLIC_HOST,
        noInfoHeader,
        { pageIndex: 0, pageSize: 0, name: action.name ? action.name : null },
        false
    );
    return res;
}

export function* MajorsWatcher() {
    yield takeEvery(REDUX_SAGA.MAJOR.GET_MAJOR, getListMajorData)
}