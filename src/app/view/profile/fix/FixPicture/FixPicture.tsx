import React, { Component } from "react";
// import DatePicker from "react-datepicker";
import "./FixPicture.scss";
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
  identityCardFrontUrl?: any;
  identityCardFront?: any;
  identityCardBackUrl?: any;
  identityCardBack?: any;
}

class FixPerson extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      identityCardFrontUrl: "",
      identityCardFront: "",
      identityCardBackUrl: "",
      identityCardBack: "",
    };
  }

  componentDidMount() {
    let { personalInfo } = this.props;

    let { identityCardFrontUrl, identityCardBackUrl } = this.state;

    identityCardBackUrl = personalInfo.identityCardBackImageUrl;
    identityCardFrontUrl = personalInfo.identityCardFrontImageUrl;
    this.setState({
      identityCardFrontUrl,
      identityCardBackUrl,
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

  _openLocation = () => {
    this.setState({ show_popup: true });
  };

  _createRequest = async () => {
    let { identityCardBack, identityCardFront } = this.state;
    if (identityCardBack !== "" || identityCardFront !== "") {
      let form = new FormData();
      form.append("front", identityCardFront);
      form.append("back", identityCardBack);
      await _requestToServer(
        PUT,
        form,
        update_card_image,
        null,
        sendFileHeader
      );
    }
    await this.props._fixData("picture");
    window.location.reload();
  };
  render() {
    let { identityCardFrontUrl, identityCardBackUrl } = this.state;

    return (
      <div className="wraper">
        <Row className="person-info">
          <Col xs={12}>
            <div
              className="person-content"
              style={{ textAlign: "center", marginTop: "10px" }}
            >
              <img
                src={identityCardFrontUrl}
                alt="ảnh CMND"
                className="identityImage"
              />
              <form>
                <label htmlFor="FrontImg" style={{ fontSize: 15 }}>
                  <Icon type="upload" />
                  Upload ảnh mặt trước CMND
                </label>
              </form>
              <Input
                id="FrontImg"
                type="file"
                name="file"
                alt="ảnh CMND"
                style={{ display: "none" }}
                onChange={(e) => {
                  this._upLoadFile(
                    "identityCardFront",
                    "identityCardFrontUrl",
                    e
                  );
                }}
              />
            </div>
          </Col>
          <Col xs={12}>
            <div
              className="person-content"
              style={{ textAlign: "center", marginTop: "10px" }}
            >
              <img
                src={identityCardBackUrl}
                alt="ảnh CMND"
                className="identityImage"
              />
              <form>
                <label htmlFor="backImg" style={{ fontSize: 15 }}>
                  <Icon type="upload" />
                  Upload ảnh mặt sau CMND
                </label>
              </form>
              <Input
                id="backImg"
                type="file"
                name="file"
                alt="ảnh CMND"
                style={{ display: "none" }}
                onChange={(e) => {
                  this._upLoadFile(
                    "identityCardBack",
                    "identityCardBackUrl",
                    e
                  );
                }}
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
