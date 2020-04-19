import { REDUX } from "../../const/actions";

let data = {
    result: {
        pageIndex: 0,
        pageSize: 0,
        totalItems: 0,
        items: [],
    },
};

export const JobResult = (state = data, action) => {
    switch (action.type) {
        case REDUX.JOB_RESULT.GET_JOB_RESULT:
            return { ...state, result: action.data };
        default:
            return { ...state };
    }
}
