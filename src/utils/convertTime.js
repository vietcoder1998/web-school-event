import * as moment from 'moment';

export const timeConverter = (dateRaw) => {
   var date = new Date(dateRaw);
    return (date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear())
}