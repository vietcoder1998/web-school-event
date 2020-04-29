import { REDUX } from "../../const/actions";

let initListAllJob = {
    data: {
        pageIndex: 0,
        pageSize: 0,
        totalItems: 0,
        items: [{}, {}, {}, {}, {}, {}],
    },
    loading: true
};

export const AllJobResult = (state = initListAllJob, action) => {
    switch (action.type) {
        case REDUX.ALL_JOB.GET_ALL_JOB:
            return { ...state, data: action.data };
        case REDUX.ALL_JOB.SET_LOADING_ALL_JOB:
            return { ...state, loading: action.loading };
        default:
            return { ...state };
    }
}
