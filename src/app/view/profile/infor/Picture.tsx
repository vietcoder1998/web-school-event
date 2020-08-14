import React from "react";
import { connect } from "react-redux";
import imageDefault from "../../../../assets/image/base-image.jpg";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Row, Col } from 'antd';
import { IAppState } from '../../../../redux/store/reducer';

function ShortProfile(props?: { personalInfo?: any }) {
  let { personalInfo } = props;

  return (
    <div className="wrapper">
      <div className="short-profile">
        <Row>
          <Col  xs={24} span={12}>
            <LazyLoadImage
              src={personalInfo.identityCardFrontImageUrl}
              onError={(e?: React.SyntheticEvent) => {
                //@ts-ignore
                e.target.src = { imageDefault };
              }}
              alt="ảnh CMND"
              className="identytiImage"
            />
          </Col>
          <Col xs={24} span={12}>
            <LazyLoadImage
              src={personalInfo.identityCardBackImageUrl}
              alt="ảnh CMND"
              onError={(e) => {
                //@ts-ignore
                e.target.src = { imageDefault };
              }}
              className="identytiImage"
            />
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
