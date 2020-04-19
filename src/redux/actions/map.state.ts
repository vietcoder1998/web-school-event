import { REDUX } from "../../const/actions";

export const setMapState = (action) => {
    return {
        type: REDUX.MAP.SET_MAP_STATE,
        marker: action.marker, action: action.location
    }
}