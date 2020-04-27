import { REDUX } from "../../const/actions";

let initListHotJob = {
    data: {
        pageIndex: 0,
        pageSize: 0,
        totalItems: 0,
        items: [],
    },
};

export const EventTopJobReducer = (state = initListHotJob, action) => {
    switch (action.type) {
        case REDUX.EVENT_JOB.TOP_JOB:
            return { ...state, data: action.data };
        default:
            return { ...state };
    }
}

export const EventJobReducer = (state = initListHotJob, action) => {
    switch (action.type) {
        case REDUX.EVENT_JOB.SEARCH_JOB:
            return { ...state, data: action.data };
        default:
            return { ...state };
    }
}
