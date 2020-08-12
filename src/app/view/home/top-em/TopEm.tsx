import React, { PureComponent } from 'react';
import { Col, Row, Skeleton, Avatar } from 'antd';
import './TopEm.scss'
import { connect } from 'react-redux';

//@ts-ignore
import { IAppState } from '../../../../redux/store/reducer';
import { REDUX_SAGA } from '../../../../const/actions';
import { ITopEmDetail } from '../../../../models/employer-detail';

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
        this.props.getTopEmployer(null, 0, 4);
    }

    render() {
        let { topEm, totalItems, loading } = this.props;
        if (topEm && totalItems > 0) {
            return (
                <div className='top-rm'>
                    <h5 style={{ textAlign: 'center' }}>DOANH NGHIỆP NỔI BẬT </h5>
                    <Row style={{ padding: '0 3vw' }}>
                        {
                            topEm.map((item: ITopEmDetail, i: number) => (
                                <Col
                                    key={i}
                                    xs={11}
                                    sm={11}
                                    md={6}
                                    lg={6}
                                    xl={6}
                                    xxl={4}
                                >
                                    <a href={`/employer/${btoa(item.employerID)}`}>
                                        {loading ?
                                            <Skeleton loading={loading} avatar paragraph={{ rows: 1 }} /> :
                                            (
                                                <div className='top-em-detail'>
                                                    <img
                                                        src={item.employerLogoUrl}
                                                        alt={item.employerName}
                                                        height="90%"
                                                        width="90%"
                                                    />
                                                </div>
                                            )}
                                        <div className='link'>
                                            <p >{item.employerName}</p>
                                        </div>
                                    </a>

                                </Col>
                            ))
                        }
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
        dispatch({ type: REDUX_SAGA.EMPLOYER.GET_TOP_EM })
})

export default connect(mapStateToProps, mapDispatchToProps)(TopEm);