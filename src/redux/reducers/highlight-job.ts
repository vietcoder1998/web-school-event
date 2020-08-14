import { REDUX } from "../../const/actions";

let initListHotJob = {
    data: {
        pageIndex: 0,
        pageSize: 0,
        totalItems: 0,
        items: [{}, {}, {}, {}, {}, {}],
    },
    loadingHlData: true,
};

export const HighLightResult = (state = initListHotJob, action) => {
    switch (action.type) {
        case REDUX.HIGH_LIGHT.GET_HIGH_LIGHT_JOB:
            return { ...state, data: action.data };
        case REDUX.HIGH_LIGHT.SET_LOADING_HIGH_LIGHT_JOB:
            return { ...state, loadingHlData: action.loadingHlData};
        default:
            return { ...state };
    }
}
