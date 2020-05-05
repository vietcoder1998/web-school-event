import { REDUX } from "../../const/actions";

export const getHobJob = (data) => {
    return {
        type: REDUX.EVENT.JOB.HOT,
        data
    }
}
