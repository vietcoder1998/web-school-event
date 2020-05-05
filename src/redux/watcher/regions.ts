import { GET } from '../../const/method';
import { LIST_REGIONS } from '../../services/api/public.api';
import { takeEvery, put, call } from 'redux-saga/effects';
import { _requestToServer } from '../../services/exec';
import { PUBLIC_HOST } from '../../environment/development';
import { noInfoHeader } from '../../services/auth';
import { REDUX_SAGA, REDUX } from '../../const/actions'

function* getListRegionData(action) {
    let res = yield call(getRegionData, action);

    if (res) {
        let data = res.data;
        console.log(data)
        yield put({ type: REDUX.REGIONS.GET_REGIONS, data });
    }
}

function getRegionData(action) {
    let res = _requestToServer(
        GET,
        undefined,
        LIST_REGIONS,
        PUBLIC_HOST,
        noInfoHeader,
        {
            pageIndex: action.pageIndex ? action.pageIndex : 0,
            pageSize: action.pageSize ? action.pageSize : 0,
            name: action.name ? action.name : null
        },
        false
    );

    return res;
}

export function* RegionWatcher() {
    yield takeEvery(REDUX_SAGA.REGIONS.GET_REGIONS, getListRegionData)
}