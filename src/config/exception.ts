import swal from "sweetalert";
import { TYPE } from './../const/type';

export const exceptionShowNoti = async (err: any) => {
    // console.log(err);
    if (err && err && err.response && err.response.data) {
        let msg = err.response.data.msg;
        swal({
            title: "Workvns thông báo",
            text: msg,
            icon: TYPE.ERROR,
            dangerMode: true,
        });
    }
}