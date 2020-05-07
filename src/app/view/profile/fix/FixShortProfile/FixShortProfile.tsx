import React, { Component } from "react";
import "./FixPerson.scss";
import {
  update_avatar,
  update_profile,
  update_card_image,
} from "../../../../../services/api/private/profile";
import { connect } from "react-redux";
import moment from "moment";
import ButtonToggle from "../../../helper/toggle-button/ToggleButton";
import { sendFileHeader } from "../../../../../services/auth";
import { Icon, Row, Col, Modal, Input, Button, DatePicker, Avatar } from "antd";
import MapContainer from "../../../layout/google-maps/MapContainer";
import { timeConverter } from "../../../../../utils/convertTime";
import { REDUX_SAGA } from "../../../../../const/actions";
import { _requestToServer } from "../../../../../services/exec";
import { PUT } from "../../../../../const/method";

interface IProps {
  personalInfo?: any;
  address?: any;
  location?: any;
  marker?: any;
  _fixData?: (params?: string) => any;
}

interface IState {
  show_popup?: boolean;
  marker?: {
    lat?: number;
    lng?: number;
  };

  location?: string;
  address?: string;
  avatarUrl?: string;
  avatar?: string;
  isLookingForJobs?: boolean;
  personalInfo?: any;
  addressChange?: any;
}

