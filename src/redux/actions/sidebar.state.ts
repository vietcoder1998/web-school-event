import { REDUX } from "../../const/actions";

export const openSideBar = () => {
    return { type: REDUX.SIDE_BAR.OPEN_SIDE_BAR }
}
export const closeSideBar = () => {
    return { type: REDUX.SIDE_BAR.CLOSE_SIDE_BAR }
}