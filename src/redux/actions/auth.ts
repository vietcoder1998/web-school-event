import { REDUX } from "../../const/actions";

export const exactAuthenticate = () => {
    return {
        type: REDUX.AUTHEN.EXACT_AUTHEN,
    };
}

export const failAuthenticate = () => {
    return {
        type: REDUX.AUTHEN.FAIL_AUTHEN,
    }
}