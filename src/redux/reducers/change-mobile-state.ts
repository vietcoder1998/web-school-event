import { REDUX } from "../../const/actions";

let initMobileState = {
    isMobile: false
};

export const MobileState = (state = initMobileState, action) => {
    switch (action.type) {
        case REDUX.MOBILE_STATE.SET_MOBILE_STATE:
            return {
                ...state,
                isMobile: action.state
            }

        default:
            return state;
    }
}