import React, { Component } from "react";
import {
  update_avatar,
  update_profile,
} from "../../../services/api/private/profile";
import { connect } from "react-redux";
import moment from "moment";
import ButtonToggle from "../../helper/toggle-button/ToggleButton";
import { sendFileHeader } from "../../../services/auth";
import { Icon, Row, Col, Modal, Input, DatePicker, Button, Form } from "antd";
import MapContainer from "../../layout/google-maps/MapContainer";
import { timeConverter } from "../../../utils/convertTime";
import { REDUX_SAGA } from "../../../const/actions";
import { _requestToServer } from "../../../services/exec";
import { PUT } from "../../../const/method";
// import imageDefault from "../../../../assets/image/base-image.jpg";

interface IProps {
  personalInfo?: any;
  address?: any;
  location?: any;
  marker?: any;
  _fixData?: (params?: string) => any;
  getData?: any
}

interface IState {
  show_popup?: boolean;
  marker?: {
    lat?: number;
    lng?: number;
  };
  avatarUrl?: string;
  location?: string;
  address?: string;
  avatar?: string;
  isLookingForJobs?: boolean;
  personalInfo?: any;
  addressChange?: any;
  onPressSave?: boolean;
  loading?: boolean
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
      onPressSave: false,
      loading: false
    };
  }

  async componentDidMount() {
    console.log("onPressSave: " + this.state.onPressSave)
    let { personalInfo, address, location } = this.props;
    address = personalInfo.address;
    location = address;
    let isLookingForJobs = personalInfo.isLookingForJobs;
    let { avatarUrl } = this.state;
    avatarUrl = personalInfo.avatarUrl;
    let newPersonalInfo = {...personalInfo}
    await this.setState({
      personalInfo: newPersonalInfo,
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

  _upLoadFile = (name, url, event?: any) => {
    let picture = this.state[name];
    let files = event.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (e?: any) => {
      // @ts-ignore
      this.setState({ [url]: e.target.result });
    };

    picture = files[0];
    this.setState({ [name]: picture });
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
    await this.props.getData()
    await this.setState({loading: false})
    // window.location.reload();
  };
  checkValid() {
    this.setState({ onPressSave: true })
    let {personalInfo} = this.state
    if(!personalInfo.lastName) {
      return false
    } 
    else if(!personalInfo.firstName){
      return false
    }
    else if(!personalInfo.address){
      return false
    }
    else if(!personalInfo.phone){
      return false
    }
    else if(!personalInfo.address){
      return false
    }
    else if(personalInfo.birthday === -1) {
      return false
    }
    return true
    
  }
  onSave = () => {
    this.setState({loading: true})
    if(this.checkValid()) {
      this._createRequest()
    } else {
      this.setState({loading: false})
    }
  }
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
    // let { personalInfo } = this.props;
    let { show_popup, onPressSave, personalInfo } = this.state;
    let birth_day = personalInfo.birthday !== -1 ? timeConverter(personalInfo.birthday): null;

    return (
      <div className="wrapper" id="person">
        {/* Center */}
        <Modal
          visible={show_popup}
          onCancel={this._handleClose}
          onOk={this._setMap}
          style={{ top: "15vh" }}
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
          <div style={{ position: "relative", height: "60vh" }}>
            <MapContainer
              //@ts-ignore
              GetLatLngToParent={this.getLatLngFromMap}
            />
          </div>
        </Modal>

        {/* Fix Infomation */}
        <Row className="person-info">
          <Col xs={24} sm={12} span={12}>
            <p>Họ*</p>
            <Form style={{ width: '100%' }}>
              <Form.Item validateStatus={!personalInfo.lastName && onPressSave ? 'error' : null} help={!personalInfo.lastName && onPressSave ? 'Chưa điền thông tin' : null}  >
                <Input
                  id="lastName"
                  type="text"
                  className="input_outside"
                  placeholder="Họ và đệm"
                  value={personalInfo.lastName}
                  onChange={this._handleData}
                />
              </Form.Item>
            </Form>

          </Col>
          <Col xs={24} sm={12} span={12}>
            <p>Tên*</p>
            <Form style={{ width: '100%' }}>
              <Form.Item validateStatus={!personalInfo.firstName && onPressSave ? 'error' : null} help={!personalInfo.firstName && onPressSave ? 'Chưa điền thông tin' : null}  >
                <Input
                  id="firstName"
                  type="text"
                  className="input_outside"
                  placeholder="Tên"
                  value={personalInfo.firstName}
                  onChange={this._handleData}
                />
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <Row className="person-info">
          <Col xs={24} sm={12} span={12}>
            <ButtonToggle />
          </Col>
          <Col xs={24} sm={12} span={12}>
            <p>Giới tính</p>
            <Icon type="man" />
            <label>
              <input
                type="radio"
                name="gender"
                value="MALE"
                onClick={this._handleGender}
                checked={personalInfo.gender === "MALE" ? true : false}
              />{" "}
              Nam
              </label>
            <Icon type="woman" />
            <label>
              <input
                type="radio"
                name="gender"
                value="FEMALE"
                onClick={this._handleGender}
                checked={personalInfo.gender === "MALE" ? false : true}
              />{" "}
              Nữ
              </label>
          </Col>

          <Col span={24}>
            <p>Địa chỉ*</p>
            <Form style={{ width: '100%' }}>
              <Form.Item validateStatus={!personalInfo.address && onPressSave ? 'error' : null} help={!personalInfo.address && onPressSave ? 'Chưa chọn địa chỉ' : null}  >
                <Input
                  id="address"
                  type="text"
                  className="input_outside"
                  placeholder="Địa chỉ"
                  value={personalInfo.address}
                  onClick={this._openLocation}
                />
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <Row className="person-info">
          <Col xs={24} sm={12} span={12}>
            <p>Điện thoại*</p>
            <Form style={{ width: '100%' }}>
              <Form.Item validateStatus={!personalInfo.phone && onPressSave ? 'error' : null} help={!personalInfo.phone && onPressSave ? 'Chưa điền thông tin' : null}  >
                <Input
                  id="phone"
                  type="text"
                  className="input_outside"
                  placeholder="Phone"
                  value={personalInfo.phone}
                  onChange={this._handleData}
                />
              </Form.Item>
            </Form>
          </Col>

          <Col xs={24} sm={12} span={12}>
            <p>Ngày sinh*</p>
            <Form style={{ width: '100%' }}>
              <Form.Item validateStatus={personalInfo.birthday === -1 && onPressSave ? 'error' : null} help={personalInfo.birthday === -1  && onPressSave ? 'Chưa chọn ngày sinh' : null}  >
                <DatePicker
                  className="input_outside"
                  value={personalInfo.birthday !== -1 && birth_day ? moment(birth_day, 'DD/MM/YYYY') : null}
                  format="DD-MM-YYYY"
                  onChange={this._handleTime}
                  placeholder="Ngày sinh"
                />
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <Row className="person-info">
          <Col xs={24} sm={12} span={12}>
            <p>Số CMND</p>
            <Input
              id="identityCard"
              type="text"
              className="input_outside"
              placeholder="CMND"
              value={personalInfo.identityCard}
              onChange={this._handleData}
            />
          </Col>
          <Col xs={24} sm={12} span={12}>
            <p>Mã sinh viên</p>
            <Input
              id="studentCode"
              type="text"
              className="input_outside"
              placeholder="Mã sinh viên"
              value={personalInfo.studentCode}
              onChange={this._handleData}
            />
          </Col>
        </Row>
        {/* submit button */}
        <Row className="holder-button">
          <Col xs={12}>
            <Button
              type="danger"
              icon="close"
              onClick={() => {
                this.props._fixData("person");
              }}
            >
              Hủy
            </Button>
          </Col>
          <Col xs={12}>
            <Button
              type="primary"
              icon="save"
              onClick={this.onSave}
            >
              {this.state.loading ? <Icon type="loading" /> : 'Lưu'}
              </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    personalInfo: state.FullPersonalInfo.personalInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getData: () => dispatch({ type: REDUX_SAGA.PERSON_INFO.GET_FULL_PERSON_INFO }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FixPerson);
