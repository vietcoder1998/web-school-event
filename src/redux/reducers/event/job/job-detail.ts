import { REDUX } from "../../../../const/actions";

let initJobDetail = null;

export const GetEventJobDetail = (state = initJobDetail, action) => {
    switch (action.type) {
        case REDUX.EVENT.JOB.DETAIL:
            return { ...action.data }
        default:
            return { ...state }
    }
}