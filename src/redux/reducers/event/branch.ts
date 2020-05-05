
import { REDUX } from "../../../const/actions";

let initListEventBranch = {
  data: {
    pageIndex: 0,
    pageSize: 0,
    totalItems: 0,
    items: [],
  },
  loading: true,
};


export const EventBranch = (state = initListEventBranch, action) => {
  switch (action.type) {
    case REDUX.EVENT.JOB.BRANCH:
      return { ...state, data: action.data };
    default:
      return { ...state};
  }
};
