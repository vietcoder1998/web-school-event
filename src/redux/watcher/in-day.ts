import { IJobSearchFilter } from '../../models/job-search';
import { takeEvery, put, call } from 'redux-saga/effects';
import { _requestToServer } from '../../services/exec';
import { FIND_JOB } from '../../services/api/public.api';
import { PUBLIC_HOST, CANDIDATE_HOST } from '../../environment/development';
import { noInfoHeader, authHeaders } from '../../services/auth';
import { store } from '../store';
import { JOBS } from '../../services/api/private.api';
import { REDUX_SAGA, REDUX } from '../../const/actions'
import { POST } from '../../const/method';

function* getListInDayData(action) {
    let res = yield call(getInDayData, action);
    if (res) {
        let data = res.data;
        yield put({ type: REDUX.IN_DAY.GET_IN_DAY_JOB, data });
    }
};

function getInDayData(action) {
    let data: IJobSearchFilter = {
        employerID: null,
        excludedJobIDs: null,
        shuffle: true,
        jobNameIDs: null,
        jobType: null,
        jobShiftFilter: null,
        jobLocationFilter: null,
        jobPriorityFilter: {
            homePriority: "IN_DAY"
        }
    };
    let isAuthen = store.getState().AuthState.isAuthen;
    let res = _requestToServer(
        POST,
        data,
        (isAuthen ? JOBS + '/active/home' : FIND_JOB + '/home'),
        isAuthen ? CANDIDATE_HOST : PUBLIC_HOST, isAuthen ? authHeaders : noInfoHeader,
        {
            pageIndex: action.pageIndex ? action.pageIndex : 0,
            pageSize: 6,
            priority: 'IN_DAY'
        },
        false
    );

    return res
};

export function* InDayWatcher() {
    yield takeEvery(REDUX_SAGA.IN_DAY.GET_IN_DAY_JOB, getListInDayData)
};