import { REDUX } from "../../const/actions";
import IEmployers from "../../models/employers";

export const getTopEmployer = (data?: IEmployers) => {
    return {
        type: REDUX.EMPLOYER.GET_TOP_EM,
        data
    }
}

export const getSchoolEventEmployer = (data?: IEmployers) => {
    return {
        type: REDUX.EMPLOYER.GET_SCHOOL_EVENT_EM,
        data
    }
}

