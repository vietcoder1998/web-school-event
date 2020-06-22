import { EVENT_PUBLIC } from './../../../services/api/public.api';
import { takeEvery, put, call } from 'redux-saga/effects';
import { _requestToServer } from '../../../services/exec';
import { PUBLIC_HOST } from '../../../environment/development';
import { REDUX_SAGA, REDUX } from '../../../const/actions'
import { _get } from '../../../services/base-api';
import { store } from '../../store';

function* getListEventBranch(action) {
    let res = yield call(getBranchData, action);
    if (res) {
        let data = res.data;
        yield put({ type: REDUX.EVENT.JOB.BRANCH, data });
    }
}

function getBranchData(action) {
    let eventID = store.getState().DetailEvent.eventID;
    let res = _get(null, `/api/schools/events/${eventID}/jobs/branches`, PUBLIC_HOST, null)
    return res;
}

export function* JobNameWatcher() {
    yield takeEvery(REDUX_SAGA.EVENT.JOB.BRANCH, getListEventBranch)
}