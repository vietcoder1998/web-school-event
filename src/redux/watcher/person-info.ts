import { takeEvery, put, call } from "redux-saga/effects";
import { _get } from "../../services/base-api";
import { full_profile } from "../../services/api/private/profile";
import { STUDENTS_HOST } from "../../environment/development";
import { authHeaders } from "../../services/auth";
import { REDUX_SAGA, REDUX } from "../../const/actions";

import imageDefault from "../../assets/image/base-image.jpg";

function* getPersonInfo() {
  let res = yield call(getData);
    
  let data = res.data;
  let personalInfo = {
    id: "",
    firstName: "",
    lastName: "",
    birthday: "",
    avatarUrl: "",
    gender: "",
    email: "",
    phone: "",
    region: "",
    address: "",
    lat: "",
    lon: "",
    profileVerified: false,
    isLookingForJob: false,
    completePercent: 0,
    unlock: true,
    saved: true,
    schoolYearStart: 0,
    schoolYearEnd: 0,
    studentCode: "",
    createdDate: "",
    coverUrl: "",
    description: "",
    identityCard: "",
    identityCardFrontImageUrl: "",
    identityCardBackImageUrl: "",
  };
  console.log(data)
  //personalInfo
  personalInfo.avatarUrl = data.avatarUrl;
  personalInfo.phone = data.phone;
  personalInfo.email = data.email;
  personalInfo.firstName = data.firstName;
  personalInfo.lastName = data.lastName;
  personalInfo.gender = data.gender;
  personalInfo.address = data.address === null ? "Chưa cập nhật" : data.address;
  personalInfo.identityCard =
    data.identityCard === null ? "Chưa cập nhật" : data.identityCard;
  personalInfo.identityCardBackImageUrl =
    data.identityCardBackImageUrl === null
      ? imageDefault
      : data.identityCardBackImageUrl;
  personalInfo.identityCardFrontImageUrl =
    data.identityCardFrontImageUrl === null
      ? imageDefault
      : data.identityCardFrontImageUrl;
  personalInfo.birthday = data.birthday;
  personalInfo.lat = data.lat;
  personalInfo.lon = data.lon;
  personalInfo.coverUrl = data.coverUrl;
  personalInfo.isLookingForJob = data.lookingForJob;
  personalInfo.completePercent = data.completePercent;

  personalInfo.schoolYearStart = data.schoolYearStart;
  personalInfo.schoolYearEnd = data.schoolYearEnd;
  personalInfo.studentCode = data.studentCode === null ? "Chưa cập nhật" : data.studentCode;
  personalInfo.createdDate = data.createdDate;
  localStorage.setItem("name", data.firstName);
  localStorage.setItem("avatarUrl", personalInfo.avatarUrl);
  // description
  let description = data.description;
  // skills
  let skills = data.skills;
  // education

  let schools = data.school;
  let major = data.major;

  // experiences
  let experiences = data.experiences;
  // languageSkills
  let languageSkills = [];
  languageSkills = data.languageSkills;
  let rating = data.rating;

  yield put({
    type: REDUX.PERSON_INFO.GET_PERSON_INFO,
    personalInfo,
    skills,
    schools,
    major,
    description,
    experiences,
    languageSkills,
    rating,
  });
}

function getData() {
  let data = _get(null, full_profile, STUDENTS_HOST, authHeaders);
  return data;
}

// Watcher
export function* PersonInfoWatcher() {
  yield takeEvery(REDUX_SAGA.PERSON_INFO.GET_PERSON_INFO, getPersonInfo);
}
