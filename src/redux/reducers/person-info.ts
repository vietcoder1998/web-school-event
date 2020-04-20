import { REDUX } from "../../const/actions";

let personal_data = {
    personalInfo: {},
    skills: [],
    schools: [],
    major: [],
    description: "",
    languageSkills: [],
    experiences: [],
    rating: {}
};

export const PersonalInfo = (state = personal_data, action): any => {
    switch (action.type) {
        case REDUX.PERSON_INFO.GET_PERSON_INFO:
            return {
                ...state,
                personalInfo: action.personalInfo,
                skills: action.skills,
                schools: action.schools,
                major: action.major,
                description: action.description,
                languageSkills: action.languageSkills,
                experiences: action.experiences,
                rating: action.rating,
            }

        default:
            return state;
    }
}