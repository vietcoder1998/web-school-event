
import { takeEvery, put, call } from 'redux-saga/effects';
// import { _requestToServer } from '../../../services/exec';
import { PUBLIC_HOST, STUDENT_HOST } from '../../../environment/development';
import { REDUX_SAGA, REDUX } from '../../../const/actions'
import { _get } from '../../../services/base-api';
import { store } from '../../store';


function* getDetailEvent(action) {
    let res = yield call(getDetailEventData, action);
    if (res) {
        let data = res.data;
        yield put({ type: REDUX.EVENT.DETAIL, data });
    }
}


function getDetailEventData(action) {
    let isAuthen = store.getState().AuthState.isAuthen;
    let eventID = store.getState().DetailEvent.eventID;
    let schoolID = store.getState().DetailEvent.schoolID
    let res = _get(null,
        isAuthen ? `/api/students/schools/events/${eventID}/employers/{emid}` : `/api/schools/${schoolID}/events/${eventID}`,
        isAuthen ? STUDENT_HOST : PUBLIC_HOST,
        null);

    return res
}



export function* EventDetail() {
    yield takeEvery(REDUX_SAGA.EVENT.DETAIL, getDetailEvent)
}