import { REDUX } from "../../../const/actions"


let initEventStatus = {
    status: true,
    time: 0,
}

export const EventStatusReducer = (state = initEventStatus, action) => {
    switch (action.type) {
        case REDUX.EVENT.START:
            return { ...state, time: action.time, status: action.status };
        default:
            return { ...state };
    }
}