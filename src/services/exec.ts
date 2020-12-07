import { GET, POST, PUT, DELETE } from "../const/method";
import { _delete, _get, _post, _put } from "./base-api";
// import { exceptionShowNoti } from "../config/exception";
import swal from "sweetalert";
import { TYPE } from "../const/type";
import { exceptionShowNotiConfig } from "../config/config-exception";
// import { PUBLIC_HOST } from "../environment/development";

export const _requestToServer = async (
  method: string,
  data?: any,
  api?: string,
  host?: string,
  headers?: any,
  params?: any,
  show_alert?: boolean,
  log_query?: boolean,
  hide_alert_error?: boolean,
  message_success?: string
) => {
  let res;
  // if (!host) {
  //   host = PUBLIC_HOST
  // }
  try {
    switch (method) {
      case GET:
        res = await _get(params, api, host, headers);
        break;
      case POST:
        res = await _post(data, api, host, headers, params);
        break;
      case PUT:
        res = await _put(data, api, host, headers, params);
        if (show_alert) {
          swal({
            title: "Worksvn thông báo",
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
    }

    if (show_alert && res) {
      let msg = res.msg
      if (res.code === 200 && message_success) {
        msg = message_success
      }
      swal({
        title: "Worksvn Thông Báo",
        text: msg,
        icon: TYPE.SUCCESS,
        dangerMode: false,
      }).then(() => {
        if ((res.code === 200 || res.code === 40927) && message_success) {
          if(message_success === `Hoàn tất thông tin thành công!`) {
            window.location.assign(`/${window.location.search}`);
          } else {
            window.location.assign(`/login${window.location.search}`);
          }
        }
      })
    }
  } catch (err) {
    exceptionShowNotiConfig(err);
  }
  return res;
};
