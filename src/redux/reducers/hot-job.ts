import { REDUX } from "../../const/actions";

let initListHotJob = {
    data: {
        pageIndex: 0,
        pageSize: 0,
        totalItems: 0,
        items: [],
    },
};

export const HotJobResult = (state = initListHotJob, action) => {
    switch (action.type) {
        case REDUX.HOT_JOB.GET_HOT_JOB:
            return { ...state, data: action.data };
        default:
            return { ...state };
    }
}
