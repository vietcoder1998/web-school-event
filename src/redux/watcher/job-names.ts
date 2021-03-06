import { GET } from './../../const/method';
import { LIST_JOB_NAMES } from './../../services/api/public.api';
import { takeEvery, put, call } from 'redux-saga/effects';
import { _requestToServer } from '../../services/exec';
import { PUBLIC_HOST } from '../../environment/development';
import { noInfoHeader } from '../../services/auth';
import { REDUX_SAGA, REDUX } from '../../const/actions'

function* getListJobNameData(action) {
    let res = yield call(getJobNameData, action);
    
    if (res) {
        let data = res.data;
        yield put({ type: REDUX.JOB_NAMES.GET_JOB_NAMES, data });
    }
}

function getJobNameData(action) {
    let res = _requestToServer(
        GET,
        undefined,
        LIST_JOB_NAMES,
        PUBLIC_HOST,
        noInfoHeader,
        { pageIndex: 0, pageSize: 0, name: action.name ? action.name : null },
        false
    );
    return res;
}

export function* JobNameWatcher() {
    yield takeEvery(REDUX_SAGA.JOB_NAMES.GET_JOB_NAMES, getListJobNameData)
}