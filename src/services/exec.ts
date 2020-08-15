import { GET, POST, PUT, DELETE } from "../const/method";
import { _delete, _get, _post, _put } from "./base-api";
// import { exceptionShowNoti } from "../config/exception";
import swal from "sweetalert";
import { TYPE } from "../const/type";
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
      // swal({
      //   title: "Worksvns thông báo",
      //   text: res.msg,
      //   icon: TYPE.SUCCESS,
      //   dangerMode: false,
      // });

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
            // window.open('https://mail.google.com/mail/u/0/')
            window.location.assign(`/login${window.location.search}`);
          }
        }
      })
    }
    if (log_query) {
      // console.log(host + api);
      // console.log(params);
      // console.log(data);
      // console.log(res);
    }
  } catch (err) {
    // console.log(err.response.data);

    // exceptionShowNoti(err, hide_alert_error);
    if (err && err && err.response && err.response.data && !hide_alert_error) {
      let msg = err.response.data.msg;
      if (err.response.data.code === 40927 && message_success) {
        msg = `${err.response.data.msg}. Vui lòng đăng nhập!`
      }
      swal({
          title: "Worksvn thông báo",
          text: msg,
          icon: TYPE.ERROR,
          dangerMode: true,
      }).then(() => {
        if ((err.response.data.code === 40927) && message_success) {
          window.location.assign('/login');
        }
      })
  }
  }

  return res;
};
