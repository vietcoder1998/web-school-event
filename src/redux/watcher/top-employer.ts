import { TOP_EMPLOYER } from './../../services/api/public.api';
import { takeEvery, put, call } from 'redux-saga/effects';
import { _requestToServer } from '../../services/exec';
import { PUBLIC_HOST } from '../../environment/development';
import { noInfoHeader } from '../../services/auth';
import { REDUX_SAGA, REDUX } from '../../const/actions'
import { POST } from '../../const/method';


function* getListTopEmployersData(action) {
    let res = yield call(getTopEmployersData, action);
    if (res) {
        let data = res.data;
        console.log(data)
        yield put({ type: REDUX.EMPLOYER.GET_TOP_EM, data });
    }
}

function getTopEmployersData(action) {
    let body = {
        logoPriority: null,
        bannerPriority: null,
        createdDate: null,
        shuffle: true
    }

    let res = _requestToServer(
        POST,
        body,
        TOP_EMPLOYER,
        PUBLIC_HOST,
        noInfoHeader,
        {
            pageIndex: action.pageIndex ? action.pageIndex : 0,
            pageSize: action.pageIndex ? action.pageSize : 4,
        },
        false
    );

    return res;
}

export function* TopEmployersWatcher() {
    yield takeEvery(REDUX_SAGA.EMPLOYER.GET_TOP_EM, getListTopEmployersData)
}