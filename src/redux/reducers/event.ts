import { REDUX } from "../../const/actions";

let initListEventHotJob = {
    data: {
        pageIndex: 0,
        pageSize: 0,
        totalItems: 0,
        items: [{}, {}, {}, {}, {}, {}],
    },
    loading: true
};

let initListEventInDayJob = {
    data: {
        pageIndex: 0,
        pageSize: 0,
        totalItems: 0,
        items: [{}, {}, {}, {}, {}, {}],
    },
    loading: true
};

export const EventInDayJobs = (state = initListEventInDayJob, action) => {
    switch (action.type) {
        case REDUX.EVENT.JOB.IN_DAY:
            return { ...state, data: action.data };
        default:
            return { ...state };
    }
}


export const EventHotJobs = (state = initListEventHotJob, action) => {
    switch (action.type) {
        case REDUX.EVENT.JOB.HOT:
            return { ...state, data: action.data };
        case REDUX.EVENT.JOB.HOT_LOADING:
            return { ...state, loading: action.loading };
        default:
            return { ...state };
    }
}

