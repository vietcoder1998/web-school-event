import { REDUX } from "../../const/actions";

let initAuth = {
    isAuthen: false,
}

export const AuthState = (state = initAuth, action) => {
    switch (action.type) {
        case REDUX.AUTHEN.EXACT_AUTHEN:
            return { ...state, isAuthen: true }

        case REDUX.AUTHEN.FAIL_AUTHEN:
            return { ...state, isAuthen: false };
        default:
            return state;
    }
}