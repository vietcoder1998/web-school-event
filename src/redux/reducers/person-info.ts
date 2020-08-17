import { REDUX } from "../../const/actions";

let personal_data = {
    personalInfo: {},
    skills: [],
    educations: [],
    description: "",
    languageSkills: [],
    experiences: [],
    rating: {},
    major: {},
};


let short_personal_data = {
    name: "",
    id: "",
    avatar: "",
}

export const ShortPersonalInfo = (state = short_personal_data, action): any => {
    switch (action.type) {
        case REDUX.PERSON_INFO.GET_SHORT_PERSON_INFO:
            return {
                ...state,
                name: action.name,
                id: action.id,
                avatar: action.avatar,
            }
        default:
            return state;
    }
}
export const FullPersonalInfo = (state = personal_data, action): any => {
    switch (action.type) {
        case REDUX.PERSON_INFO.GET_FULL_PERSON_INFO:
            return {
                ...state,
                personalInfo: action.personalInfo,
                skills: action.skills,
                educations: action.educations,
                description: action.description,
                languageSkills: action.languageSkills,
                experiences: action.experiences,
                rating: action.rating,
                major: action.major,
                tools: action.tools,
            }
        default:
            return state;
    }
}