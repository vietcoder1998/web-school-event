import { REDUX } from "../../const/actions";

let initState = { show: false }

export const SideBarState = (state = initState, action) => {
    switch (action.type) {
        case REDUX.SIDE_BAR.OPEN_SIDE_BAR:
            return { show: true };
        case REDUX.SIDE_BAR.CLOSE_SIDE_BAR:
            return {show: false }

        default:
            return state;
    }

}