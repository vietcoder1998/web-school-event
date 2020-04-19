import { REDUX } from "../../const/actions";

export const getJobDetail = (data) => {
    return {
        type: REDUX.JOB_DETAIL.GET_JOB_DETAIL,
        data
    }
}
