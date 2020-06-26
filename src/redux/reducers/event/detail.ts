
import { REDUX } from "../../../const/actions";
import logo from '../../../assets/image/logo-02.png';
let initListDetailEvent = {
    data: {},
    start: false,
    loading: true,
    logo: null,
    primaryColor: '#1890ff',
    primaryDarkColor: '#296ea7',
    param: '',
    schoolID: '',
    eventID: ''
};


export const DetailEvent = (state = initListDetailEvent, action) => {
    switch (action.type) {
        case REDUX.EVENT.DETAIL:
            return { ...state, data: action.data };
        case REDUX.EVENT.START:
            return { ...state, start: action.start }
        case REDUX.EVENT.LOGO_SCHOOL:
                return { ...state, 
                    logo: action.logo ? action.logo : logo,
                    primaryColor: action.primaryColor ? action.primaryColor : '#1890ff',
                    primaryDarkColor: action.primaryDarkColor ? action.primaryDarkColor : '#296ea7',
                    param: action.param,
                    schoolID: action.schoolID,
                    eventID: action.eventID
                }
        case REDUX.EVENT.SET_EVENT_ID: 
                return {
                    ...state,
                    eventID: action.eventID
                }
        default:
            return { ...state };
    }
};
