import { EVENT_PUBLIC } from './../../../../services/api/public.api';
import { POST } from '../.././../../const/method';
import { call, takeEvery, put } from 'redux-saga/effects';
import { PUBLIC_HOST } from '../../../../environment/development';
import { noInfoHeader } from '../../../../services/auth';
import { FIND_JOB } from '../../../../services/api/public.api';
import { store } from '../../../store/index';
import { REDUX, REDUX_SAGA } from '../.././../../const/actions';
import { _requestToServer } from '../../../../services/exec';

function* getEmployerMoreJob(action) {
    let res = yield call(getEmployerMoreJobData, action);
    if (res) {
        let data = res.data;
      
        yield put({ type: REDUX.EVENT.EMPLOYER.MORE_JOB, data });
    }
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
        EVENT_PUBLIC.JOBS.ACTIVE,
        PUBLIC_HOST,
        noInfoHeader,
        {
            pageIndex: action.pageIndex ? action.pageIndex : 0,
            pageSize: 6
        }
    );

    return res;
}

export function* EventEmployerMoreJobWatcher() {
    yield takeEvery(REDUX_SAGA.EVENT.EMPLOYER.MORE_JOB, getEmployerMoreJob);
}