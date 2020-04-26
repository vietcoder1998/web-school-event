import { GET, POST, PUT, DELETE } from '../const/method';
import { _delete, _get, _post, _put } from './base-api';
import { exceptionShowNoti } from '../config/exception';
import swal from 'sweetalert';
import { TYPE } from '../const/type';

export const _requestToServer = async (
    method: string,
    data?: any,
    api?: string,
    host?: string,
    headers?: any,
    params?: any,
    show_alert?: boolean
) => {
    let res;

    try {
        switch (method) {
            case GET:
                res = await _get(params, api, host, headers);
                break;
            case POST:
                res = await _post(data, api, host, headers, params);
                if (show_alert) {
                    swal({
                        title: "Workvns thông báo",
                        text: `${res.msg}`,
                        icon: TYPE.SUCCESS,
                        dangerMode: false,
                    }
                    )
                };
                break;
            case PUT:
                res = await _put(data, api, host, headers, params);
                if (show_alert) {
                    swal({
                        title: "Workvns thông báo",
                        text: `Cập nhập ${res.msg}`,
                        icon: TYPE.SUCCESS,
                        dangerMode: false,
                    });
                }
                return res;
            case DELETE:
                res = await _delete(data, api, host, headers, params);
                break;
            default:
                break;
        };

        if (show_alert && res) {
            // console.log(res)
            swal({
                title: "Workvns thông báo",
                text: res.msg,
                icon: TYPE.SUCCESS,
                dangerMode: false,
            });
        };
    } catch (err) {
        // exceptionShowNoti(err); // dont delete
    }

    return res;
}