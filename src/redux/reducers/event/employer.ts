
import { REDUX } from "../../../const/actions";

let initListTopEmployer = {
  data: {
    pageIndex: 0,
    pageSize: 0,
    totalItems: 0,
    items: [],
  },
  loading: true,
};

let initListBannerEmployer = {
  data: {
    pageIndex: 0,
    pageSize: 0,
    totalItems: 0,
    items: [],
  },
  loading: true,
};

export const BannerEmployer = (state = initListBannerEmployer, action) => {
  switch (action.type) {
    case REDUX.EVENT.EMPLOYER.BANNER:
      return { ...state, data: action.data };
    default:
      return { ...state};
  }
};
export const TopEmployer = (state = initListTopEmployer, action) => {
  switch (action.type) {
    case REDUX.EVENT.EMPLOYER.TOP:
      return { ...state, data: action.data };
    default:
      return { ...state };
  }
};
