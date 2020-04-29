import { REDUX } from "../../const/actions";
let initMoreJob = {
    data: {
        totalItems: 0
    },
    loading: true
};

export const EmployerMoreJob = (state = initMoreJob, action) => {
    switch (action.type) {
        case REDUX.EMPLOYER_MORE_JOB.GET_EMPLOYER_MORE_JOB:
            return { ...state, data: action.data };
        case REDUX.EMPLOYER_MORE_JOB.SET_LOADING_MORE_JOB:
            return { ...state, loading: action.loading };
        default:
            return { ...state };
    }
}