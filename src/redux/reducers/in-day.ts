import { REDUX } from "../../const/actions";

let initListInDay = {
    data: {
        pageIndex: 0,
        pageSize: 0,
        totalItems: 0,
        items: [],
    },
};

export const InDayResult = (state = initListInDay, action) => {
    switch (action.type) {
        case REDUX.IN_DAY.GET_IN_DAY_JOB:
            return { ...state, data: action.data };
        default:
            return { ...state };
    }
}
