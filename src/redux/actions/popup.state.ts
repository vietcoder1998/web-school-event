import { REDUX } from "../../const/actions";

export function openPopup(data) {
    return {
        type: REDUX.POPUP.OPEN_POPUP,
        data
    }
}

export function closePopup(data) {
    return {
        type:  REDUX.POPUP.CLOSE_POPUP,
        data
    }
}