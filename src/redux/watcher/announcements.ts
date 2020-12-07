import { ANNOUNCEMENTS } from './../../services/api/public.api';
import { noInfoHeader } from './../../services/auth';
import { IAnnouncements } from '../../models/announcements.interface';
import { POST } from '../../const/method';
import { takeEvery, put, call, } from 'redux-saga/effects';
import { _requestToServer } from '../../services/exec';
import { REDUX_SAGA, REDUX } from '../../const/actions'
import { PUBLIC_HOST } from '../../environment/development';

function* getListAnnouncementsData(action: any) {
    let res = yield call(callAnnouncements, action);

    let data: IAnnouncements = {
        items: [],
        pageIndex: 0,
        pageSize: 10,
        totalItems: 0,
    };
   
    if (res) {
        data = res.data
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
        ANNOUNCEMENTS.LIST,
        PUBLIC_HOST,
        noInfoHeader,
        {
            pageIndex: action.pageIndex ? action.pageIndex : 0,
            pageSize: action.pageSize ? action.pageSize : 10
        },
        false,
    )
    return res
}

export function* AnnouncementsWatcher() {
    yield takeEvery(
        REDUX_SAGA.ANNOUNCEMENTS.GET_ANNOUNCEMENTS,
        getListAnnouncementsData
    )
}