import React from "react";
import { timeConverter } from "../../../../utils/convertTime";
import { connect } from "react-redux";
import { Avatar, Progress, Icon } from "antd";
import imageDefault from "../../../../assets/image/base-image.jpg";


function GetDate(dateRaw) {
  var date = new Date(dateRaw);
  return (
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
  );
}

function ShortProfile(props?: { personalInfo?: any }) {
  let { personalInfo } = props;

  return (
    <div className="wrapper">
      <div className="avatar">
        <Avatar
          src={personalInfo.avatarUrl === null ? imageDefault : personalInfo.avatarUrl}
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
            <Icon type="user" />
            Họ và tên:{" "}
            {personalInfo &&
              personalInfo.lastName + " " + personalInfo.firstName}
          </li>
          <li className="profile-info">
            <Icon type="share-alt" />
            {personalInfo && personalInfo.isLookingForJob === true
              ? <b>Đang tìm việc</b>
              : <b>Đã có công việc</b>}
          </li>
          <li className="profile-info">
            <Icon type="reconciliation" />
            Ngày sinh:{" "}
            {timeConverter(personalInfo && personalInfo.birthday)}
          </li>
          <li className="profile-info">
            <Icon type={personalInfo && personalInfo.gender === "MALE" ? "man" : "woman"} />
            Giới tính:{" "}
            {personalInfo && personalInfo.gender === "MALE" ? "Nam" : "Nữ"}
          </li>
          <li>
            <Icon type="environment" />
            Địa chỉ:{" "} {personalInfo && personalInfo.address}
          </li>
          <li>
            <Icon type="mail" />
            Email:{" "}{personalInfo && personalInfo.email}
          </li>
          <li>
            <Icon type="phone" />
            Điện thoại liên hệ:{" "}{personalInfo && personalInfo.phone}
          </li>
          <li>
            <Icon type="idcard" />
            Số CMND:{personalInfo && personalInfo.identityCard}
          </li>
          <li>
            <Icon type="idcard" />
            Mã sinh viên :{" "}{personalInfo && personalInfo.studentCode}
          </li>
          <li>
            <Icon type="database" />
            Ngày tạo:{" "}{personalInfo && GetDate(personalInfo.createdDate)}
          </li>
          <li>
            <Icon type="safety" />
            Hoàn thiện hồ sơ:{" "}{personalInfo.completePercent} %
            <Progress percent={personalInfo.completePercent} />
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
