import React, { Component } from 'react';
import { IMG1 } from '../../../assets/image/carouselGroup/carousel1.jpg';
import { IMG2 } from '../../../assets/image/carouselGroup/carousel2.jpg';


class CarouselUX extends Component {
    render() {
        return (
            <div className='carousel-controller'>
                <div className='carousel-content'>
                    <div className='image active'>
                        <h3>1</h3>
                        <image src={IMG1} alt='Ảnh 1' />
                    </div>
                    <div className='image active'>
                        <h3>2</h3>
                        <image src={IMG2} alt='Ảnh 1' />
                    </div >
                    <div className='image active'>
                        <h3>3</h3>
                    </div>
                    <div className='image active'>
                        <h3>4</h3>
                    </div>
                </div>
            </div>
        );
    }
}

export default CarouselUX;
