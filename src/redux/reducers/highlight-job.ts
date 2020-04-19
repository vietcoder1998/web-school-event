import { REDUX } from "../../const/actions";

let initListHotJob = {
    data: {
        pageIndex: 0,
        pageSize: 0,
        totalItems: 0,
        items: [],
    },
};

export const HighLightResult = (state = initListHotJob, action) => {
    switch (action.type) {
        case REDUX.HIGH_LIGHT.GET_HIGH_LIGHT_JOB:
            return { ...action.data };
        default:
            return { ...state };
    }
}
