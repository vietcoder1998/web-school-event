import React from "react";
import "./ShortProfile.scss";
import { timeConverter } from "../../../../../utils/convertTime";
import { connect } from "react-redux";
import { Avatar, Progress } from "antd";
import imageDefault from "../../../../../assets/image/base-image.jpg";


function GetDate(dateRaw) {
    var date = new Date(dateRaw);
    return (date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear())
}

function ShortProfile(props?: { personalInfo?: any }) {
  let { personalInfo } = props;
 
  return (
    <div className="wrapper">
      <div className="avatar">
        <Avatar
          src={personalInfo.avatarUrl}
          style={{
            width: "100px",
            height: "100px",
            float: "right",
            border: "solid #1890ff80 3px",
          }}
        />
      </div>
      <div className="short-profile">
        <ul>
          <li className="profile-info">
            <i className="fa fa-user " />
            Họ và tên:
            {personalInfo &&
              personalInfo.lastName + " " + personalInfo.firstName}
          </li>
          <li className="profile-info">
            <i className="fa fa-briefcase " />
            Trạng thái:{" "}
            {personalInfo && personalInfo.isLookingForJob === true
              ? "Đang tìm việc"
              : "Đã có công việc"}
          </li>
          <li className="profile-info">
            <i className="fa fa-calendar " />
            Ngày sinh:{" "}
            {timeConverter(personalInfo && personalInfo.birthday, 1000)}
          </li>
          <li className="profile-info">
            <i className="fa fa-venus-mars " />
            Giới tính:{" "}
            {personalInfo && personalInfo.gender === "MALE" ? "Nam" : "Nữ"}
          </li>
          <li>
            <i className="fa fa-home " />
            Địa chỉ: {personalInfo && personalInfo.address}
          </li>
          <li>
            <i className="fa fa-envelope " />
            Email: {personalInfo && personalInfo.email}
          </li>
          <li>
            <i className="fa fa-phone " />
            Điện thoại liên hệ:{personalInfo && personalInfo.phone}
          </li>
          <li>
            <i className="fa fa-address-card " />
            Số CMND:{personalInfo && personalInfo.identityCard}
          </li>
          <li>
            <i className="fa fa-database " />
           Ngày tạo:{personalInfo && GetDate(personalInfo.createdDate)}
          </li>
          <li>
            <i className="fa fa-percent" />
            Hoàn thiện hồ sơ:{" "}
            <Progress percent={personalInfo.completePercent} />
          </li>
          <li>
            Ảnh CMND: 
            <img
              src={personalInfo.identityCardFrontImageUrl}
              onError={(e) => {
                e.target.src = { imageDefault };
              }}
              alt="ảnh CMND"
             
              className='identytiImage'
            />
            <img
              src={personalInfo.identityCardBackImageUrl}
              alt="ảnh CMND"
              onError={(e) => {
                e.target.src = { imageDefault };
              }}
              
              className='identytiImage'
            />
          </li>
        </ul>
      
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  personalInfo: state.PersonalInfo.personalInfo,
});

export default connect(mapStateToProps, null)(ShortProfile);
