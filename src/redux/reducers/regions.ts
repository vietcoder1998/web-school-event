import { REDUX } from "../../const/actions";

let data = {
    pageIndex: 0,
    pageSize: 0,
    totalItems: 0,
    items: [],
};

export const Regions = (state = data, action) => {
    switch (action.type) {
        case REDUX.REGIONS.GET_REGIONS:
            return { ...action.data };
        default:
            return state;
    }
}
