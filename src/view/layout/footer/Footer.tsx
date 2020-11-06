import React from 'react';
import './Footer.scss';
//@ts-ignore
import CHPlay from '../../../assets/image/CHPlay.png';
//@ts-ignore
import AppStore from '../../../assets/image/app-store.png';
import { Col, Row, Icon } from 'antd';
//@ts-ignore
import QRCodeAppStore from '../../../assets/image/qr-code-appstore.png';
//@ts-ignore
import QRCodeCHPlay from '../../../assets/image/qr-code-chplay.png';
import { REDUX_SAGA } from './../../../const/actions';

import { connect } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';

//@ts-ignore

function Footer(props) {
  // React.useEffect((newProps) => { props.getJobNames() }, []);
  return (
    <div className='footer' >
      {/* <Option {...props} /> */}
      <div style={{ width: 1, backgroundColor: '#fff' }}></div>
      <div className="content-footer" style={{ display: props.disableFooterData ? "none" : "block", paddingTop: 18 }}>
        <Row >
          {/* Rule */}
          <Col xs={24} sm={24} md={8} lg={8} className='rule'>
            <ul>
              <li><b>Về Works.vn</b></li>
              <li><a href='https://about.works.vn/ve-chung-toi/' target="_blank" rel="noopener noreferrer">Giới thiệu</a></li>
              <li><a href='https://about.works.vn/privacy-policy/' target="_blank" rel="noopener noreferrer">Điều khoản sử dụng</a></li>
              <li> <a href='https://about.works.vn' target="_blank" rel="noopener noreferrer">Về chúng tôi</a></li>
              <li> <a href='https://works.vn/result' target="_blank" rel="noopener noreferrer">Tìm việc</a></li>
            </ul>
          </Col>
          {/* Contact */}
          <Col xs={24} sm={24} md={8} lg={8} xl={8} className="rule contact">
            <li>
                <b> Kết nối với chúng tôi:</b>
            </li>
            <li>
              <a href='https://www.facebook.com/workss.vn/?epa=SEARCH_BOX' target="_blank" rel="noopener noreferrer">
                <Icon type={"facebook"} style={{marginRight: 10}} />
                Facebook: works.vn
              </a>
            </li>
            <li style={{fontStyle: "italic"}}>
              Địa chỉ: Số 09 Duy tân, Dịch vọng hậu, Cầu giấy, Hà nội
            </li>
            <li style={{fontStyle: "italic"}}>
              Văn phòng: 54 Lê Văn Thiêm, Nhân Chính, Thanh Xuân, Hà Nội
            </li>
          </Col>
          {/* Market */}
          <Col xs={24} sm={24} md={8} lg={8} xl={8} className='rule app'>
            <div>
              <li><b>Ứng dụng di động</b></li>
              <div style={{ display: 'flex', marginBottom: 10 }}>
                <a href={'https://apps.apple.com/vn/app/worksvn-sinh-vi%C3%AAn/id1492437454'} target="_blank" rel="noopener noreferrer">
                  <LazyLoadImage src={AppStore} alt='CHPlay tìm việc' height='50px' width='auto' />
                </a>
                <LazyLoadImage src={QRCodeAppStore} alt='AppleStore Tìm việc QRCode' height='47px' width='auto' style={{ marginTop: '1.2px', marginLeft: '5px' }} />
              </div>
              <div style={{ display: 'flex' }} >
                <a
                  href={'https://play.google.com/store/apps/details?id=com.worksvn.student&hl=vi'}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LazyLoadImage src={CHPlay} alt='AppleStore Tìm việc' height='50px' width='auto' />
                </a>
                <LazyLoadImage src={QRCodeCHPlay} alt='CHPlay Tìm việc QRCode' height='47px' width='auto' style={{ marginTop: '1.2px', marginLeft: '5px' }} />
              </div>
            </div>
          </Col>
        </Row>
      </div>
      {/* CopyRight */}
      <div className='copy-right'>
        <p>Copyright @ Công Ty Cổ Phần Worksvn</p>
      </div>
    </div >
  );
}
const mapStateToProps = (state) => ({
  regions: state.Regions.items,
  jobNames: state.JobNames.items,
})

const mapDispatchToProps = dispatch => ({
  getJobNames: (pageIndex?: number, pageSize?: number) => dispatch({ type: REDUX_SAGA.JOB_NAMES.GET_JOB_NAMES, pageIndex, pageSize }),
})
export default connect(mapStateToProps, mapDispatchToProps)(Footer);
