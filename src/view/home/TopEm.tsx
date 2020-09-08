import React, { PureComponent } from 'react';
import { Col, Row, Skeleton } from 'antd';
import { connect } from 'react-redux';
import { IAppState } from '../../redux/store/reducer';
import { REDUX_SAGA } from '../../const/actions';
import { ITopEmDetail } from '../../models/employer-detail';
// import LinkToolTip from '../layout/common/LinkToolTip';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

interface IProps {
    getTopEmployer?: Function;
    totalItems?: number;
    loading?: boolean;
    topEm: Array<ITopEmDetail>
}
interface IState {
    pageIndex: number,
    pageSize: number,
}

class TopEm extends PureComponent<IProps, IState> {
    componentDidMount = async () => {
        this.props.getTopEmployer(null, 0, 8);
    }

    render() {
        var settings = {
            // dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000
        };
        let { topEm, totalItems, loading } = this.props;
        if (topEm && totalItems > 0) {
            return (
                <div className='top-job'>
                    <h5 className="a_c">DOANH NGHIỆP NỔI BẬT </h5>
                    <Row style={{ padding: '0 3vw' }}>
                       
                            <Col xl={0} xxl={2} children={"ok"} style={{ color: "rgba(0, 0, 0, 0)" }} />
                            <Slider {...settings}>
                            {
                                topEm.map((item: ITopEmDetail, i: number) => (
                                    <Col
                                        key={i}
                                        xs={11}
                                        sm={11}
                                        md={6}
                                        lg={6}
                                        xl={6}
                                        xxl={5}
                                        style={{ overflow: 'hidden' }}
                                    >
                                        <a href={`/employer/${btoa(item.employerID)}`}>
                                            {loading ?
                                                <Skeleton loading={loading} avatar paragraph={{ rows: 1 }} /> :
                                                (

                                                    <div className='top-em-detail'>
                                                        <img
                                                            src={item.employerLogoUrl}
                                                            alt={item.employerName}
                                                            width="100%"
                                                            height="210vh"
                                                            style={{objectFit: 'contain'}}
                                                        />

                                                    </div>
                                            )}

                                    </a>

                                    </Col>
                                ))
                            }
                        </Slider>
                    </Row>

                </div>
            );
        } else return null

    }
}

const mapStateToProps = (state: IAppState) => ({
    topEm: state.TopEmployer.data.items,
    totalItems: state.TopEmployer.data.totalItems,
    loading: state.TopEmployer.loading
})

const mapDispatchToProps = dispatch => ({
    getTopEmployer: (body?: any, pageIndex?: number, pageSize?: number) =>
        dispatch({ type: REDUX_SAGA.EMPLOYER.GET_TOP_EM, body, pageIndex, pageSize })
})

export default connect(mapStateToProps, mapDispatchToProps)(TopEm);