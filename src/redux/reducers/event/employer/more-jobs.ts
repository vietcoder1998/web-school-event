import { REDUX } from "../../../../const/actions";
let initMoreJob = {
    data: {
        totalItems: 0
    },
    loading: true
};

export const EventEmployerMoreJob = (state = initMoreJob, action) => {
    switch (action.type) {
        case REDUX.EVENT.EMPLOYER.MORE_JOB:
            return { ...state, data: action.data };
        default:
            return { ...state };
    }
}