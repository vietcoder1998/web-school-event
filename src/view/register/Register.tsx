import React, { Component } from "react";
import Layout from "../layout/Layout";
import {
  Tooltip,
  Button,
  Icon,
  Input,
  Checkbox,
  Row,
  Col,
  // DatePicker,
  Select,
  Affix
} from "antd";
// import moment from "moment";
import "./Register.scss";
import { connect } from "react-redux";
import { SCHOOLS } from "../../services/api/private.api";
import { authHeaders, noInfoHeader } from "../../services/auth";
import { _requestToServer } from "../../services/exec";
import swal from "sweetalert";
import { POST } from "../../const/method";
import { _get, _post } from "../../services/base-api";
import { PUBLIC_HOST } from "../../environment/development";
import { exceptionShowNotiConfig } from '../../config/config-exception';
//@ts-ignore
import imageLogin from "../../assets/image/Break750x600.jpg";
// import logo from "../../assets/image/logo-01.png";
import { goBackWhenLogined } from '../../utils/goBackWhenLogined'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { IAppState } from '../../redux/store/reducer';
const isNumeric = (value) => {
  return /^-{0,1}\d+$/.test(value);
};
// const validSchoolYearEnd = ["Chọn năm học kết thúc", "Năm học kết thúc hợp lệ", "Năm học kết thúc phải lớn hơn năm học bắt đầu"]
const validRePassword = ["Mật khẩu quá ngắn", "Mật khẩu không trùng khớp", "Mật khẩu hợp lệ"]
interface IProps {
  marker?: any;
  schools?: any;
}
let { Option } = Select;
interface IState {
  body?: any;
  is_exactly_firstname?: boolean;
  is_exactly_lastname?: boolean;
  is_exactly_email?: boolean;
  is_exactly_rpw?: number;
  is_exactly_pw?: boolean;
  is_exactly_phone?: boolean;
  is_exactly_schoolYearStart?: boolean;
  exactly_schoolYearEnd?: number;
  is_exactly_majorID?: boolean;
  is_exactly_schoolID?: any;
  marker?: any;
  location?: string;
  repassword?: string;
  checked?: boolean;
  show_popup?: boolean;
  is_except_rule?: boolean;
  list_major?: Array<any>;
  is_exists?: boolean;
  show_password: boolean;
  show_re_password: boolean;
  loading: boolean;
  list_school?: Array<any>;
  isOpenStartYear?: boolean;
  time?: any;
  listBirthYearMin?: Array<any>;
  listBirthYearMax?: Array<any>;
  typeUpdateInfor?: boolean
  mobile?: boolean;
  inviteCode?: string
}

