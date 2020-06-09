import React from 'react';
import './TabSearch.scss';
import SearchBox from './searchbox/SearchBox';

// @ts-ignore
import IMG2 from '../../../../assets/image/crs2.jpg';
import { Carousel } from 'antd';

function TabSearch(props) {
    let scaleWidth = '100%'
    if(window.innerWidth < 425) {
        scaleWidth = '190%'
    } else if(window.innerWidth <= 776) {
        scaleWidth = '150%'
    }
    return (
        <div className='tab-search '>
            <Carousel style={{ position: 'static', }} dots={true} autoplay>
                {/* <div style={{height: '550px'}}>
                    <img src={IMG1} style={{ width: '100%', backgroundSize: 'cover' }} alt={'job-title1'} />
                </div> */}
                <div style={{height: '550px'}}>
                    <img src={IMG2} className="img-background" style={{ backgroundSize: 'cover', width: scaleWidth }} alt={'job-title1'} />
                </div >
                {/* <div style={{height: '550px'}}>
                    <img src={IMG3} style={{ width: '100%', backgroundSize: 'cover' }} alt={'job-title1'} />
                </div> */}
            </Carousel>
            {/* <img src={ImgBackground} alt='' className='img-background' /> */}
            <div className='search-content'>
                <div className='search-body'>
                    <SearchBox {...props} />
                </div>
            </div>
        </div >
    );
}

export default TabSearch;