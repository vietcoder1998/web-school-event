// import { IMajors } from './../../models/job-names';
import { REDUX } from "../../const/actions";

export const getMajor = (data?: any) => {
    return {
        type: REDUX.MAJOR.GET_MAJOR,
        data
    }
}