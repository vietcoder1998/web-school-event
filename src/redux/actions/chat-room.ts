import { REDUX } from "../../const/actions";

export const setChatRoom = (roomSelect) => {
    return {
        type: REDUX.CHAT_ROOM.SET_CHAT_ROOM,
        roomSelect
    }
}