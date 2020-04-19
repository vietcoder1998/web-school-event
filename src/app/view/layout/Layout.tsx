import React from 'react';
import Header from './header/Header';
import Footer from './footer/Footer';
import Popup from './popup/Popup';
import BottomPhone from './bottom-phone/BottomPhone';
import SideBar from './side-bar/SideBar';

interface IProps {
    disableFooterData?: boolean;
    disableBottomPhone?: boolean;
    show_bar?: boolean;
    children?: any;
}

export default function Layout(props?: IProps)  {
    let {
        disableFooterData,
        disableBottomPhone,
        show_bar
    } = props;

    return (
        <div className='all-content'>
            <Popup />
            <BottomPhone disableBottomPhone={disableBottomPhone ? disableBottomPhone : false} />
            <SideBar />
            <Header show_bar={show_bar} />
            {props.children}
            <Footer disableFooterData={disableFooterData} />
        </div>
    );
}
