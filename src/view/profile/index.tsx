import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Row, Icon, Anchor, Collapse } from "antd";
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
// import LeftBar from './../layout/common/SideBar';
import FixTools from './fix/FixTools';
import Tools from './infor/Tools';
import { Dropzone } from './../layout/common/Dropzone';
import { TYPE } from './../../const/type';
const { Link } = Anchor;
const { Panel } = Collapse;
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
  listActiveKeyCV?: any,
  activeKeyCV?: any
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
      activeKeyCV: true,
      listActiveKeyCV: []
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

    await this.props.getData(this.setActiveKeyCV, this.setActiveKeyCV2);
    this.setState({ loading: false });
  }
  setActiveKeyCV= () =>  {
    this.setState({activeKeyCV: false, listActiveKeyCV: []})
  }
  setActiveKeyCV2= () => {
    this.setState({activeKeyCV: true, listActiveKeyCV: ['1']})
  }
  // static getDerivedStateFromProps(props, state) { 
  //   if(props.)
  // }
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
        {/* <LeftBar /> */}
        <div className="content-profile">
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
                id={TYPE.PERSON}
              >
                <div
                  className="icon-fix"
                  onClick={() => {
                    this._fixData(TYPE.PERSON);
                  }}
                >
                  <Icon type="edit" />
                </div>
                {profileState[TYPE.PERSON] ? (
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
                id={TYPE.DESCRIPTION}
              >
                <div
                  className="icon-fix"
                  onClick={() => this._fixData(TYPE.DESCRIPTION)}
                >
                  <Icon type="edit" />
                </div>
                {profileState[TYPE.DESCRIPTION] ? (
                  <FixDescription _fixData={this._fixData} method={PUT} />
                ) : (
                    <Description onClick={this._fixData} />
                  )}
              </Block>

              {/* Skill */}
              <Block
                describe="Kỹ năng mềm"
                icon={this.icon_star}
                id={TYPE.SKILLS}
              >
                <div
                  className="icon-fix"
                  onClick={() => this._fixData(TYPE.SKILLS)}
                >
                  <Icon type="edit" />
                </div>
                {profileState[TYPE.SKILLS] ? (
                  <FixSkills _fixData={this._fixData} />
                ) : (
                    <Skills onClick={this._fixData} />
                  )}
              </Block>

              {/*Tool*/}
              <Block
                describe="Công cụ chuyên môn"
                icon={this.icon_tools}
                id={TYPE.TOOLS}
              >
                <div
                  className="icon-fix"
                  onClick={() => this._fixData(TYPE.TOOLS)}
                >
                  <Icon type="edit" />
                </div>
                {profileState[TYPE.TOOLS] ? (
                  <FixTools _fixData={this._fixData} />
                ) : (
                    <Tools onClick={this._fixData} />
                  )}
              </Block>

              {/* Language Skills */}
              <Block
                describe="Ngoại ngữ"
                icon={this.icon_list}
                id={TYPE.LANGUAGE_SKILL}
              >
                <div
                  className="icon-fix"
                  onClick={() => this._fixData(TYPE.LANGUAGE_SKILL)}
                >
                  <Icon type={"plus"} twoToneColor={"blue"} />
                </div>
                <LanguageSkills/>
                {profileState[TYPE.LANGUAGE_SKILL] ? (
                  <FixLanguageSkills _fixData={this._fixData} method={POST} />
                ) : null}
              </Block>

              {/* Experience */}
              <Block
                describe="Kinh nghiệm làm việc"
                icon={this.icon_tower}
                id={TYPE.EXPERIENCE}
              >
                <div
                  className="icon-fix"
                  onClick={() => this._fixData(TYPE.EXPERIENCE)}
                >
                  <Icon type={"plus"} twoToneColor={"blue"} />
                </div>
                <Experience />
                {profileState[TYPE.EXPERIENCE] ? (
                  <FixExperience _fixData={this._fixData} method={POST} />
                ) : null}
              </Block>

              {/* Education */}
              <Block
                describe="Học vấn và bằng cấp"
                icon={this.icon_bachelor}
                id={TYPE.EDUCATION}
              >
                <Tooltip title="Mục này đang tạm khóa" >
                  <div
                    className="icon-fix"
                  // onClick={() => this._fixData(TYPE.EDUCATION)}
                  >
                    <Icon type={"plus"} style={{ color: "red" }} twoToneColor={"blue"} />
                  </div>
                </Tooltip>

                {profileState[TYPE.EDUCATION] ? (
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
            >
              <Collapse
                expandIconPosition={'left'}
                activeKey={this.state.listActiveKeyCV}
                onChange={e => {
                  this.setState({listActiveKeyCV: e})
                  if(e.length > 0 ) {
                    this.setState({activeKeyCV: true})
                  } else {
                    this.setState({activeKeyCV: false})
                  }
                }}
              >
                <Panel header={!this.props.personalInfo.personalInfo.cvUrl ? "CV cá nhân" : "Sửa CV cá nhân"} key="1" extra={this.state.activeKeyCV ? <Icon type="caret-up" /> : <Icon type="edit" /> } showArrow={false}>
                  <Dropzone onCallSuccess={(cvUrl) => this.setState({ cvUrl }, () => this.forceUpdate())} />
                  
                </Panel>
                {cvUrl || this.props.personalInfo.personalInfo.cvUrl ? <Affix  offsetTop={-105} offsetBottom={5}>
                <CVviewer cvUrl={cvUrl ? cvUrl : this.props.personalInfo.personalInfo.cvUrl} />
              </Affix> : null}
              </Collapse>
              
            </Col>
            <Col
              xs={0}
              sm={0}
              md={0}
              lg={0}
              xl={3}
              xxl={3}
            >
              <Anchor
                showInkInFixed={true}
                style={{
                  marginRight: -80,
                  padding: '5px',
                  marginLeft: '5px',
                  backgroundColor: 'rgb(0,0,0,0)',
                  fontWeight: 500
                }}
                className="hidden-mobile"
              >
                <Link href="#person" title="Hồ sơ cá nhân" />
                <Link href="#picture" title="Ảnh CMND" />
                <Link href="#description" title="Mục tiêu nghề nghiệp" />
                <Link href="#skills" title="Kỹ năng mềm" />
                <Link href="#tools" title="Công cụ chuyên môn" />
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
  getData: (setActiveKeyCV, setActiveKeyCV2) =>
    dispatch({
      type: REDUX_SAGA.PERSON_INFO.GET_FULL_PERSON_INFO, setActiveKeyCV, setActiveKeyCV2
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
