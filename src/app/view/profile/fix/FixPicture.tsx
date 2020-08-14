import React, { Component } from "react";
// import DatePicker from "react-datepicker";
import {
  update_card_image,
} from "../../../../services/api/private/profile";
import { connect } from "react-redux";
import moment from "moment";
import { sendFileHeader } from "../../../../services/auth";
import { Icon, Row, Col, Input, Button } from 'antd';
import { REDUX_SAGA } from "../../../../const/actions";
import { _requestToServer } from "../../../../services/exec";
import { PUT } from "../../../../const/method";

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
  personalInfo?: any;
  show_popup?:boolean;
}

class FixPerson extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      identityCardFrontUrl: "",
      identityCardFront: "",
      identityCardBackUrl: "",
      identityCardBack: "",
      personalInfo: null,
      show_popup: false
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
      <div className="wrapper">
        <Row >
          <Col span={10}>
            <img
              src={identityCardFrontUrl}
              alt="ảnh CMND"
              className="identityImage"
            />
            <label htmlFor="FrontImg" style={{ fontSize: 15 }}>
              <Icon type="upload" />
                  Upload ảnh mặt trước CMND
            </label>
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
          </Col>
          <Col span={10}>
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
          </Col>
        </Row>

        {/* submit button */}
        <Row className="holder-button">
          <Col xs={12}>
            <Button
              className="danger"
              size="large"
              icon="close"
              onClick={() => {
                this.props._fixData("picture");
              }}
            >
              Hủy
            </Button>
          </Col>
          <Col xs={12}>
            <Button
              type="primary"
              size="large"
              icon="save"
              onClick={() => this._createRequest()}
            >
              Lưu
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
    marker: state.MapState.marker,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getData: () => dispatch({ type: REDUX_SAGA.PERSON_INFO.GET_FULL_PERSON_INFO }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FixPerson);
