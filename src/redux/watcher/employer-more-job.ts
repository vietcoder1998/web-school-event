import { POST } from './../../const/method';
import { call, takeEvery, put } from 'redux-saga/effects';
import { PUBLIC_HOST } from '../../environment/development';
import { noInfoHeader } from '../../services/auth';
import { FIND_JOB } from '../../services/api/public.api';
import { store } from '../store/index';
import { REDUX, REDUX_SAGA } from './../../const/actions';
import { _requestToServer } from '../../services/exec';

function* getEmployerMoreJob(action) {
    yield put({ type: REDUX.EMPLOYER_MORE_JOB.SET_LOADING_MORE_JOB, loading: true });
    let res = yield call(getEmployerMoreJobData, action);

    if (res) {
        let data = res.data;
        yield put({ type: REDUX.EMPLOYER_MORE_JOB.GET_EMPLOYER_MORE_JOB, data });
    }
    yield put({ type: REDUX.EMPLOYER_MORE_JOB.SET_LOADING_MORE_JOB, loading: false });

}

// get EmployerData
function getEmployerMoreJobData(action) {
    // let 
    let employerID;
    if(action.id){
        employerID = action.id;
    } else {
        employerID = store.getState().GetJobDetail.employerID;
    }


    let body = {
        employerID,
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

export function* EmployerMoreJobWatcher() {
    yield takeEvery(REDUX_SAGA.EMPLOYER_MORE_JOB.GET_EMPLOYER_MORE_JOB, getEmployerMoreJob);
}