import { REDUX } from "../../const/actions";

export const getEmployerMoreJob = (data) => {
    return {
        type: REDUX.EMPLOYER_DETAIL.GET_EMPLOYER_DETAIL,
        data
    }
}