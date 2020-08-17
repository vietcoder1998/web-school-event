import React from "react";
import { timeConverter } from "../../../utils/convertTime";
import { connect } from "react-redux";
import { Avatar, Progress, Icon } from "antd";
import imageDefault from "../../../assets/image/base-image.jpg";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { LiCopy } from './../../layout/common/Common';


function GetDate(dateRaw) {
  var date = new Date(dateRaw);
  return (
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
  );
}

function ShortProfile(props?: { personalInfo?: any }) {
  let { personalInfo } = props;

  return (
    <div className="wrapper" id="person">
      <LazyLoadImage />
      <div className="avatar">
        <LazyLoadImage
          src={personalInfo.coverUrl} alt={"Ảnh ứng viên "}
          style={{
            objectFit: "cover",
            height: "15vh",
            width: "100%",
            marginBottom: "10px",
            border: "solid #1890ff80 2px",
            borderRadius: "2px"
          }}
        />
        <Avatar
          src={personalInfo.avatarUrl === null ? imageDefault : personalInfo.avatarUrl}
          style={{
            width: "100px",
            height: "100px",
            float: "right",
            border: "solid #1890ff80 2px",
            top: "-50px"
          }}
        />
      </div>
      <div className="short-profile">
        <ul>
          <LiCopy show={true}>
            <Icon type="user" />
            Họ và tên:{" "}
            {personalInfo &&
              personalInfo.lastName + " " + personalInfo.firstName}
          </LiCopy >
          <LiCopy >
            <Icon type="share-alt" />
            Trạng thái:
            {personalInfo && personalInfo.isLookingForJob === true
              ? <b> Đang tìm việc</b>
              : <b> Đã có công việc</b>}
          </LiCopy>
          <LiCopy >
            <Icon type="reconciliation" />
            Ngày sinh:{" "}
            {timeConverter(personalInfo && personalInfo.birthday)}
          </LiCopy>
          <LiCopy >
            <Icon type={personalInfo && personalInfo.gender === "MALE" ? "man" : "woman"} />
            Giới tính:{" "}
            {personalInfo && personalInfo.gender === "MALE" ? "Nam" : "Nữ"}
          </LiCopy>
          <LiCopy copy={personalInfo && personalInfo.addres}>
            <Icon type="environment" />
            Địa chỉ:{" "} {personalInfo && personalInfo.address}
          </LiCopy>
          <LiCopy copy={personalInfo && personalInfo.email}>
            <Icon type="mail" />
            Email:{" "}{personalInfo && personalInfo.email}
          </LiCopy>
          <LiCopy copy={personalInfo && personalInfo.phone}>
            <Icon type="phone" />
            Điện thoại liên hệ:{" "}{personalInfo && personalInfo.phone}
          </LiCopy>
          <LiCopy copy={personalInfo && personalInfo.identityCard}>
            <Icon type="idcard" />
            Số CMND:{personalInfo && personalInfo.identityCard}
          </LiCopy>
          <LiCopy copy={personalInfo && personalInfo.studentCode}>
            <Icon type="idcard" />
            Mã sinh viên :{" "}{personalInfo && personalInfo.studentCode}
          </LiCopy>
          <LiCopy >
            <Icon type="database" />
            Ngày tạo:{" "}{personalInfo && GetDate(personalInfo.createdDate)}
          </LiCopy>
          <LiCopy >
            <Icon type="safety" />
            Hoàn thiện hồ sơ:{" "}{personalInfo.completePercent} %
            <Progress percent={personalInfo.completePercent} />
          </LiCopy>
        </ul>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  personalInfo: state.FullPersonalInfo.personalInfo,
});

export default connect(mapStateToProps, null)(ShortProfile);
