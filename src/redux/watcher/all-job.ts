import { IJobSearchFilter } from './../../models/job-search';
import { takeEvery, put, call } from 'redux-saga/effects';
import { _requestToServer } from '../../services/exec';
import { FIND_JOB } from '../../services/api/public.api';
import { PUBLIC_HOST, CANDIDATE_HOST } from '../../environment/development';
import { noInfoHeader, authHeaders } from '../../services/auth';
import { store } from '../store';
import { JOBS } from '../../services/api/private.api';
import { REDUX_SAGA, REDUX } from '../../const/actions'
import { POST } from '../../const/method';



function* getListAllJobData(action) {

    yield put({ type: REDUX.ALL_JOB.SET_LOADING_ALL_JOB, loading: true });
    let res = yield call(getAllJobData, action);
    if (res) {
        let data = res.data;
        yield put({ type: REDUX.ALL_JOB.GET_ALL_JOB, data });
    }
    yield put({ type: REDUX.ALL_JOB.SET_LOADING_ALL_JOB, loading: false });

}

function getAllJobData(action) {
    let data: IJobSearchFilter = {
        employerID: null,
        excludedJobIDs: null,
        shuffle: true,
        jobNameIDs: null,
        jobType: null,
        jobShiftFilter: null,
        jobLocationFilter: null,
        jobPriorityFilter: null
    };
    let isAuthen = store.getState().AuthState.isAuthen;
    let res = _requestToServer(
        POST,
        data,
        (isAuthen ? JOBS + '/active/home' : FIND_JOB + '/home'),
        isAuthen ? CANDIDATE_HOST : PUBLIC_HOST, isAuthen ? authHeaders : noInfoHeader,
        {
            pageIndex: action.pageIndex ? action.pageIndex : 0,
            pageSize: 6
        },
        false
    );
    return res
}

export function* AllJobWatcher() {
    yield takeEvery(REDUX_SAGA.ALL_JOB.GET_ALL_JOB, getListAllJobData)
}