import seo from "../seo.meta.json";

export interface IMeta {

}

export default function MetaConvert(){
    const pathname = window.location.pathname.split('/');
    if (seo) {
        let meta = pathname[1];
        if (meta ==="") {
            meta = "home";
        }

        if (seo[meta]) {
           let metart = seo[meta];
            metart.canonical = window.location.href;
            return seo[meta]; 
        } else return null;
    }
}