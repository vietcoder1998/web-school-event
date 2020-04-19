import { REDUX } from "../../const/actions";

let initJobSave = {}

export const GetJobSave = (state = initJobSave, action) => {
    switch (action.type) {
        case REDUX.SAVED_JOB.GET_SAVED_JOB:
            return {...action.data}
    
        default:
            return state;
    }
}