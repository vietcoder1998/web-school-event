import { ANNOUNCEMENTS } from './../../../services/api/public.api';
import { POST } from '../../../const/method';
import { takeEvery, put, call, } from 'redux-saga/effects';
import { _requestToServer } from '../../../services/exec';
import { REDUX_SAGA, REDUX } from '../../../const/actions'
import { PUBLIC_HOST } from '../../../environment/development';

function* getListAnnouncementsData(action: any) {
    let res = yield call(callAnnouncements, action);
    let data = {
        items: [],
        pageIndex: 0,
        pageSize: 10,
        totalItems: 0,
    };
    if (res) {
        data = res.data.items
    };
    yield put({
        type: REDUX.ANNOUNCEMENTS.GET_ANNOUNCEMENTS,
        data
    });
}

function callAnnouncements(action: any) {
    let body = {
        adminID: null,
        hidden: null,
        createdDate: null,
        announcementTypeID: null
    }
    if (action.body) {
        body = action.body;
    }
    let res = _requestToServer(
        POST,
        body,
        ANNOUNCEMENTS.LIST + `?pageIndex=${action.pageIndex}&pageSize=${action.pageSize}`,
        PUBLIC_HOST,
        {
            pageIndex: action.pageIndex ? action.pageIndex : 0,
            pageSize: action.pageSize ? action.pageSize : 10
        },
        false
    )
    return res
}


export function* AnnouncementsWatcher() {
    yield takeEvery(
        REDUX_SAGA.ANNOUNCEMENTS.GET_LIST,
        getListAnnouncementsData
    )
}
