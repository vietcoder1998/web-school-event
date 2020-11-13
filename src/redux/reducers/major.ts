import { REDUX } from "../../const/actions";

let data = {
    pageIndex: 0,
    pageSize: 0,
    totalItems: 0,
    items: [],
};

export const Majors = (state = data, action) => {
    switch (action.type) {
        case REDUX.MAJOR.GET_MAJOR:
            return { ...action.data };
        default:
            return state;
    }
}
