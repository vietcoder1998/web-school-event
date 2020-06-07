import { REDUX } from "../../../const/actions";

let initState = {
    id: "",
    admin: {},
    viewNumber: 0,
    modifyAdmin: {},
    announcementType: { id: 0, name: "", priority: 0 },
    hidden: false,
    imageUrl: "",
    content: "",
    averageRating: 0,
};

export const AnnouncementDetail = (state = initState, action) => {
    switch (action.type) {
        case REDUX.ANNOUNCEMENTS.GET_DETAIL:
            return {
                ...action.data,
            };

        default:
            return state;
    }
};
