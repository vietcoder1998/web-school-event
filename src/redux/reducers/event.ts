import { REDUX } from "../../const/actions";

let initListEventHotJob = {
  data: {
    pageIndex: 0,
    pageSize: 0,
    totalItems: 0,
    items: [{}, {}, {}, {}, {}, {}],
  },
  loading: true,
};

let initListEventJob = {
  data: {
    pageIndex: 0,
    pageSize: 0,
    totalItems: 0,
    items: [{}, {}, {}, {}, {}, {}],
  },
  loading: true,
};

export const EventJobResults = (state = initListEventJob, action) => {
  switch (action.type) {
    case REDUX.EVENT.JOB.NORMAL:
      return { ...state, data: action.data };
    default:
      return { ...state, data: action.data };
  }
};
export const EventHotJobResult = (state = initListEventHotJob, action) => {
  switch (action.type) {
    case REDUX.EVENT.JOB.HOT:
      return { ...state, data: action.data };
    case REDUX.EVENT.JOB.HOT_LOADING:
      return { ...state, loading: action.loading };
    default:
      return { ...state };
  }
};
