import { REDUX } from "../../const/actions";

let initEmployerDetail = null

export const EmployerDetail = (state = initEmployerDetail, action) => {
    switch (action.type) {
        case REDUX.EMPLOYER_DETAIL.GET_EMPLOYER_DETAIL:
            return { ...action.data}
    
        default:
            return {...state}
    }
}