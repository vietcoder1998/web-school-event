import { REDUX } from "../../const/actions";

let initListFitJob = {
    data: {
        pageIndex: 0,
        pageSize: 0,
        totalItems: 0,
        items: [{}],
    },
    loading: true
};

export const FitJob = (state = initListFitJob, action) => {
    switch (action.type) {
        case REDUX.FIT_JOB.GET_FIT_JOB:
            return { ...state, data: action.data };
        case REDUX.FIT_JOB.SET_LOADING_FIT_JOB:
            return { ...state, loading: action.loading };
        default:
            return { ...state };
    }
}
