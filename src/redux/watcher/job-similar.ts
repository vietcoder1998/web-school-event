import { POST } from './../../const/method';
import { call, takeEvery, put } from 'redux-saga/effects';
import { PUBLIC_HOST } from '../../environment/development';
import { noInfoHeader } from '../../services/auth';
import { FIND_JOB } from '../../services/api/public.api';
import { REDUX, REDUX_SAGA } from './../../const/actions';
import { _requestToServer } from '../../services/exec';

function* getSimilarJobData(action) {
    yield put({ type: REDUX.SIMILAR_JOB.SET_LOADING_SIMILAR_JOB, loading: true });
    let res = yield call(getSimilarJob, action);
    if (res) {
        let data = res.data;
        yield put({ type: REDUX.SIMILAR_JOB.GET_SIMILAR_JOB, data, totalItems: data.totalItems });
    }
    yield put({ type: REDUX.SIMILAR_JOB.SET_LOADING_SIMILAR_JOB, loading: false });

}

// get EmployerData
function getSimilarJob(action) {

    let body = {
        employerID: null,
        excludedJobIDs: null,
        priority: null,
        excludePriority: null,
        shuffle: false,
        jobNameID: null,
        jobGroupID: null,
        jobType: null,
        jobShiftFilter: null,
        jobLocationFilter: null
    };

    let res = _requestToServer(
        POST,
        body,
        FIND_JOB,
        PUBLIC_HOST,
        noInfoHeader,
        {
            pageIndex: action.pageIndex ? action.pageIndex : 0,
            pageSize: 6
        }
    );

    return res;
}

export function* SimilarJobWatcher() {
    yield takeEvery(REDUX_SAGA.SIMILAR_JOB.GET_SIMILAR_JOB, getSimilarJobData);
}
