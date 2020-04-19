import { REDUX } from "../../const/actions";

let initJobDetail = null;

export const GetJobDetail = (state = initJobDetail, action) => {
    switch (action.type) {
        case REDUX.JOB_DETAIL.GET_JOB_DETAIL:
            return { ...action.data }
        default:
            return { ...state }
    }
}