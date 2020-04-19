import { IJobNames } from './../../models/job-names';
import { REDUX } from "../../const/actions";

export const getJobName = (data?: IJobNames) => {
    return {
        type: REDUX.JOB_NAMES.GET_JOB_NAMES,
        data
    }
}