import { IRegions } from './../../models/regions';
import { REDUX } from "../../const/actions";

export const getJobGroups = (data?: IRegions) => {
    return {
        type: REDUX.REGIONS.GET_REGIONS,
        data
    }
}