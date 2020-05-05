import { REDUX } from "../../const/actions";

export const getSimilarJob = (data) => {
    return {
        type: REDUX.SIMILAR_JOB.GET_SIMILAR_JOB,
        data
    }
}