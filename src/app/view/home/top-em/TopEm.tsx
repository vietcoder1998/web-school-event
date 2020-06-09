import React, { PureComponent } from 'react';
import { Col, Row, Skeleton} from 'antd';
import './TopEm.scss'
import { connect } from 'react-redux';

//@ts-ignore
//@ts-ignore
import JobChoiceLogo from './../../../../assets/image/job-choice-logo.png';
//@ts-ignore
import EduVietLogo from './../../../../assets/image/eduviet-logo.png';
//@ts-ignore
import TTCLogo from './../../../../assets/image/ttc-logo.png';

interface IProps {
    getHotJob?: Function;
    top_job_data?: any;
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
    }

    render() {
        let { is_loading } = this.state;

        return (
            <div className='top-rm'>
                <h5 style={{ textAlign: 'center' }}>ĐỐI TÁC NỔI BẬT </h5>
                <Row style={{padding: '0 3vw'}}>
                    <Col xs={0} sm={0} md={3} lg={6} xl={0} xxl={6} ></Col>
                    <Col xs={24} sm={8} md={6} lg={4} xl={8} xxl={4} >
                        {is_loading ?
                            <Skeleton loading={true} avatar paragraph={{ rows: 1 }} /> :
                            (<div className='h-j-item'>
                                {/* <Avatar
                                    shape={'square'}
                                    style={{ width: '100%', height: '100%' }}
                                    src={JobChoiceLogo}
                                    alt='logo'
                                /> */}
                                <img src={JobChoiceLogo} alt='logo' height='90%' width='90%'/>
                            </div>)}
                        <div className='job-content'>
                            <p style={{color: 'black'}}>JobChoice</p>
                        </div>
                    </Col>
                    <Col xs={24} sm={8} md={6} lg={4} xl={8} xxl={4} >
                        {is_loading ?
                            <Skeleton loading={true} avatar paragraph={{ rows: 1 }} /> :
                            (<div className='h-j-item'>
                                {/* <Avatar
                                    shape={'square'}
                                    style={{ width: '100%', height: '100%' }}
                                    src={TTCLogo}
                                    alt='TTC ảnh'
                                /> */}
                                <img src={TTCLogo} alt='logo' height='90%' width='90%'/>                                
                            </div>)}
                        <div className='job-content'>
                           <p style={{color: 'black'}}>TTC Solutions</p>
                        </div>
                    </Col>
                    <Col xs={24} sm={8} md={6} lg={4} xl={8} xxl={4} >
                        {is_loading ?
                            <Skeleton loading={true} avatar paragraph={{ rows: 1 }} /> :
                            (<div className='h-j-item'>
                                {/* <Avatar
                                    shape={'square'}
                                    style={{ width: '100%', height: 'auto' }}
                                    src={EduVietLogo}
                                /> */}
                                <img src={EduVietLogo} alt='logo' height='75%' width='75%'/>
                            </div>)}
                        <div className='job-content'>
                            <p style={{color: 'black'}}>EDUVIET</p>
                        </div>
                    </Col>
                    <Col xs={0} sm={0} md={3} lg={6} xl={0} xxl={6} ></Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(TopEm);