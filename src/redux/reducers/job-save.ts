import { REDUX } from "../../const/actions";

let initJobSave = {
    data: null,
    loading: true
}

export const GetJobSave = (state = initJobSave, action) => {
    switch (action.type) {
        case REDUX.SAVED_JOB.GET_SAVED_JOB:
            return { ...state, data: action.data }
        case REDUX.SAVED_JOB.SET_LOADING_SAVE_JOB:
            return { ...state, loading: action.loading }
        default:
            return state;
    }
}