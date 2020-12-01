import swal from "sweetalert";
import { TYPE } from './../const/type';

export default function     clearStorage() {
    localStorage.clear();
    swal({
        title: "Workvns thông báo",
        text: "Bạn đã đăng xuất khỏi Worksvn",
        icon: TYPE.SUCCESS,
        dangerMode: false,
    })
}