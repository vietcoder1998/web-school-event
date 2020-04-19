import { REDUX } from "../../const/actions";

let initNoti = {}

export const Noti = (state= initNoti, action) => {
    switch (action.type) {
        case REDUX.NOTI.GET_NOTI:
            return {...action.data }
    
        default:
            return state;
    }
}