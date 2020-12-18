// import { _requestToServer } from './../services/exec';
import Swal from 'sweetalert2';

export const exceptionShowNotiConfig = async (err: any, hidden_alert_err?:boolean, disabled_routing?:boolean) => {
    if (err && err && err.response && err.response.data) {
        let res = err.response.data;
        let code = res.code.toString();
        console.log(code);
        if (code.includes("401")) {
            tkNotInvalid();
        } else {
            if (!disabled_routing){
                Swal.fire({
                    titleText: 'Worksvn thông báo',
                    icon: 'error',
                    onClose: () => {
                        localStorage.clear();
                        window.location.assign('/');
                    },
                    text: err.response.data.msg,
                    timer: 7000
                }).then(()=> {

                })
            } else
            Swal.fire({
                titleText: 'Worksvn thông báo',
                icon: 'error',
                text:res.msg,
                timer: 7000
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
        timer: 7000
    })
}
