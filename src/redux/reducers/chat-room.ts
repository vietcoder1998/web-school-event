import { REDUX } from "../../const/actions";

var initRoomSelect = {};

export const ChatRoom = (state = initRoomSelect, action) => {
    switch (action.type) {
        case REDUX.CHAT_ROOM.SET_CHAT_ROOM:
            return {
                ...state,
                roomSelect: action.roomSelect
            }
    
        default:
            return state;
    }
}