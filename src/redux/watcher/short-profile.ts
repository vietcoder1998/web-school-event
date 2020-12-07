import { TYPE } from "./../../const/type";
import { PERSON_INFO_P } from "./../../services/api/private.api";
import { takeEvery, call } from "redux-saga/effects";
import { _get } from "../../services/base-api";
import { STUDENT_HOST } from "../../environment/development";
import { authHeaders } from "../../services/auth";
import { REDUX_SAGA } from "../../const/actions";
//@ts-ignore
import imageDefault from "../../assets/image/base-image.jpg";
import swal from "sweetalert";
// import clearStorage from "../../services/clear-storage";

function* getShortPersonInfo() {
  let res = yield call(getData);
  if (res && res.data) {
    let data = res.data;
    localStorage.setItem("name", data.firstName);
    localStorage.setItem(
      "avatarUrl",
      data.avatarUrl === null ? imageDefault : data.avatarUrl
    );
    localStorage.setItem("branchIDs", data.major.branch.id);
  }
}

function getData() {
  let data = _get(null, PERSON_INFO_P, STUDENT_HOST, authHeaders);
  return data;
}

// Watcher
export function* ShortProfileWatcher() {
  yield takeEvery(
    REDUX_SAGA.PERSON_INFO.GET_SHORT_PERSON_INFO,
    getShortPersonInfo
  );
}
