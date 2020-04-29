import { takeEvery, call, put} from 'redux-saga/effects';
import { JOB } from '../../services/api/public.api';
import { _requestToServer } from '../../services/exec';
import { PUBLIC_HOST, STUDENT_HOST } from '../../environment/development';
import { noInfoHeader, authHeaders } from '../../services/auth';
import { store } from '../store/index';
import { JOBS } from '../../services/api/private.api';
import { REDUX_SAGA, REDUX } from '../../const/actions'
import { GET } from '../../const/method';

function* getJobDetailData(action) {
    let res = yield call(getJobDetailtData, action);
    if (res.data) {
        let data = res.data
        yield put({ type: REDUX.JOB_DETAIL.GET_JOB_DETAIL, data });
    }
}

// get JobDetailData
function getJobDetailtData(action) {
    let isAuthen = store.getState().AuthState.isAuthen;
    let res = _requestToServer(
        GET,
        null,
        (isAuthen ? JOBS : JOB) + `/${action.jobID}` + (isAuthen ? '/active' : ''),
        isAuthen ? STUDENT_HOST : PUBLIC_HOST, isAuthen ? authHeaders : noInfoHeader,
        false, false, true
    )

    return res;
}

export function* JobDetailWatcher() {
    yield takeEvery(REDUX_SAGA.JOB_DETAIL.GET_JOB_DETAIL, getJobDetailData);
}