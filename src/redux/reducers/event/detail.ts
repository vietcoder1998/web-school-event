
import { REDUX } from "../../../const/actions";

let initListDetailEvent = {
    data: {},
    start: false,
    loading: true,
};


export const DetailEvent = (state = initListDetailEvent, action) => {
    switch (action.type) {
        case REDUX.EVENT.DETAIL:
            return { ...state, data: action.data };
        case REDUX.EVENT.START:
            return { ...state, start: action.start }
        default:
            return { ...state };
    }
};
