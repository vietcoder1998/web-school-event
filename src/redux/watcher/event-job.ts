import { IJobSearchFilter } from './../../models/job-search';
import { takeEvery, put, call } from 'redux-saga/effects';
import { _requestToServer } from '../../services/exec';
import { FIND_JOB } from '../../services/api/public.api';
import { PUBLIC_HOST, STUDENTS_HOST } from '../../environment/development';
import { noInfoHeader, authHeaders } from '../../services/auth';
import { store } from '../store';
import { JOBS } from '../../services/api/private.api';
import { REDUX_SAGA, REDUX } from '../../const/actions'
import { POST } from '../../const/method';



function* getListHotJobData(action) {
    let res = yield call(getHotJobData, action);
    if (res) {
        let data = res.data;
        yield put({ type: REDUX.HOT_JOB.GET_HOT_JOB, data });
    }
}

function getHotJobData(action) {
    let data: IJobSearchFilter = {
        employerID: null,
        excludedJobIDs: null,
        shuffle: true,
        jobNameIDs: null,
        jobType: null,
        jobShiftFilter: null,
        jobLocationFilter: null,
        jobPriorityFilter: {
            homePriority: 'TOP'
        }
    };
    let isAuthen = store.getState().AuthState.isAuthen;
    let res = _requestToServer(
        POST,
        data,
        (isAuthen ? JOBS.NORMAL.ACTIVE : FIND_JOB),
        isAuthen ? STUDENTS_HOST : PUBLIC_HOST, isAuthen ? authHeaders : noInfoHeader,
        {
            pageIndex: action.pageIndex ? action.pageIndex : 0,
            pageSize: 6
        },
        false
    );

    return res
}

export function* HotJobWatcher() {
    yield takeEvery(REDUX_SAGA.HOT_JOB.GET_HOT_JOB, getListHotJobData)
}