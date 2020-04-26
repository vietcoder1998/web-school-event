import React, { Component } from "react";
import { connect } from "react-redux";
import { _requestToServer } from "../../../../../../services/exec";
import { Tabs, Tab } from "react-bootstrap";
import { Row, Col, Input, Radio, Select, Popconfirm } from "antd";
import {
  PUBLIC_HOST,
  STUDENTS_HOST,
} from "../../../../../../environment/development";
import { LANGUAGE_SKILL } from "../../../../../../services/api/private.api";
import { REDUX_SAGA } from "../../../../../../const/actions";
import { PUT, DELETE } from "../../../../../../const/method";
import { _get } from "../../../../../../services/base-api";
import { LANGUAGES } from "../../../../../../services/api/public.api";
import ILanguageSkill from "../../../../../../models/language-skill";
import { sendStringHeader } from "../../../../../../services/auth";

let { Option } = Select;

interface IProps {
  index?: string;
  item?: any;
  complete?: string;
  fix?: string;
  getData?: Function;
  _fixDate?: Function;
  id?: string | number;
}

interface IState {
  languageSkill?: ILanguageSkill;
  id?: string;
  activeKey?: string;
  list_language?: Array<any>;
}

class LanguageSkillItem extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      languageSkill: {
        languageID: 0,
        level: "",
        certificate: "",
        score: 0,
      },
      id: "",
      activeKey: this.props.complete,
      list_language: [],
    };
  }

  async componentDidMount() {
    let { languageSkill, activeKey, list_language } = this.state;
    let res_language = await _get(null, LANGUAGES, PUBLIC_HOST);
    list_language = res_language.data.items;
    this.setState({ languageSkill, activeKey, list_language });
  }

  _deleteLanguageSkill = () => {
    let { id } = this.props.id;
    this._createRequest(id);
  };

  _handleSelect = (key) => {
    let { activeKey } = this.state;
    activeKey = key;
    this.setState({ activeKey });
  };

  _choseLevel = (event) => {
    let level = event.target.value;
    this._handleLanguageSkills(level, "level");
  };

  _chooseLanguage = (id) => {
    this._handleLanguageSkills(id, "languageID");
  };

  _handleLanguageSkills = (value, key) => {
    let { languageSkill } = this.state;
    languageSkill[key] = value;
    this.setState({ languageSkill });
  };

  _createRequest = (method) => {
    this.requestServer(method);
  };

  async requestServer(method) {
    let res;
    let { id } = this.props;
    let { languageSkill } = this.state;
    if (method === PUT) {
      res = await _requestToServer(
        PUT,
        languageSkill,
        LANGUAGE_SKILL + "/" + id,
        STUDENTS_HOST,
        null,
        null,
        true
      );
    } else if (method === DELETE) {
      let params = [id];
      let res = await _requestToServer(
        DELETE,
        null,
        LANGUAGE_SKILL,
        STUDENTS_HOST,
        null,
        params,
        true
      );
      if (res) {
        await this.props.getData();
      }
    }
  }

  render() {
    let { index, item, complete, fix } = this.props;
    let { languageSkill, activeKey, list_language } = this.state;
    return (
      <Tabs key={index} activeKey={activeKey} onSelect={() => {}}>
        {/* Update of delete */}
        <Tab eventKey={complete} onSelect={this._handleSelect} id={complete}>
          <div className="wrapper">
            <div className="edit-delete">
              <i
                id={index}
                className="fa fa-edit"
                onClick={() => {
                  this._handleSelect(fix);
                }}
              />
              <Popconfirm
                title="Bạn muốn xóa mục này ？"
                okText="Xóa"
                cancelText="Hủy"
                onConfirm={() => this._createRequest(DELETE)}
                okType={"danger"}
              >
                <i className="fa fa-trash" />
              </Popconfirm>
            </div>
            <div className="language-skills " id={complete}>
              {/* function for button */}
              <Row>
                <Col sm={24} md={12} lg={6}>
                  <label id="language-name">{item.language.name}</label>
                </Col>
                <Col sm={24} md={12} lg={6}>
                  <label>{item.level}</label>
                </Col>
                <Col sm={24} md={12} lg={6}>
                  <label>
                    <i className="fa fa-graduation-cap" />
                    Chứng chỉ: {item.certificate ? item.certificate : "Không"}
                  </label>
                </Col>
                <Col sm={24} md={12} lg={6}>
                  <label>
                    <i className="fa fa-certificate" />
                    Điểm số: {item.score ? item.score : "Không"}
                  </label>
                </Col>
              </Row>
            </div>
          </div>
        </Tab>
        {/* Fix */}
        <Tab eventKey={fix}>
          <div className="wrapper">
            <div className="language-skills-fix">
              <Row>
                <Col xs={24} md={12} lg={12} sm={24}>
                  <p className="language-input">Chọn ngôn ngữ</p>
                  <Select
                    showSearch
                    placeholder="Chose language"
                    style={{ width: "100%" }}
                    optionFilterProp="children"
                    onChange={(event) => this._chooseLanguage(event)}
                    filterOption={(input, option) =>
                      //@ts-ignore
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {list_language.map((item, index) => {
                      return (
                        <Option value={item.id} key={index + "fix_language"}>
                          {item.name}
                        </Option>
                      );
                    })}
                  </Select>
                </Col>
                <Col xs={12} md={12} lg={12} sm={12}>
                  <p className="language-input">Trình độ</p>
                  <Radio.Group
                    onChange={this._choseLevel}
                    value={languageSkill.level}
                  >
                    <Radio value={"Bản địa"}>Bản địa</Radio>
                    <Radio value={"Sơ cấp"}>Sơ cấp</Radio>
                    <Radio value={"Trung cấp"}>Trung cấp</Radio>
                    <Radio value={"Cao cấp"}>Cao cấp</Radio>
                  </Radio.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={24} md={12} lg={12} sm={24}>
                  <p className="language-input">Chứng chỉ</p>
                  <Input
                    placeholder="Certificate"
                    value={languageSkill.certificate}
                    onChange={(event) =>
                      this._handleLanguageSkills(
                        event.target.value,
                        "certificate"
                      )
                    }
                  />
                </Col>
                <Col xs={24} md={12} lg={12} sm={24}>
                  <p>Điểm số</p>
                  <Input
                    placeholder="Score"
                    value={languageSkill.score}
                    onChange={(event) =>
                      this._handleLanguageSkills(event.target.value, "score")
                    }
                  />
                </Col>
              </Row>
              {/* Button holder */}
              <Row className="holder-button">
                <Col xs={12}>
                  <button
                    className="danger"
                    onClick={() => this._handleSelect(complete)}
                  >
                    {" "}
                    Hủy
                  </button>
                </Col>
                <Col xs={12}>
                  <button
                    className="request"
                    onClick={() => this._createRequest(PUT)}
                  >
                    {" "}
                    Lưu
                  </button>
                </Col>
              </Row>
            </div>
          </div>
        </Tab>
      </Tabs>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getData: () => dispatch({ type: REDUX_SAGA.PERSON_INFO.GET_PERSON_INFO }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSkillItem);
