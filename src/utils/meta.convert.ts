import seo from "../seo.meta.json";

export interface IMeta {

}

export default function MetaConvert (): IMeta {
    const pathname = window.location.pathname.split('/');
    if (seo) {
        let meta = pathname[1];
        if (meta ==="") {
            meta = "home";
        }

        let metart = seo[meta];
        metart.canonical = window.location.href;
        return seo[meta];
    }
}