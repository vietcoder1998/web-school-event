import { GET } from "./../../../const/method";
import { _requestToServer } from "./../../../services/exec";
import { _get } from "./../../../services/base-api";
import { ANNOUNCEMENTS } from "./../../../services/api/public.api";
import { takeEvery, put, call } from "redux-saga/effects";
import { REDUX_SAGA, REDUX } from "../../../const/actions";
import { PUBLIC_HOST } from "../../../environment/development";

function* getListAnnouTypesData(action: any) {
  let res = yield call(callAnnouTypes, action);
  let data = {
    items: [],
    pageSize: 0,
    pageIndex: 0,
    totalItems: 0,
  };
  if (res) {
    data = res.data.items;
  }
  console.log(data)
  yield put({
    type: REDUX.ANNOUNCEMENTS.GET_TYPES,
    data,
  });
}

function callAnnouTypes(action) {
  let res = _requestToServer(
    GET,
    null,
    ANNOUNCEMENTS.TYPE,
    PUBLIC_HOST,
    {
      pageIndex: action.pageIndex ? action.pageIndex : 0,
      pageSize: 50,
      priority: "",
    },
    false
  );
  return res;
}

export function* AnnouTypesWatcher() {
  yield takeEvery(REDUX_SAGA.ANNOUNCEMENTS.GET_TYPES, getListAnnouTypesData);
}
