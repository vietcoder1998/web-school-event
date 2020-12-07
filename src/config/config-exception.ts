// import { _requestToServer } from './../services/exec';
import Swal from 'sweetalert2';

export const exceptionShowNotiConfig = async (err: any, hidden_alert_err?:boolean) => {
    if (err && err && err.response && err.response.data) {
        let res = err.response.data;
        let code = res.code.toString();
        console.log(code);
        if (code.includes("401")) {
            console.log("ok");
            tkNotInvalid();
        } else {
            Swal.fire({
                titleText: 'Worksvn thông báo',
                icon: 'error',
                onClose: () => {
                    localStorage.clear();
                    window.location.assign('/');
                },
                text: "Có lỗi xảy ra",
                timer: 5000
            })
        }
    } else Swal.fire({ text: `${"máy chủ gặp vấn đề hoặc kiểm tra lại kết nối của bạn"} (code=${500})`, titleText: "Worksvn thông báo" })
}

function tkNotInvalid() {
    Swal.fire({
        titleText: 'Phiên đăng nhập đã hết hạn',
        icon: 'warning',
        onClose: () => {
            localStorage.clear();
            window.location.assign('/');
        },
        timer: 5000
    })
}
