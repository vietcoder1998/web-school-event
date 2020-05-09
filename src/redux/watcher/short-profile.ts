import { SHORT_PROFILE } from "./../../services/api/private.api";

import { takeEvery, call } from "redux-saga/effects";
import { _get } from "../../services/base-api";
import { STUDENT_HOST } from "../../environment/development";
import { authHeaders } from "../../services/auth";
import { REDUX_SAGA } from "../../const/actions";
import imageDefault from "../../assets/image/base-image.jpg";
function* getShortPersonInfo() {
  let res = yield call(getData);
  let data = res.data;
  localStorage.setItem("name", data.firstName);
  localStorage.setItem(
    "avatarUrl",
    data.avatarUrl === null ? imageDefault : data.avatarUrl
  );
}

function getData() {
  let data = _get(null, SHORT_PROFILE, STUDENT_HOST, authHeaders);
  return data;
}

// Watcher
export function* ShortProfileWatcher() {
  yield takeEvery(REDUX_SAGA.PERSON_INFO.GET_SHORT_PERSON_INFO, getShortPersonInfo);
}
