import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Row, Icon } from "antd";
import Layout from "../layout/Layout";

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

interface IProps {
  personalInfo?: any;
  getData?: Function;
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
  };
  loading?: boolean;
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
      },
      loading: false,
    };
  }

  icon_user = (<Icon type="profile" />);
  icon_list = (<Icon type="ordered-list" />);
  icon_star = (<Icon type="star" />);
  icon_tower = (<Icon type="folder" />);
  icon_bachelor = (<Icon type="read" />);
  icon_solid_star = (<Icon type="star" />);
  icon_regular_star = (<i className="fa fa-star" />);

  async componentDidMount() {

    await this.props.getData();

    this.setState({ loading: false });
  }

  _fixData = (id) => {
    let { profileState } = this.state;
    let param = id;
    profileState[param] = !profileState[param];
    this.setState({ profileState });
  };

  render() {
    let { profileState } = this.state;
    return (
      <Layout disableFooterData={false}>
        <div className="content">
          <Row className="profile">
            {/* Profile */}
            <Col
              xs={24}
              sm={24}
              md={18}
              lg={18}
              xl={16}
              xxl={16}
              className="block-info"
            >
              <Block describe="Thông tin cá nhân" icon={this.icon_user}>
                <div
                  className="icon-fix"
                  onClick={() => this._fixData("person")}
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
              <Block describe="Ảnh CMND/CCCD" icon={this.icon_list}>
                <div
                  className="icon-fix"
                  onClick={() => this._fixData("picture")}
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
              <Block describe="Mục tiêu nghề nghiệp" icon={this.icon_list}>
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
              <Block describe="Kỹ năng chuyên nghành" icon={this.icon_star}>
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

              {/* Language Skills */}
              <Block describe="Ngoại ngữ" icon={this.icon_list}>
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
              <Block describe="Kinh nghiệm làm việc" icon={this.icon_tower}>
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
              <Block describe="Học vấn và bằng cấp" icon={this.icon_bachelor}>
                <div
                  className="icon-fix"
                  onClick={() => this._fixData("education")}
                >
                  <Icon type={"plus"} twoToneColor={"blue"} />
                </div>
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
              md={6}
              lg={6}
              xl={8}
              xxl={4}
              className="candicate-info "
            >
              {/* <div>
                                <p>
                                    <label>THÁI ĐỘ</label>
                                </p>
                                <p>
                                    <label>KĨ NĂNG</label>
                                </p>
                                <p>
                                    <label>HÀI LÒNG</label>
                                </p>

                            </div> */}
            </Col>
          </Row>
        </div>
      </Layout>
    );
  }
}
const mapStateToProps = (state) => {
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
