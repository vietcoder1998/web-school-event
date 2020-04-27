import { REDUX } from "../../const/actions";

export const getTopEventJob = (data) => {
    return {
        type: REDUX.EVENT_JOB.TOP_JOB,
        data
    }
}

export const getEventJob = (data) => {
    return {
        type: REDUX.EVENT_JOB.SEARCH_JOB,
        data
    }
}