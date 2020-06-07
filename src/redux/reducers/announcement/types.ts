import { REDUX } from "../../../const/actions";

let initState = {
  listType: [],
};
export const AnnounTypes = (state = initState, action) => {
  switch (action.type) {
    case REDUX.ANNOUNCEMENTS.GET_TYPES:
      return { ...state, listType: action.data };
    default:
      return state;
  }
};