class Register extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      body: {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        gender: "MALE",
        phone: null,
        schoolYearStart: 0,
        schoolYearEnd: 0,
        majorID: null,
        schoolID: null,
        inviteCode: null,
      },
      show_password: false,
      show_re_password: false,
      marker: {
        lat: 21.0223575259305,
        lng: 105.82227458143632,
        x: 0,
        y: 0,
      },
      checked: true,
      is_exactly_email: false,
      is_exactly_pw: false,
      is_exactly_phone: false,
      is_exactly_firstname: false,
      is_exactly_lastname: false,
      is_exactly_rpw: 0,
      is_except_rule: false,
      is_exactly_schoolYearStart: false,
      exactly_schoolYearEnd: 0,
      is_exactly_majorID: false,
      is_exactly_schoolID: false,
      show_popup: false,
      repassword: "",
      location: "",
      list_major: [],
      list_school: [],
      is_exists: false,
      isOpenStartYear: false,
      time: null,
      listBirthYearMin: [],
      listBirthYearMax: [],
      typeUpdateInfor: false,
      // inviteCode: ''
    };
  }
  async componentDidMount() {
    let { body, repassword } = this.state;
    this.setState({ listBirthYearMin: this.listYear(1970, 2035), listBirthYearMax: this.listYear(1970, 2035) })
    let res_school = await _post(null, SCHOOLS, PUBLIC_HOST, noInfoHeader);
    // console.log(res_school);
    this.setState({ list_school: res_school.data.items })
    let url = new URL(window.location.href);
    let schoolID = url.searchParams.get('schoolID')

    if (schoolID && schoolID !== undefined) {
      // console.log(schoolID)
      body.schoolID = schoolID
      this.setState({ body, is_exactly_schoolID: true })
      _get(null, `/api/schools/${schoolID}/education/majors/query`, PUBLIC_HOST, noInfoHeader)
        .then((res_major) => {
          this.setState({
            list_major: res_major.data.items
          })
        })
    }

    let inviteCode = url.searchParams.get('inviteCode')
    if (inviteCode) {
      body.inviteCode = inviteCode
      this.setState({ body })
    }

    if (localStorage.getItem("user_exists") === "false") {
      if (body.email) {
        body.email = localStorage.getItem("fb_un");
      }

      this.setState({
        is_exists: true,
        body,
        repassword,
        is_exactly_email: true,
        is_exactly_pw: true,
        is_exactly_rpw: 2,
        typeUpdateInfor: true
      });
    }
  }

  listYear(min, max) {
    let newListBirthYear = [];
    for (let i = max; i > min; i--) {
      newListBirthYear.push({ name: i.toString(), id: i.toString() })
    }
    return newListBirthYear;
  }
  _handleTime = (name) => (value) => {

    let { body } = this.state;
    // let time = moment(value, "YYYY/MM/DD").unix();

    let time = parseInt(value)
    // console.log(typeof(time))
    if (name === "schoolYearStart") {
      body.schoolYearStart = time;
      if (time && time <= body.schoolYearEnd) {
        this.setState({ is_exactly_schoolYearStart: true, exactly_schoolYearEnd: 1 })
      } else if (time && time > body.schoolYearEnd) {
        this.setState({ is_exactly_schoolYearStart: true })
        this.setState({ exactly_schoolYearEnd: 2 })
      } else {
        this.setState({ is_exactly_schoolYearStart: false })
      }
    } else {
      body.schoolYearEnd = time;
      if (time && time >= body.schoolYearStart) {
        this.setState({ exactly_schoolYearEnd: 1 })
      } else if (time && time < body.schoolYearStart) {
        this.setState({ exactly_schoolYearEnd: 2 })
      } else {
        this.setState({ exactly_schoolYearEnd: 0 })
      }
    }
    this.setState({
      body,
    });
  };

  _choseMajor = (value) => {
    let { body } = this.state;
    this.setState({ is_exactly_majorID: true })
    body.majorID = value;
    this.setState({ body });
  };

  _choseSchool = (value) => {
    let { body } = this.state;
    if (value && value !== "") {
      this.setState({ is_exactly_schoolID: true, is_exactly_majorID: false })
      body.schoolID = value;
      body.majorID = undefined;
      this.setState({ body });
      _get(null, `/api/schools/${value}/education/majors/query`, PUBLIC_HOST, noInfoHeader)
        .then((res_major) => {
          this.setState({
            list_major: res_major.data.items
          })
        })
    }
  };

  _handleInput = (event) => {
    let {
      body,
      is_exactly_pw,
      is_exactly_firstname,
      is_exactly_lastname,
      is_exactly_email,
      is_exactly_rpw,
      is_exactly_phone,
      repassword,
    } = this.state;
    const param = event.target.id;
    let value = event.target.value;

    // Check Value
    switch (param) {
      case "firstName":
        if (value.length > 0) {
          is_exactly_firstname = true;
        } else {
          is_exactly_firstname = false;
        }
        break;
      case "lastName":
        if (value.length > 0) {
          is_exactly_lastname = true;
        } else {
          is_exactly_lastname = false;
        }
        break;
      case "phone":
        if (
          isNumeric(value) === true &&
          (value.length === 10 || value.length === 11)
        ) {
          is_exactly_phone = true;
        } else {
          is_exactly_phone = false;
        }
        break;
      case "email":
        is_exactly_email = false;
        for (let i = 0; i < value.length; i++) {
          if (value[i] === "@") {
            is_exactly_email = true;
            break;
          }
        }
        break;

      case "password":
        console.log('password')
        if (value.length > 5) {
          is_exactly_pw = true;
        } else {
          is_exactly_pw = false;
        }
        if (value === this.state.repassword) {
          is_exactly_rpw = 2;
        } else {
          is_exactly_rpw = 1;
        }
        break;

      case "repassword":
        console.log('repassword')
        if (value === body.password) {
          is_exactly_rpw = 2;
        } else {
          is_exactly_rpw = 1;
        }
        break;
      default:
        break;
    }

    if (param === "repassword") {
      repassword = value;
    } else {
      body[param] = value;
    }

    this.setState({
      body,
      is_exactly_firstname,
      is_exactly_lastname,
      is_exactly_email,
      is_exactly_rpw,
      is_exactly_pw,
      is_exactly_phone,
      repassword,
    });
  };

  _openMap = () => {
    this.setState({ show_popup: true });
  };

  _setMap = () => {
    let { marker } = this.props;
    let { location, body } = this.state;
    body.lat = marker.lat;
    body.lon = marker.lng;
    let address = localStorage.getItem("location");
    location = address;
    this.setState({ marker, location, show_popup: false, body });
  };

  _handleClose = () => {
    let { show_popup } = this.state;
    show_popup = false;
    this.setState({ show_popup });
  };

  _handleCheckbox = (e) => {
    this.setState({ is_except_rule: e.target.checked });
  };

  _handleGender = (e) => {
    let { body, checked } = this.state;
    body.gender = e.target.value;
    checked = !checked;
    this.setState({ body, checked });
  };

  getLatLngFromMap = (lat, lng, address) => {
    let { location, body } = this.state;
    body.lat = lat;
    body.lon = lng;
    location = address;
    this.setState({
      location,
      show_popup: false,
      body,
    });
  };

  onSearchSchool = async (value) => {
    let res_school = await _post(null, SCHOOLS, PUBLIC_HOST, noInfoHeader);
    if (res_school && res_school.data) {
      this.setState({ list_school: res_school.data.items })
    }

  }
  requestToServer = async () => {
    this.setState({ loading: true });
    let {
      body,
      is_exactly_firstname,
      is_exactly_lastname,
      is_exactly_email,
      is_exactly_pw,
      is_exactly_phone,
      is_except_rule,
      repassword,
      email
    } = this.state;

    if (
      is_exactly_firstname === false ||
      is_exactly_lastname === false ||
      is_exactly_email === false ||
      is_exactly_pw === false ||
      is_exactly_phone === false
    ) {
      swal({
        title: "Workvn thông báo",
        icon: "error",
        text: "Vui lòng nhập đầy đủ các trường thông tin",
      });
      this.setState({ loading: false });
    } else if (body && body.password !== repassword) {
      swal({
        title: "Workvn thông báo",
        icon: "error",
        text: "Nhập lại mật khẩu không chính xác",
      });
      this.setState({ loading: false });
    } else if (is_except_rule === false) {
      swal({
        title: "Workvn thông báo",
        icon: "error",
        text: "Bạn chưa đồng ý với điều khoản của Worksvn",
      });
    } else {
      if (localStorage.getItem("login_type") === "FB") {
        await _requestToServer(
          POST,
          {
            userID: localStorage.getItem("fb_uid"),
            username: localStorage.getItem("fb_un"),
            isActivated: true
          },
          `/api/students/registration/facebook`,
          null,
          authHeaders,
          null,
          true
        )
      } else
      await _requestToServer(
        POST,
        body,
        `/api/students/registration?schoolID=${body.schoolID}`,
        null,
        noInfoHeader,
        null,
        true, null, null, this.state.typeUpdateInfor ? `Hoàn tất thông tin thành công!` : `Đăng ký thành công,
        Vui lòng kích hoạt tài khoản trong mail và tiếp tục đăng nhập!`
      ).then((res) => {
        localStorage.setItem('user_exists', "true");
      }).catch(err => {
        this.setState({ loading: false });
        throw exceptionShowNotiConfig(err, false, true)
      })
    }
  };

  render() {
    let {
      email,
      password,
      firstName,
      lastName,
      phone,
      schoolID,
      inviteCode
    } = this.state.body;

    let {
      repassword,
      checked,
      is_exactly_firstname,
      is_exactly_lastname,
      is_exactly_email,
      is_exactly_phone,
      is_exactly_rpw,
      is_exactly_pw,
      list_major,
      is_exists,
      // is_exactly_schoolYearStart,
      // exactly_schoolYearEnd,
      is_exactly_majorID,
      is_exactly_schoolID,
      loading,
      list_school
    } = this.state;

    let { mobile } = this.props;

    return (
      <Layout disableFooterData={false}>
        {/* Form Register */}
        <Row justify="center" className="a_c register-content" style={{ backgroundColor: "#f2f2f2!important" }}>
          <Col
            xs={mobile ? 24 : 12}
            sm={mobile ? 24 : 12}
            md={mobile ? 24 : 12}
            lg={mobile ? 24 : 10}
            xl={mobile ? 24 : 8}
            xxl={mobile ? 24 : 8}
            style={{ backgroundColor: "#f2f2f2" }}
            className={"register-content"}
          >
            <form className="register">
              <div className="title_register a_c">ĐĂNG KÝ</div>
              {/* FirstName And LastName */}
              <Col span={16} className="normal">
                <Input
                  id="firstName"
                  size={"large"}
                  placeholder="Họ (đệm)"
                  style={{ marginBottom: 5 }}
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.4)" }} />
                  }
                  suffix={
                    <Tooltip
                      title={is_exactly_firstname ? "Họ" : "Điền họ"}
                    >
                      <Icon
                        type={is_exactly_firstname ? "check" : "exclamation"}
                        style={{
                          color: is_exactly_firstname ? "green" : "red",
                        }}
                      />
                    </Tooltip>
                  }
                  value={firstName}
                  onChange={this._handleInput}
                  type="text"
                />
              </Col>
              <Col span={8} className="normal">
                <Input
                  size={"large"}
                  id="lastName"
                  placeholder="Tên"
                  // prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  suffix={
                    <Tooltip
                      title={is_exactly_lastname ? "Tên" : "Điền Tên"}
                    >
                      <Icon
                        type={is_exactly_lastname ? "check" : "exclamation"}
                        style={{
                          color: is_exactly_lastname ? "green" : "red",
                        }}
                      />
                    </Tooltip>
                  }
                  value={lastName}
                  onChange={this._handleInput}
                  type="text"
                />
              </Col>
              {/* Gender */}
              <Col span={24} className="normal a_l"
                style={{ margin: "5px 0px", fontWeight: 400 }}>
                Giới tính:
                    <input
                  name="gender"
                  type="checkbox"
                  checked={checked}
                  value="MALE"
                  onChange={this._handleGender}
                  style={{ margin: "0 5px 0 10px" }}
                />
                <span>Nam</span>
                <input
                  name="gender"
                  type="checkbox"
                  checked={!checked}
                  value="FEMALE"
                  onChange={this._handleGender}
                  style={{ margin: "0 5px 0 15px" }}
                />
                <span>Nữ</span>
              </Col>
              {/* Mail */}
              <Col span={24} className="normal">
                <Input
                  id="email"
                  size="large"
                  placeholder="Email"
                  prefix={
                    <Icon type="mail" style={{ color: "rgba(0,0,0,.4)" }} />
                  }
                  suffix={
                    <Tooltip
                      title={
                        is_exactly_email
                          ? "Email chính xác"
                          : "Điền Địa chỉ mail"
                      }
                    >
                      <Icon
                        type={is_exactly_email ? "check" : "exclamation"}
                        style={{ color: is_exactly_email ? "green" : "red" }}
                      />
                    </Tooltip>
                  }
                  value={email}
                  onChange={this._handleInput}
                  type="text"
                />
              </Col>
              {/* Phone */}
              <Col span={24} className="normal">
                <Input
                  id="phone"
                  size="large"
                  placeholder="Số điện thoại"
                  prefix={
                    <Icon type="phone" style={{ color: "rgba(0,0,0,.4)" }} />
                  }
                  suffix={
                    <Tooltip
                      title={
                        is_exactly_phone
                          ? "Số điện thoại chính xác"
                          : "Điền Số điện thoại"
                      }
                    >
                      <Icon
                        type={is_exactly_phone ? "check" : "exclamation"}
                        style={{ color: is_exactly_phone ? "green" : "red" }}
                      />
                    </Tooltip>
                  }
                  value={phone}
                  onChange={this._handleInput}
                  type="text"
                />
              </Col>
              <Col span={24} className="normal">
                <Select
                  size="large"
                  showSearch
                  placeholder="Chọn trường học"
                  style={{ width: "100%" }}
                  optionFilterProp="children"
                  onChange={(event) => this._choseSchool(event)}
                  onSearch={(event) => this.onSearchSchool(event)}
                  showArrow={false}
                  value={schoolID ? schoolID : "Chọn trường học"}
                >
                  {list_school.map((item, index) => {
                    return (
                      <Option value={item.id} key={index}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
                <Tooltip
                  title={
                    is_exactly_schoolID ? "Trường học hợp lệ" : "Chọn Trường học"
                  }
                >
                  <Icon
                    type={is_exactly_schoolID ? "check" : "warning"}
                    style={{ color: is_exactly_schoolID ? "green" : "orange", position: 'absolute', marginLeft: -25, marginTop: 8 }}
                  />
                </Tooltip>
              </Col>
              <Col span={24} className="normal">
                <Select
                  size="large"
                  showSearch
                  placeholder={!schoolID ? <i>Vui lòng chọn trường!</i> : "Chọn ngành học"}
                  style={{ width: "100%" }}
                  onChange={(event) => this._choseMajor(event)}
                  disabled={schoolID ? false : true}
                  showArrow={false}
                  value={this.state.body.majorID ? this.state.body.majorID : "Chọn ngành học"}
                >
                  {list_major.map((item, index) => {
                    return (
                      <Option value={item.id} key={index}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
                <Tooltip
                  title={
                    is_exactly_majorID ? "Ngành học hợp lệ" : "Chọn Ngành học"
                  }
                >
                  <Icon
                    type={is_exactly_majorID ? "check" : "warning"}
                    style={{ color: is_exactly_majorID ? "green" : "orange", position: 'absolute', marginLeft: -25, marginTop: 8 }}
                  />
                </Tooltip>
              </Col>

              {/* <div className="normal" style={{ display: 'flex', flexDirection: 'row' }}>
                  <Select
                    showSearch
                    placeholder="Năm học bắt đầu"
                    style={{ width: "49%", marginRight: 15 }}
                    optionFilterProp="children"
                    onChange={this._handleTime("schoolYearStart")}
                    filterOption={(input, option) =>
                      // @ts-ignore
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    showArrow={false}
                  >
                    {this.state.listBirthYearMin.map((item, index) => {
                      return (
                        <Option value={item.id} key={index}>
                          {item.name}
                        </Option>
                      );
                    })}
                  </Select>
                  <Tooltip
                    title={
                      is_exactly_schoolYearStart ? "Năm học bắt đầu hợp lệ" : "Chọn năm học bắt đầu"
                    }
                  >
                    <Icon
                      type={is_exactly_schoolYearStart ? "check" : "exclamation"}
                      style={{ color: is_exactly_schoolYearStart ? "green" : "red",  position: 'relative', marginLeft: -35, marginTop: 8}}
                    />
                  </Tooltip>
                <Select
                  showSearch
                  placeholder="Năm học kết thúc"
                  style={{ width: "49%", marginLeft: 15 }}
                  optionFilterProp="children"
                  onChange={this._handleTime("schoolYearEnd")}
                  filterOption={(input, option) =>
                    // @ts-ignore
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  showArrow={false}
                >
                  {this.state.listBirthYearMax.map((item, index) => {
                    return (
                      <Option value={item.id} key={index}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
                <Tooltip
                  title={
                    validSchoolYearEnd[exactly_schoolYearEnd]
                  }
                >
                  <Icon
                    type={exactly_schoolYearEnd === 1 ? "check" : "exclamation"}
                    style={{ color: exactly_schoolYearEnd === 1 ? "green" : "red", position: 'relative', marginLeft: -25, marginTop: 8 }}
                  />
                </Tooltip>
              </div>
              */}
              {/* Password */}
              <Col span={24} className="normal">
                <Input
                  id="password"
                  size="large"
                  placeholder="Mật khẩu"
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.4)" }} />
                  }
                  suffix={
                    <div style={{ flexDirection: 'row' }}>
                      <Icon
                        type={this.state.show_password ? "eye-invisible" : "eye"}
                        onClick={() => {
                          this.setState({ show_password: !this.state.show_password })
                        }}
                        style={{ marginRight: 5 }}
                      />
                      <Tooltip
                        title={
                          is_exactly_pw ? "Mật khẩu hợp lệ" : "Mật khẩu quá ngắn"
                        }
                      >
                        <Icon
                          type={is_exactly_pw ? "check" : "exclamation"}
                          style={{ color: is_exactly_pw ? "green" : "red" }}
                        />
                      </Tooltip>
                    </div>
                  }
                  value={password}
                  onChange={this._handleInput}
                  type={!this.state.show_password ? "password" : null}
                />
              </Col>

              {/* RePassword */}
              <Col span={24} className="normal">
                <Input
                  id="repassword"
                  size="large"
                  placeholder="Nhập lại mật khẩu"
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.4)" }} />
                  }
                  suffix={
                    <div style={{ flexDirection: 'row' }}>
                      <Icon
                        type={this.state.show_re_password ? "eye-invisible" : "eye"}
                        onClick={() => {
                          this.setState({ show_re_password: !this.state.show_re_password })
                        }}
                        style={{ marginRight: 5 }}
                      />
                      <Tooltip
                        title={
                          validRePassword[is_exactly_rpw]
                        }
                      >
                        <Icon
                          type={is_exactly_rpw === 2 ? "check" : "exclamation"}
                          style={{ color: is_exactly_rpw === 2 ? "green" : "red" }}
                        />
                      </Tooltip>
                    </div>
                  }
                  value={repassword}
                  onChange={this._handleInput}
                  type={!this.state.show_re_password ? "password" : null}
                />
              </Col>
              {/* inviteCode */}
              <Col span={24} className="normal">
                <Input
                  id="inviteCode"
                  size="large"
                  placeholder="Mã giới thiệu (nếu có)"
                  prefix={
                    <Icon type="qrcode" style={{ color: "rgba(0,0,0,.4)" }} />
                  }
                  value={inviteCode}
                  onChange={this._handleInput}
                />
              </Col>
              {/* Except */}
              <Col span={24} className="normal a_l" style={{ marginTop: 25 }}>
                <p className="fogot-password">
                  <Checkbox onChange={this._handleCheckbox}>
                    Đồng ý với{" "}
                    <a href="/" target="_blank" style={{ color: "#4a9ae1" }}>
                      điều khoản
                    </a>{" "}
                    của Worksvn
                  </Checkbox>
                </p>
                <p>
                  <Button
                    type="primary"
                    size="large"
                    onClick={() => this.requestToServer()}
                    // disabled={!is_except_rule}
                    block
                  >
                    {loading ? <Icon type="loading" /> : 'Hoàn tất'}
                  </Button>
                </p>
                <p className="a_c">
                  Bạn đã có tài khoản ?{" "}
                  <label onClick={() => goBackWhenLogined('login')} style={{ color: "red" }} >
                    <b> Đăng nhập</b>
                  </label>
                </p>
              </Col>
            </form>
          </Col>
          <Col
            xs={mobile ? 0 : 12}
            sm={mobile ? 0 : 12}
            md={mobile ? 0 : 12}
            lg={mobile ? 0 : 14}
            xl={mobile ? 0 : 16}
            xxl={mobile ? 0 : 16}
            style={{ padding: "10px 0px", backgroundColor: "#f2f2f2" }}
          >
            <Affix offsetTop={0}>
              <LazyLoadImage src={imageLogin} className="image-login" alt={"Sự kiện work"} />
            </Affix>
          </Col>
        </Row>

        {/* Map */}
      </Layout>
    );
  }
}

const mapStateToProps = (state: IAppState) => ({
  marker: state.MapState.marker,
  mobile: state.MobileState.isMobile,
});

export default connect(mapStateToProps, null)(Register);
