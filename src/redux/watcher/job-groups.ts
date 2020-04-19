import { GET } from '../../const/method';
import { LIST_JOB_NAMES } from '../../services/api/public.api';
import { takeEvery, put, call } from 'redux-saga/effects';
import { _requestToServer } from '../../services/exec';
import { PUBLIC_HOST } from '../../environment/development';
import { noInfoHeader } from '../../services/auth';
import { REDUX_SAGA, REDUX } from '../../const/actions'
import { POST } from '../../const/method';


function* getListJobGroupsData(action) {
    let res = yield call(getJobGroupsData, action);
    let data = {
        
    };
    if (res) {
        let data = res.data;
        yield put({ type: REDUX.JOB_NAMES.GET_JOB_NAMES, data });
    }
}

function getJobGroupsData(action) {
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

export function* JobGroupsWatcher() {
    yield takeEvery(REDUX_SAGA.JOB_NAMES.GET_JOB_NAMES, getListJobGroupsData)
}