import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Row, Icon, Anchor } from "antd";
import Layout from "../layout/Layout";
import { Tooltip, Affix } from 'antd';

// Layer
import Block from "../layout/block/Block";
import FixShortProfile from "./fix/FixShortProfile";
import ShortProfile from "./infor/ShortProfile";
import FixDescription from "./fix/FixDescription";
import Description from "./infor/Description";
import FixSkills from "./fix/FixSkills";
import Skills from "./infor/Skills";

// import Info from '../layout/info/Info';
import FixExperience from "./fix/FixExperience";
import Experience from "./infor/Experience";
import Education from "./infor/Education";
import FixEducation from "./fix/FixEducation";
import LanguageSkills from "./infor/LanguageSkills";
import FixPicture from "./fix/FixPicture";
import Picture from "./infor/Picture";

// Service
import FixLanguageSkills from "./fix/FixLanguageSkills";
// import moveScrollBar from '../../assets/js/moveScroll';
import { POST, PUT } from "../../const/method";
import { REDUX_SAGA } from "../../const/actions";
import CVviewer from './CVviewer';
import { IAppState } from "../../redux/store/reducer";
import LeftBar from './../layout/common/SideBar';
import FixTools from './fix/FixTools';
import Tools from './infor/Tools';
import { Dropzone } from './../layout/common/Dropzone';
const { Link } = Anchor;

interface IProps {
  personalInfo?: any;
  getData?: Function;
  history?: any;
}

interface IState {
  profileState?: {
    person?: boolean;
    description?: boolean;
    skills?: boolean;
    langugeSkills?: boolean;
    experiences?: boolean;
    education?: boolean;
    picture?: boolean;
    tools?: boolean;
  };
  loading?: boolean;
  cvUrl?: string;
}

