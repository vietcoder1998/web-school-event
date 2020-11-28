import { REDUX } from "../../const/actions";

export const getHobJob = (data) => {
    return {
        type: REDUX.HOT_JOB.GET_HOT_JOB,
        data
    }
}