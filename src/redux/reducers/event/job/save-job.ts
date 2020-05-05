import { REDUX } from "../../../../const/actions";

let initJobSave = {
  data: null,
};

export const GetEventJobSave = (state = initJobSave, action) => {
  switch (action.type) {
    case REDUX.EVENT.JOB.SAVE:
      return { ...state, data: action.data };
    default:
      return state;
  }
};
