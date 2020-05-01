import React, { PureComponent } from 'react';
import { Carousel } from 'antd';
import { connect } from 'react-redux';
import defaultImage from '../../../../assets/image/base-image.jpg'
import { REDUX_SAGA } from '../../../../const/actions';
import './Banner.scss';
interface IProps {
    getTopEmpoyer?: Function,
    listEmployer?: any,
}
interface IState {
    list_job_top: Array<any>,
    pageIndex: number,
    pageSize: number,
    is_loading: boolean,
}

class Banner extends PureComponent<IProps, IState> {
    constructor(props) {
        super(props);
        this.state = {
            list_job_top: [

            ],
            pageIndex: 0,
            pageSize: 9,
            is_loading: true
        };
    }

    componentDidMount = async () => {
        await this.setState({ is_loading: false })
        await this.props.getTopEmpoyer(0);
    }

    render() {
        let { listEmployer } = this.props;
        return (
            <div className='employer-banner' style={{ display: listEmployer.totalItems === 0 ? 'none' : '' }}>
                <Carousel autoplay>
                    {listEmployer && listEmployer.items ? listEmployer.items.map((item, index) => (
                        <img src={item.bannerUrl === null ? defaultImage : item.bannerUrl} key={index} alt='banner' className='image-banner' />
                    )) : null}
                </Carousel>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    listEmployer: state.BannerEmployer.data
})

const mapDispatchToProps = dispatch => ({
    getTopEmpoyer: (pageIndex?: number, pageSize?: number) => dispatch({ type: REDUX_SAGA.EVENT.EMPLOYER.BANNER, pageIndex, pageSize }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Banner);