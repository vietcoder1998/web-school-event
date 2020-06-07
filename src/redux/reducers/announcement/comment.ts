import { REDUX } from "../../../const/actions";

let initState = {
  items: [],
  pageIndex: 0,
  pageSize: 0,
  totalItems: 0,
};

export const AnnouComments = (state = initState, action: any) => {
  switch (action.type) {
    case REDUX.ANNOUNCEMENTS.GET_COMMENT:
      return {
        ...action.data,
      };

    default:
      return state;
  }
};
