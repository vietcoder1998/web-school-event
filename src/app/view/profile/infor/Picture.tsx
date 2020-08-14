import React from "react";
import { connect } from "react-redux";
import imageDefault from "../../../../assets/image/base-image.jpg";

function ShortProfile(props?: { personalInfo?: any }) {
  let { personalInfo } = props;

  return (
    <div className="wrapper">
      <div className="short-profile">
        <ul>
          <li>
            <img
              src={personalInfo.identityCardFrontImageUrl}
              onError={(e?: React.SyntheticEvent) => {
                //@ts-ignore
                e.target.src = { imageDefault };
              }}
              alt="ảnh CMND"
              className="identytiImage"
            />
            <img
              src={personalInfo.identityCardBackImageUrl}
              alt="ảnh CMND"
              onError={(e) => {
                //@ts-ignore
                e.target.src = { imageDefault };
              }}
              className="identytiImage"
            />
          </li>
        </ul>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  personalInfo: state.FullPersonalInfo.personalInfo,
});

export default connect(mapStateToProps, null)(ShortProfile);
