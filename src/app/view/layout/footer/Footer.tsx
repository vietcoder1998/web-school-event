import React from 'react';
import './Footer.scss';
//@ts-ignore
import CHPlay from '../../../../assets/image/CHPlay.png';
//@ts-ignore
import AppStore from '../../../../assets/image/app-store.png';
import { Col, Row } from 'antd';
import { Icon } from 'antd'
import Option from './option/Option';
//@ts-ignore
import QRCodeAppStore from '../../../../assets/image/qr-code-appstore.png';
//@ts-ignore
import QRCodeCHPlay from '../../../../assets/image/qr-code-chplay.png';

export default function Footer(props) {
  return (
    <div className='footer' >
      <Option {...props} />
      <div style={{ width: 1, backgroundColor: '#fff' }}></div>
      <div className="content-footer" style={{ display: props.disableFooterData ? "none" : "block" }}>
        <Row >
          {/* Rule */}
          <Col xs={24} sm={24} md={8} lg={8} className='rule'>
            <ul>
              <li># <a href='https://works.vn/'>Giới thiệu</a></li>
              <li># <a href='https://works.vn/privacy-policy/'>Điều khoản sử dụng</a></li>
              <li># <a href='https://works.vn/ve-chung-toi/'>Về chúng tôi</a></li>
            </ul>
          </Col>
          {/* Contact */}
          <Col xs={24} sm={24} md={8} lg={8} xl={8} className="rule contact">
            <div>
              <a href='https://www.facebook.com/workss.vn/?epa=SEARCH_BOX'>
                Kết nối với chúng tôi:
              </a> <i className="fa fa-facebook-square" style={{ fontSize: 18 }}></i>
            </div>
            <div>
              <label style={{ fontSize: '0.95em' }}>
                Địa chỉ: 144 Xuân Thủy, Cầu Giấy, Hà Nội
                </label>
            </div>
          </Col>
          {/* Market */}
          <Col xs={24} sm={24} md={8} lg={6} xl={6} className='rule app'>
            <div className='market-chlay'>
              <p>Ứng dụng di động</p>
              <div>
                <div style={{display: 'flex'}}>
                  <a href={'https://apps.apple.com/vn/app/works-vn-t%C3%ACm-vi%E1%BB%87c/id1487662808'}>
                    <img src={AppStore} alt='CHPlay tìm việc' height='50px' width='auto' />
                  </a>
                  {/* <img src={QRCodeAppStore} alt='AppleStore Tìm việc QRCode' height='47px' width='auto' style={{ marginTop: '1.2px', marginLeft: '5px' }} /> */}
                </div>
                <div style={{display: 'flex'}}>
                  <a href={'https://play.google.com/store/apps/details?id=com.worksvn.candidate&hl=vi'}>
                    <img src={CHPlay} alt='AppleStore Tìm việc' height='50px' width='auto' />
                  </a>
                  {/* <img src={QRCodeCHPlay} alt='CHPlay Tìm việc QRCode' height='47px' width='auto' style={{marginTop: '1.2px', marginLeft: '5px'}}/> */}
                </div>
              </div>

            </div>
          </Col>
        </Row>
      </div>
      {/* CopyRight */}
      <div className='copy-right'>
        <label>Copyright @ Work.vn</label>
      </div>
    </div >
  );
}
