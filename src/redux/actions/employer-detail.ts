import { REDUX } from "../../const/actions";

export const getEmployerDetail = (action) => {
    return {
        type: REDUX.EMPLOYER_DETAIL.GET_EMPLOYER_DETAIL, 
        data: action.data
    }
}