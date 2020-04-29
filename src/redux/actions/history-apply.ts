import { REDUX } from "../../const/actions";

export const getHistoryApply = (data) => {
    return {
        type: REDUX.HISTORY_APPLY.GET_HISTORY_APPLY,
        data
    }
}