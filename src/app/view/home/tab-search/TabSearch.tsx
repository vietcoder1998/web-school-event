import React from 'react';
import './TabSearch.scss';
import SearchBox from './searchbox/SearchBox';

// @ts-ignore
import IMG1 from '../../../../assets/image/crs1.jpg';
// @ts-ignore
import IMG2 from '../../../../assets/image/crs2.jpg';
// @ts-ignore
import IMG3 from '../../../../assets/image/crs3.jpg';
import { Carousel } from 'antd';

function TabSearch(props) {
    return (
        <div className='tab-search '>
            <Carousel style={{ position: 'static', }} dots={true} autoplay>
                <div >
                    <img src={IMG1} style={{ width: '100%', height: '550px' }} alt={'job-title1'} />
                </div>
                <div >
                    <img src={IMG2} style={{ width: '100%', height: '550px' }} alt={'job-title1'} />
                </div >
                <div >
                    <img src={IMG3} style={{ width: '100%', height: '550px' }} alt={'job-title1'} />
                </div>
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