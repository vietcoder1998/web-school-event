import { takeEvery, put, call } from 'redux-saga/effects';
import { _get } from '../../services/base-api';
import { fullProfile } from '../../services/api/private.api';
import { CANDIDATE_HOST } from '../../environment/development';
import { authHeaders } from '../../services/auth';
import { REDUX_SAGA, REDUX } from '../../const/actions'

function* getPersonInfo() {
    let res = yield call(getData);
    let data = res.data
    let personalInfo = {
        firstName: '',
        lastName: '',
        status: '',
        birthday: 0,
        gender: '',
        address: '',
        email: '',
        phone: '',
        identityCard: '',
        avatarUrl: '',
        coverUrl: '',
        name: '',
        lat: '',
        lon: '',
        lookingForJob: false
    };

    const d = new Date();
    const n = d.getTime();
    let param = n;
    // description
    let description = data.description;
    //personalInfo
    personalInfo.avatarUrl = data.avatarUrl + `?param=${param}`;
    personalInfo.phone = data.phone;
    personalInfo.email = data.email;
    personalInfo.firstName = data.firstName;
    personalInfo.lastName = data.lastName;
    personalInfo.gender = data.gender;
    personalInfo.address = data.address;
    personalInfo.identityCard = data.identityCard;
    personalInfo.birthday = data.birthday;
    personalInfo.lat = data.lat;
    personalInfo.lon = data.lon;
    personalInfo.coverUrl = data.coverUrl;
    personalInfo.lookingForJob = data.lookingForJob;
    localStorage.setItem("name", data.firstName);
    localStorage.setItem("avatarUrl", personalInfo.avatarUrl);
    // skills
    let skills = data.skills;
    // education
    let educations = data.educations;
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
        educations,
        description,
        experiences,
        languageSkills,
        rating
    });
}

function getData() {
    let data = _get(null, fullProfile, CANDIDATE_HOST, authHeaders);
    return data;
}

// Watcher
export function* PersonInfoWatcher() {
    yield takeEvery(REDUX_SAGA.PERSON_INFO.GET_PERSON_INFO, getPersonInfo);
}   