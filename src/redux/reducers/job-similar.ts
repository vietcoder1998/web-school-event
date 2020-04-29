
import { REDUX } from "../../const/actions";

let initJobSave = {
    data: null,
    loading: true,
    totalItems: 0
}

export const SimilarJob = (state = initJobSave, action) => {
    switch (action.type) {
        case REDUX.SIMILAR_JOB.GET_SIMILAR_JOB:
            return { ...state, data: action.data, totalItems: action.totalItems }
        case REDUX.SIMILAR_JOB.SET_LOADING_SIMILAR_JOB:
            return { ...state, loading: action.loading }
        default:
            return { ...state };
    }
}