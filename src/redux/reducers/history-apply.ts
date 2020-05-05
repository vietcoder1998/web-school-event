import { REDUX } from "../../const/actions";

let initJobSave = {
    data: null,
    loading: true
}

export const GetHistoryApply = (state = initJobSave, action) => {
    switch (action.type) {
        case REDUX.HISTORY_APPLY.GET_HISTORY_APPLY:
            return { ...state, data: action.data }
        case REDUX.HISTORY_APPLY.SET_LOADING_HISTORY_APPLY:
            return { ...state, loading: action.loading }
        default:
            return { ...state };
    }
}