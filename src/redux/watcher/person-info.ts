
import { takeEvery, put, call } from 'redux-saga/effects';
import { _get } from '../../services/base-api';
import { FULL_PROFILE } from '../../services/api/private.api';
import { STUDENT_HOST } from '../../environment/development';
import { authHeaders } from '../../services/auth';
import { REDUX_SAGA, REDUX } from '../../const/actions'
//@ts-ignore
import imageDefault from "../../assets/image/base-image.jpg";
function* getFullPersonInfo(action: any) {
    if (localStorage.getItem("actk_w_s") && localStorage.getItem("user_exists")==="true"){
        let res = yield call(getData);
        let data = res.data
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
            cvUrl: "",
            tools: []
        };
        personalInfo.avatarUrl = data.avatarUrl;
        personalInfo.phone = data.phone;
        personalInfo.email = data.email;
        personalInfo.firstName = data.firstName;
        personalInfo.lastName = data.lastName;
        personalInfo.gender = data.gender;
        personalInfo.address = data.address;
        personalInfo.identityCard = data.identityCard;
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
        personalInfo.studentCode = data.studentCode;
        personalInfo.createdDate = data.createdDate;
        personalInfo.cvUrl = data.cvUrl;
        if(data.cvUrl && action.setActiveKeyCV) {
            action.setActiveKeyCV()
        }
        if(!data.cvUrl && action.setActiveKeyCV2) {
            action.setActiveKeyCV2()
        }
        personalInfo.tools =  data.workingTools;
        // description
        let description = data.description;
        // skills
        let skills = data.skills;
        // education
        let educations = data.school;
        let major = data.major;
    
        // experiences
        let experiences = data.experiences;
        // languageSkills
        let languageSkills = [];
        languageSkills = data.languageSkills;
        let rating = data.rating;
        let tools = data.workingTools;
    
        if (data && data.cvUrl) {
            localStorage.setItem("cvUrl", data.cvUrl);
        }
    }
}

function getData() {
    if (localStorage.getItem("actk_w_s") && localStorage.getItem("user_exists")==="true"){
        let data = _get(null, FULL_PROFILE, STUDENT_HOST, authHeaders);
        return data;
    }
}

// Watcher
export function* PersonInfoWatcher() {
    yield takeEvery(REDUX_SAGA.PERSON_INFO.GET_FULL_PERSON_INFO, getFullPersonInfo);
}   


