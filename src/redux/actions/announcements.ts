import { REDUX } from '../../const/actions';
import { IAnnouncements } from './../../models/announcements.interface';

export const getListAnnouncements = (data?: IAnnouncements) => ({
    type: REDUX.ANNOUNCEMENTS.GET_ANNOUNCEMENTS, 
    data
});