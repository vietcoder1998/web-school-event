import { REDUX } from "../../const/actions";

let initState: Object = {
    data: {
        pageIndex: 0,
        pageSize: 0,
        totalItems: 0,
        items: [],
    },
    loading: true
};

export const TopEmployer = (state = initState, action) => {
    console.log(action.data)
    switch (action.type) {
        case REDUX.EMPLOYER.GET_TOP_EM:
            return { ...state, data: action.data, loading: false };
        default:
            return state;
    }
}
