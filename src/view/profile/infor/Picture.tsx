import React from "react";
import { connect } from "react-redux";
//@ts-ignore
import imageDefault from "../../../assets/image/base-image.jpg";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Row, Col } from 'antd';
import { IAppState } from '../../../redux/store/reducer';

function ShortProfile(props?: { personalInfo?: any }) {
  let { personalInfo } = props;

  return (
    <div className="wrapper">
      <div className="short-profile">
        <Row>
          <Col xs={24} md={12} xl={12} lg={12} xxl={12}>
            <p>
              <b> Ảnh mặt trước</b>
            </p>
            <div className="identytiImage">
              <LazyLoadImage
                src={personalInfo.identityCardFrontImageUrl}
                onError={(e?: React.SyntheticEvent) => {
                  //@ts-ignore
                  e.target.src = { imageDefault };
                }}
                alt="ảnh CMND"
                height="100%"
                width="100%"
              />
            </div>
          </Col>
          <Col xs={24} md={12} xl={12} lg={12} xxl={12}>
            <p>
              <b>
                Ảnh mặt sau
              </b>
            </p>
            <div className="identytiImage">
              <LazyLoadImage
                src={personalInfo.identityCardBackImageUrl}
                alt="ảnh CMND"
                onError={(e) => {
                  //@ts-ignore
                  e.target.src = { imageDefault };
                }}
                height="100%"
                width="100%"
              />
            </div>
          </Col>
        </Row>
      </div>
    </div >
  );
}

const mapStateToProps = (state?: IAppState) => ({
  personalInfo: state.FullPersonalInfo.personalInfo,
});

export default connect(mapStateToProps, null)(ShortProfile);
