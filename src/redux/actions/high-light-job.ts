import { REDUX } from './../../const/actions';
export const getHighLightJob = (data) => {
    return {
        type: REDUX.HIGH_LIGHT.GET_HIGH_LIGHT_JOB,
        data
    }
}