class FixPerson extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      personalInfo: {
        firstName: "",
        lastName: "",
        birthday: "",
        gender: "",
        address: "",
        phone: "",
        identityCard: "",
        lat: 21.0223575259305,
        lon: 105.82227458143632,
      },

      show_popup: false,

      addressChange: {
        address: "",
        lat: 0,
        lon: 0,
      },
      location: "",
      address: "",
      avatarUrl: "",
      avatar: "",
      isLookingForJobs: true,
    };
  }

  componentDidMount() {
    let { personalInfo, address, location } = this.props;
    address = personalInfo.address;
    location = address;
    let isLookingForJobs = personalInfo.isLookingForJobs;
    let { avatarUrl } = this.state;
    avatarUrl = personalInfo.avatarUrl;
    this.setState({
      personalInfo,
      location,
      address,
      avatarUrl,
      isLookingForJobs,
    });
  }

  _handleData = (event) => {
    let type = event.target.id;
    let { personalInfo } = this.state;
    personalInfo[type] = event.target.value;
    this.setState({ personalInfo });
  };

  _handleTime = (value) => {
    let { personalInfo } = this.state;
    let time = 1000 * moment(value, "YYYY/MM/DD").unix();
    personalInfo.birthday = time;
    this.setState({ personalInfo });
  };

  _handleGender = (event) => {
    let { personalInfo } = this.state;
    let value = event.target.value;
    personalInfo.gender = value;
    this.setState({ personalInfo });
  };

  _handleClose = () => {
    let { show_popup } = this.state;
    show_popup = !show_popup;
    this.setState({ show_popup });
  };

  _closeModal = () => {
    this.setState({ show_popup: false });
  };

  _setMap = () => {
    let { personalInfo, addressChange } = this.state;
    personalInfo.lat = addressChange.lat;
    personalInfo.lon = addressChange.lon;
    personalInfo.address = addressChange.address;
    this.setState({ personalInfo });
    this._handleClose();
  };

  _openLocation = () => {
    this.setState({ show_popup: true });
  };

  _createRequest = async () => {
    let { personalInfo, avatar } = this.state;
    let dataRequest = {
      firstName: personalInfo.firstName,
      lastName: personalInfo.lastName,
      gender: personalInfo.gender,
      email: personalInfo.email,
      phone: personalInfo.phone,
      birthday: personalInfo.birthday,
      identityCard: personalInfo.identityCard,
      lat: personalInfo.lat,
      lon: personalInfo.lon,
      studentCode: personalInfo.studentCode,
    };
    await _requestToServer(
      PUT,
      dataRequest,
      update_profile,
      null,
      null,
      null,
      true
    );
    if (avatar !== "") {
      let form = new FormData();
      form.append("avatar", avatar);
      await _requestToServer(
        PUT,
        form,
        update_avatar + "?avatarContentType=image%2Fpng",
        null,
        sendFileHeader
      );
    }
    await this.props._fixData("person");
    window.location.reload();
  };
  getLatLngFromMap = (lat, lng, address) => {
    let { addressChange } = this.state;
    addressChange.address = address;
    addressChange.lat = lat;
    addressChange.lon = lng;
    this.setState({
      addressChange,
    });
  };
  render() {
    let { personalInfo, show_popup, avatarUrl } = this.state;
    let birth_day = timeConverter(personalInfo.birthday);
    return (
      <div className="wraper">
        {/* Center */}
        <Modal
          visible={show_popup}
          onCancel={this._handleClose}
          onOk={this._setMap}
          title="Định vị trên bản đồ"
          className="modal-map"
          footer={[
            <Button key="back" onClick={this._handleClose}>
              Trở lại
            </Button>,
            <Button key="submit" type="primary" onClick={this._setMap}>
              Cập nhật
            </Button>,
          ]}
        >
          <MapContainer GetLatLngToParent={this.getLatLngFromMap} />
        </Modal>

        {/* Fix Infomation */}
        <Row className="person-info">
          {/* left div */}
          <Col xs={24} sm={24} md={12} lg={12}>
            <div className="person-avatar">
              <h5>Cập nhật ảnh đại diện</h5>
              <Avatar
                src={avatarUrl}
                style={{ width: "95px", height: "95px" }}
              />
              <form>
                <label htmlFor="avatar" style={{ fontSize: 15 }}>
                  <Icon type="upload" />
                  Upload ảnh avatar
                </label>
              </form>
              <Input
                id="avatar"
                type="file"
                name="file"
                alt="ảnh ứng viên"
                style={{ display: "none" }}
                onChange={(e) => {
                  this._upLoadFile("avatar", "avatarUrl", e);
                }}
              />
            </div>

            <div className="person-content">
              <p>Điện thoại</p>
              <Input
                id="phone"
                type="text"
                className="input_outside"
                placeholder="Phone"
                value={personalInfo.phone}
                onChange={this._handleData}
              />
            </div>
            <div className="person-content">
              <p>Mã sinh viên</p>
              <Input
                id="studentCode"
                type="text"
                className="input_outside"
                placeholder="Mã sinh viên"
                value={personalInfo.studentCode}
                onChange={this._handleData}
              />
            </div>
           
            <div className="person-content">
              <p>Ngày sinh</p>
              <DatePicker
                defaultPickerValue={birth_day}
                onChange={this._handleTime}
                style={{ width: "100%" }}
                placeholder="Ngày sinh"
              />
            </div>
          </Col>

          {/* right div */}
          <Col xs={24} sm={24} md={12} lg={12}>
            <div className="person-content">
              <p>Họ</p>
              <Input
                id="lastName"
                type="text"
                className="input_outside"
                placeholder="LastName"
                value={personalInfo.lastName}
                onChange={this._handleData}
              />
            </div>
            <div className="person-content">
              <p>Tên</p>
              <Input
                id="firstName"
                type="text"
                className="input_outside"
                placeholder="FirstName"
                value={personalInfo.firstName}
                onChange={this._handleData}
              />
            </div>
            <div className="person-content">
              <ButtonToggle />
            </div>
            <div className="person-content">
              <p>Giới tính</p>
              <Icon type="man" />
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="MALE"
                  onClick={this._handleGender}
                  defaultChecked={personalInfo.gender === "MALE" ? true : false}
                />
                Nam
              </label>
              <Icon type="woman" />
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="FEMALE"
                  onClick={this._handleGender}
                  defaultChecked={personalInfo.gender === "MALE" ? false : true}
                />{" "}
                Nữ
              </label>
            </div>
            <div className="person-content">
              <p>Địa chỉ</p>
              <Input
                id="address"
                type="text"
                className="input_outside"
                placeholder="Địa chỉ"
                value={personalInfo.address}
                onClick={this._openLocation}
              />
            </div>
            <div className="person-content">
              <p>Số CMND</p>
              <Input
                id="identityCard"
                type="text"
                className="input_outside"
                placeholder="CMND"
                value={personalInfo.identityCard}
                onChange={this._handleData}
              />
            </div>
          </Col>
        </Row>

        {/* submit button */}
        <Row className="holder-button">
          <Col xs={12}>
            <button
              className="danger"
              onClick={() => {
                this.props._fixData("person");
              }}
            >
              {" "}
              Hủy
            </button>
          </Col>
          <Col xs={12}>
            <button className="request" onClick={() => this._createRequest()}>
              {" "}
              Lưu
            </button>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    personalInfo: state.PersonalInfo.personalInfo,
    marker: state.MapState.marker,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getData: () => dispatch({ type: REDUX_SAGA.PERSON_INFO.GET_PERSON_INFO }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FixPerson);
