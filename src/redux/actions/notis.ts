import { REDUX } from "../../const/actions";

export const getNoti = (data) => {
    return {
        type: REDUX.NOTI.GET_NOTI,
        data
    }
}