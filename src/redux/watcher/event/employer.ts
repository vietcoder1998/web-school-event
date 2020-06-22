import { EVENT_PUBLIC } from './../../../services/api/public.api';
import { EVENT_PRIVATE } from './../../../services/api/private.api';

import { takeEvery, put, call } from 'redux-saga/effects';
import { _requestToServer } from '../../../services/exec';

import { PUBLIC_HOST, STUDENT_HOST } from '../../../environment/development';
import { noInfoHeader, authHeaders } from '../../../services/auth';
import { store } from '../../store';
import { REDUX_SAGA, REDUX } from '../../../const/actions'
import { POST } from '../../../const/method';
import IEmployerSearchFliter from '../../../models/empoyer';



function* getListTopEmployer(action) {
    let res = yield call(getTopEmployer, action);
    if (res) {
        let data = res.data;
        yield put({ type: REDUX.EVENT.EMPLOYER.TOP, data });
    }
}

function getTopEmployer(action) {
    let data: IEmployerSearchFliter = {
        bannerPriority: null,
        priority: 'TOP',
        createDate: 0,
        shuffle: true
    };
    let isAuthen = store.getState().AuthState.isAuthen;
    let eventID = store.getState().DetailEvent.eventID;
    let schoolID = store.getState().DetailEvent.schoolID
    let res = _requestToServer(
        POST,
        data,
        (isAuthen ? `/api/students/schools/events/${eventID}/employers/query` : `/api/schools/${schoolID}/events/${eventID}/employers/query`),
        isAuthen ? STUDENT_HOST : PUBLIC_HOST, isAuthen ? authHeaders : noInfoHeader,
        {
            pageIndex: action.pageIndex ? action.pageIndex : 0,
            pageSize: 50
        },
        false
    );
    return res
}
export function* EventTopEmployerWatcher() {
    yield takeEvery(REDUX_SAGA.EVENT.EMPLOYER.TOP, getListTopEmployer)
}



function* getListBannerEmployer(action) {
    let res = yield call(getBannerEmployer, action);
    if (res) {
        let data = res.data;
        yield put({ type: REDUX.EVENT.EMPLOYER.BANNER, data });
    }
}

function getBannerEmployer(action) {
    let data: IEmployerSearchFliter = {
        bannerPriority: 'TOP',
        priority: null,
        createDate: 0,
        shuffle: true
    };
    let isAuthen = store.getState().AuthState.isAuthen;
    let eventID = store.getState().DetailEvent.eventID;
    let schoolID = store.getState().DetailEvent.schoolID
    let res = _requestToServer(
        POST,
        data,
        (isAuthen ? `/api/students/schools/events/${eventID}/employers/query` : `/api/schools/${schoolID}/events/${eventID}/employers/query`),
        isAuthen ? STUDENT_HOST : PUBLIC_HOST, isAuthen ? authHeaders : noInfoHeader,
        {
            pageIndex: action.pageIndex ? action.pageIndex : 0,
            pageSize: 50,
            priority: 'TOP'
        },
        false
    );
    return res
}
export function* EventBannerEmployerWatcher() {
    yield takeEvery(REDUX_SAGA.EVENT.EMPLOYER.BANNER, getListBannerEmployer)
}





