import { REDUX } from "../../../const/actions";

let initEventStatus = {
  haveEvent: true,
  status: true,
  time: 0,
  msgError: "",
  name: "",
  schoolID: "",
  schoolName: "",
};

export const EventStatusReducer = (state = initEventStatus, action) => {
  switch (action.type) {
    case REDUX.EVENT.START:
      return {
        ...state,
        haveEvent: true,
        time: action.time,
        status: action.status,
        name: action.name,
      };
    case REDUX.EVENT.NOT_AVAILABLE:
      return {
        ...state,
        status: false,
        haveEvent: false,
        msgError: action.msgError,
      };
    default:
      return { ...state };
  }
};
