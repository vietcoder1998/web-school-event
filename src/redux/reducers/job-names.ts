import { REDUX } from "../../const/actions";

let data = {
    pageIndex: 0,
    pageSize: 0,
    totalItems: 0,
    items: [],
};

export const JobNames = (state = data, action) => {
    switch (action.type) {
        case REDUX.JOB_NAMES.GET_JOB_NAMES:
            return { ...action.data };
        default:
            return state;
    }
}