class Profile extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      profileState: {
        person: false,
        description: false,
        skills: false,
        langugeSkills: false,
        experiences: false,
        education: false,
        picture: false,
        tools: false,
      },
      loading: false,
      cvUrl: null,
    };
  }

  icon_user = (<Icon type="profile" />);
  icon_list = (<Icon type="ordered-list" />);
  icon_star = (<Icon type="star" />);
  icon_tower = (<Icon type="folder" />);
  icon_bachelor = (<Icon type="read" />);
  icon_solid_star = (<Icon type="star" />);
  icon_tools = (<Icon type="tool" />);

  async componentDidMount() {

    await this.props.getData();
    this.setState({ loading: false });
  }

  _fixData = (id?: string) => {
    let { profileState } = this.state;
    let param = id;
    profileState[param] = !profileState[param];
    this.setState({ profileState });
    window.location.assign(`/profile#${id}`);
  };

  componentWillUnmount() {
    window.removeEventListener("scroll", () => { console.log("out scroll") })
  }

  render() {
    let { profileState, cvUrl } = this.state;
    return (
      <Layout disableFooterData={false}>
        <LeftBar />
        <div className="content">
          <Row className="profile">
            {/* Profile */}
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={14}
              xl={13}
              xxl={13}
              className="block-info"
            >
              <Block
                describe="Thông tin cá nhân"
                icon={this.icon_user}
                id={"person"}
              >
                <div
                  className="icon-fix"
                  onClick={() => {
                    this._fixData("person");
                  }}
                >
                  <Icon type="edit" />
                </div>
                {profileState["person"] ? (
                  <FixShortProfile _fixData={this._fixData} />
                ) : (
                    <ShortProfile />
                  )}
              </Block>
              {/* picture */}
              <Block
                describe="Ảnh CMND/CCCD"
                icon={this.icon_list}
                id={"picture"}
              >
                <div
                  className="icon-fix"
                  onClick={() => { this._fixData("picture"); window.location.assign("/profile#picture") }}
                >
                  <Icon type="edit" />
                </div>
                {profileState["picture"] ? (
                  <FixPicture _fixData={this._fixData} method={PUT} />
                ) : (
                    <Picture />
                  )}
              </Block>

              {/* Description */}
              <Block
                describe="Mục tiêu nghề nghiệp"
                icon={this.icon_list}
                id={"description"}
              >
                <div
                  className="icon-fix"
                  onClick={() => this._fixData("description")}
                >
                  <Icon type="edit" />
                </div>
                {profileState["description"] ? (
                  <FixDescription _fixData={this._fixData} method={PUT} />
                ) : (
                    <Description />
                  )}
              </Block>

              {/* Skill */}
              <Block
                describe="Kỹ năng mềm"
                icon={this.icon_star}
                id={"skills"}
              >
                <div
                  className="icon-fix"
                  onClick={() => this._fixData("skills")}
                >
                  <Icon type="edit" />
                </div>
                {profileState["skills"] ? (
                  <FixSkills _fixData={this._fixData} />
                ) : (
                    <Skills />
                  )}
              </Block>

              {/*Tool*/}
              <Block
                describe="Công cụ chuyên môn"
                icon={this.icon_tools}
                id={"tools"}
              >
                <div
                  className="icon-fix"
                  onClick={() => this._fixData("tools")}
                >
                  <Icon type="edit" />
                </div>
                {profileState["tools"] ? (
                  <FixTools _fixData={this._fixData} />
                ) : (
                    <Tools />
                  )}
              </Block>

              {/* Language Skills */}
              <Block
                describe="Ngoại ngữ"
                icon={this.icon_list}
                id="languageSkill"
              >
                <div
                  className="icon-fix"
                  onClick={() => this._fixData("languageSkill")}
                >
                  <Icon type={"plus"} twoToneColor={"blue"} />
                </div>
                <LanguageSkills />
                {profileState["languageSkill"] ? (
                  <FixLanguageSkills _fixData={this._fixData} method={POST} />
                ) : null}
              </Block>

              {/* Experience */}
              <Block
                describe="Kinh nghiệm làm việc"
                icon={this.icon_tower}
                id="experience"
              >
                <div
                  className="icon-fix"
                  onClick={() => this._fixData("experience")}
                >
                  <Icon type={"plus"} twoToneColor={"blue"} />
                </div>
                <Experience />
                {profileState["experience"] ? (
                  <FixExperience _fixData={this._fixData} method={POST} />
                ) : null}
              </Block>

              {/* Education */}
              <Block
                describe="Học vấn và bằng cấp"
                icon={this.icon_bachelor}
                id="education"
              >
                <Tooltip title="Mục này đang tạm khóa để sửa" >
                  <div
                    className="icon-fix"
                    onClick={() => this._fixData("education")}
                  >
                    <Icon type={"plus"} style={{ color: "red" }} twoToneColor={"blue"} />
                  </div>
                </Tooltip>

                {profileState["education"] ? (
                  <FixEducation _fixData={this._fixData} method={POST} />
                ) : (
                    <Education />
                  )}
              </Block>
              {/* ShortProfileal Info */}
            </Col>
            {/* Comment */}
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={9}
              xl={8}
              xxl={8}
              className="candicate-info "
            >
              <Dropzone onCallSuccess={(cvUrl) => this.setState({ cvUrl }, () => this.forceUpdate())} />
              <Affix offsetTop={5}>
                <CVviewer cvUrl={cvUrl ? cvUrl : this.props.personalInfo.personalInfo.cvUrl} />
              </Affix>
            </Col>
            <Col
              xs={0}
              sm={0}
              md={0}
              lg={3}
              xl={3}
              xxl={3}
            >
              <Anchor
                offsetTop={5}
                showInkInFixed={true}
                style={{
                  marginRight: -40,
                  padding: '5px',
                  marginLeft: '5px',
                  backgroundColor: 'rgb(0,0,0,0)',
                  fontWeight: 500
                }}
                className="hidden-mobile"
              >
                <Link href="#person" title="Hồ sơ cá nhân" />
                <Link href="#picture" title="Ảnh CMND" />
                <Link href="#skills" title="Kỹ năng mềm" />
                <Link href="#tools" title="Công cụ chuyên môn" />
                <Link href="#description" title="Mục tiêu nghề nghiệp" />
                <Link href="#languageSkill" title="Kỹ năng ngôn ngữ" />
                <Link href="#experience" title="Kinh nghiệm" />
                <Link href="#education" title="Học vấn" />
              </Anchor>
            </Col>
          </Row>
        </div>
      </Layout>
    );
  }
}
const mapStateToProps = (state?: IAppState) => {
  return {
    isAuthen: state.AuthState.isAuthen,
    personalInfo: state.FullPersonalInfo,
    dataRedux: state,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getData: () =>
    dispatch({
      type: REDUX_SAGA.PERSON_INFO.GET_FULL_PERSON_INFO,
    }),
});


export default connect(mapStateToProps, mapDispatchToProps)(Profile);
