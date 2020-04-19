import { REDUX } from "../../const/actions";
export const setMobileState = (state) => {
    return {
        type: REDUX.MOBILE_STATE.SET_MOBILE_STATE,
        state,
    }
}