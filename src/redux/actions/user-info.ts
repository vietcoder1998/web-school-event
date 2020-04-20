import { REDUX } from "../../const/actions";

export const getPersonInfo = (personalInfo, skills, schools, major, description, languageSkills, experiences, rating) => {
    return {
        type: REDUX.PERSON_DATA.PERSON_INFO,
        personalInfo,
        skills, 
        schools, 
        major,
        description,
        languageSkills,
        experiences,
        rating
    }
}