import { REDUX } from "../../const/actions";

export const getJobResult = (data) => {
    return {
        type: REDUX.JOB_RESULT.GET_JOB_RESULT,
        data
    }
}