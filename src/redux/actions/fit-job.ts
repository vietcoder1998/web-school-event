import { REDUX } from "../../const/actions";

export const getFitJob = (data) => {
    return {
        type: REDUX.FIT_JOB.GET_FIT_JOB,
        data
    }
}