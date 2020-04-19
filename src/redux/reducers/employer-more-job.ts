import { REDUX } from "../../const/actions";
let initMoreJob = {};

export const EmployerMoreJob = (state = initMoreJob, action) => {
    switch (action.type) {
        case REDUX.EMPLOYER_MORE_JOB.GET_EMPLOYER_MORE_JOB:
            return { ...action.data };

        default:
            return { ...state };
    }
}