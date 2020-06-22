import qs from "query-string";
export function goBackWhenLogined(name) {
    let path = '/'
    console.log(window.location.pathname)
    if (window.location.pathname !== '/register' && window.location.pathname !== '/login') {
        path = window.location.pathname + window.location.search
        path = window.btoa(path)
        window.location.assign(`/${name}?path=${path}`);

    } else {
        if (window.location.search) {
            // path = window.location.search;
            let queryString = '/'
            path = qs.parse(window.location.search);
            var base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
            console.log(base64regex.test(path.path))
            if(!base64regex.test(path.path)){
                queryString = window.btoa(path.path)
                window.location.assign(`/${name}?path=${queryString}`);
            } else {
                window.location.assign(`/${name}${window.location.search}`);
            }

        } else {
            window.location.assign(`/${name}`);
        }
    }
}