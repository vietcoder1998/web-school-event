import { REDUX } from './../../const/actions';
export const getHighLightJob = (data) => {
    return {
        type: REDUX.IN_DAY.GET_IN_DAY_JOB,
        data
    }
}