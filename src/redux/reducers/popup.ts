import { REDUX } from "../../const/actions";

let initState = {
    data: {
        show: false,
    },
}

export const PopupState = (state = initState, action) => {
    switch (action.type) {
        case REDUX.POPUP.OPEN_POPUP:
            return { ...state, is_show: true, data: action.data };
        case REDUX.POPUP.CLOSE_POPUP:
            return { ...state, is_show: false};
        default:
            return state;
    }
}