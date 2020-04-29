import { REDUX } from "../../const/actions";

let initListHotJob = {
    data: {
        pageIndex: 0,
        pageSize: 0,
        totalItems: 0,
        items: [{}, {}, {}, {}, {}, {}],
    },
    loading: true
};

export const HotJobResult = (state = initListHotJob, action) => {
    switch (action.type) {
        case REDUX.HOT_JOB.GET_HOT_JOB:
            return { ...state, data: action.data };
        case REDUX.HOT_JOB.SET_LOADING_HOT_JOB:
            return { ...state, loading: action.loading };
        default:
            return { ...state };
    }
}
