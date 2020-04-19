import { REDUX } from "../../const/actions";

export const getJobSave = (data) => {
    return {
        type: REDUX.SAVED_JOB.GET_SAVED_JOB,
        data
    }
}