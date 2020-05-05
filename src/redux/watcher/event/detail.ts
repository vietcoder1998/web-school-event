import { EVENT_PRIVATE } from './../../../services/api/private.api';
import { EVENT_PUBLIC } from './../../../services/api/public.api';
import { takeEvery, put, call } from 'redux-saga/effects';
import { _requestToServer } from '../../../services/exec';
import { PUBLIC_HOST, STUDENT_HOST } from '../../../environment/development';
import { REDUX_SAGA, REDUX } from '../../../const/actions'
import { _get } from '../../../services/base-api';
import { store } from '../../store';


function* getDetailEvent(action) {
    let res = yield call(getDetailEventData, action);
    console.log(res)
    if (res) {
        let data = res.data;
        yield put({ type: REDUX.EVENT.DETAIL, data });
    }
}


function getDetailEventData(action) {
    let isAuthen = store.getState().AuthState.isAuthen;

    let res = _get(null,
        isAuthen ? EVENT_PRIVATE.DETAIL : EVENT_PUBLIC.DETAIL,
        isAuthen ? STUDENT_HOST : PUBLIC_HOST,
        null);

    return res
}



export function* EventDetail() {
    yield takeEvery(REDUX_SAGA.EVENT.DETAIL, getDetailEvent)
}