import { IJobSearchFilter } from './../../models/job-search';
import { takeEvery, put, call } from 'redux-saga/effects';
import { _requestToServer } from '../../services/exec';
import { FIND_JOB } from '../../services/api/public.api';
import { PUBLIC_HOST, STUDENT_HOST } from '../../environment/development';
import { noInfoHeader, authHeaders } from '../../services/auth';
import { store } from '../store';
import { JOBS } from '../../services/api/private.api';
import { REDUX_SAGA, REDUX } from '../../const/actions'
import { POST } from '../../const/method';

function* getListFitJobData(action) {
    yield put({ type: REDUX.FIT_JOB.SET_LOADING_FIT_JOB, loading: true });
    let res = yield call(getFitJobData, action);
    if (res) {
        let data = res.data;
        yield put({ type: REDUX.FIT_JOB.GET_FIT_JOB, data });
    }
    yield put({ type: REDUX.FIT_JOB.SET_LOADING_FIT_JOB, loading: false });
}

function getFitJobData(action) {
    let data: IJobSearchFilter = {
        employerID: null,
        excludedJobIDs: null,
        shuffle: true,
        jobNameIDs: null,
        jobType: null,
        jobShiftFilter: null,
        jobLocationFilter: null,
        jobPriorityFilter: null,
        branchIDs: action.branchIDs?action.branchIDs:[]
    };
    let isAuthen = store.getState().AuthState.isAuthen;
    let res = _requestToServer(
        POST,
        data,
        (isAuthen ? JOBS + '/active/home' : FIND_JOB + '/home'),
        isAuthen ? STUDENT_HOST : PUBLIC_HOST, isAuthen ? authHeaders : noInfoHeader,
        {
            pageIndex: action.pageIndex ? action.pageIndex : 0,
            pageSize: action.pageSize ? action.pageSize : 12,
            priority: 'TOP'
        },
        false
    );
    return res;
}

export function* FitJobWatcher() {
    yield takeEvery(REDUX_SAGA.FIT_JOB.GET_FIT_JOB, getListFitJobData)
}