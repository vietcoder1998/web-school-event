import React, { PureComponent } from 'react';
import { Col, Row } from 'antd';
import './TopEm.scss'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import defaultImage from '../../../../assets/image/base-image.jpg'
import { REDUX_SAGA } from '../../../../const/actions';

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

class TopEm extends PureComponent<IProps, IState> {
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
            <div className='top-rm' style={{ display: listEmployer.totalItems === 0 ? 'none' : '' }}>
                <h5 style={{ textAlign: 'center' }}>DOANH NGHIỆP NỔI BẬT </h5>
                <Row align='center' type='flex'>
                    {listEmployer && listEmployer.items ? listEmployer.items.map((item, index) => (
                        <Col xs={12} sm={8} md={6} lg={4} xl={8} xxl={4}key={index}>
                            <div className='h-j-item'>
                                <img src={item.employer.logoUrl === null ? defaultImage : item.employer.logoUrl} alt='logo' className='image-employer' />
                            </div>
                            <div className='job-content'>
                                <Link to={`/employer/${window.btoa(item.employer.id)}`} target='_blank' className="name_employer">
                                    <p style={{ color: 'black', fontWeight: 'bold' }}>{item.employer.employerName}</p>
                                </Link>
                            </div>
                        </Col>
                    )) : null}
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    listEmployer: state.TopEmployer.data
})

const mapDispatchToProps = dispatch => ({
    getTopEmpoyer: (pageIndex?: number, pageSize?: number) => dispatch({ type: REDUX_SAGA.EVENT.EMPLOYER.TOP, pageIndex, pageSize }),
})

export default connect(mapStateToProps, mapDispatchToProps)(TopEm);