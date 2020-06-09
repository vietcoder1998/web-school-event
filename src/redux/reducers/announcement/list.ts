import { REDUX } from "../../../const/actions";

let initState = {
  listAnnoun: [],
};
export const AnnounList = (state = initState, action) => {
  switch (action.type) {
    case REDUX.ANNOUNCEMENTS.GET_LIST:
      return { ...state, listAnnoun: action.data };
    default:
      return state;
  }
};
