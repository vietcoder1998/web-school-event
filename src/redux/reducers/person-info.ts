import { REDUX } from "../../const/actions";

let personal_data = {
    personalInfo: {},
    skills: [],
    educations: [],
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
                educations: action.educations,
                description: action.description,
                languageSkills: action.languageSkills,
                experiences: action.experiences,
                rating: action.rating,
            }

        default:
            return state;
    }
}