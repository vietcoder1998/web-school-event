import swal from "sweetalert";
import { TYPE } from './../const/type';

export const exceptionShowNoti = async (err: any, hide_alert_error: any) => {
    // console.log(err);
    if (err && err && err.response && err.response.data && !hide_alert_error) {
        let msg = err.response.data.msg;
        swal({
            title: "Worksvn thông báo",
            text: msg,
            icon: TYPE.ERROR,
            dangerMode: true,
        });
    }
}