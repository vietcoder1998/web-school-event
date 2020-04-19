import { REDUX } from "../../const/actions";

export const getPersonInfo = (personalInfo, skills, educations, description, languageSkills, experiences, rating) => {
    return {
        type: REDUX.PERSON_DATA.PERSON_INFO,
        personalInfo,
        skills, 
        educations, 
        description,
        languageSkills,
        experiences,
        rating
    }
}