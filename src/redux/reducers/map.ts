import { REDUX } from "../../const/actions";

let initMapState = {
    marker: { lat: 21.033028, lng: 105.803357 },
    location: null
};

export const MapState = (state = initMapState, action) => {
    switch (action.key) {
        case REDUX.MAP.SET_MAP_STATE:
            return { marker: action.marker, location: action.location }
        default:
            return {...state};
    }
}