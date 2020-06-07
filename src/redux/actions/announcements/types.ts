import { REDUX } from "../../../const/actions";

export const getListAnnounTypes = (data, action) => ({
  type: REDUX.ANNOUNCEMENTS.GET_TYPES,
  data,
});
