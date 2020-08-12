// import { EVENT_PUBLIC } from './../../../../services/api/public.api';
// import { EVENT_PRIVATE } from './../../../../services/api/private.api';
import { takeEvery, call, put} from 'redux-saga/effects';
import { _requestToServer } from '../../../../services/exec';
import { PUBLIC_HOST, STUDENT_HOST } from '../../../../environment/development';
import { noInfoHeader, authHeaders } from '../../../../services/auth';
import { store } from '../../../store/index';
import { REDUX_SAGA, REDUX } from '../../../../const/actions'
import { GET } from '../../../../const/method';
import qs from "query-string";

function* getEventJobDetailData(action) {
    let res = yield call(getJobDetail, action);
    if (res.data) {
        let data = res.data
        yield put({ type: REDUX.EVENT.JOB.DETAIL, data });
    }
}

// get JobDetailData
function getJobDetail(action) {
    let isAuthen = store.getState().AuthState.isAuthen;
    let queryParam = qs.parse(action.eventAndSchoolID);
    //@ts-ignore
    let data = window.atob(queryParam.data)
    let queryParam2 = qs.parse(data)
    let eventID = queryParam2.eventID;
    let schoolID = queryParam2.schoolID
    // console.log(eventID)
    let res = _requestToServer(
        GET,
        null,
        (isAuthen ? `/api/students/schools/events/${eventID}/jobs/${action.jobID}/active` :`/api/schools/${schoolID}/events/${eventID}/jobs/${action.jobID}/active` ),
        isAuthen ? STUDENT_HOST : PUBLIC_HOST, isAuthen ? authHeaders : noInfoHeader,
        false, false, true
    )

    return res;
}

export function* EventJobDetailWatcher() {
    yield takeEvery(REDUX_SAGA.EVENT.JOB.DETAIL, getEventJobDetailData);
}