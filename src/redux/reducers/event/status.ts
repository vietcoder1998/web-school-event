import { REDUX } from "../../../const/actions"


let initEventStatus = {
    status: true
}

export const EventStatusReducer = (state = initEventStatus, action) => {
    switch (action.type) {
        case REDUX.EVENT.START:
            return { ...state, status: action.status };
        default:
            return { ...state };
    }
}