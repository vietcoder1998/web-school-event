import { REDUX } from "../../const/actions";

export const getEventHobJob = (data) => {
    return {
        type: REDUX.EVENT.JOB.HOT,
        data
    }
}

export const getEventInDayJob = (data) => {
    return{
        type: REDUX.EVENT.JOB.IN_DAY,
        data
    }
}

