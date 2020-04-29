import React, { Component } from 'react';
import { connect } from 'react-redux';
import { _requestToServer } from '../../../../../../services/exec';
import { Tabs, Tab } from 'react-bootstrap';
import { Row, Col, Input, Radio, Select, Popconfirm, Icon } from 'antd';
import { PUBLIC_HOST } from '../../../../../../environment/development';
import { LANGUAGE_SKILL } from '../../../../../../services/api/private.api';
import { REDUX_SAGA } from '../../../../../../const/actions';
import { PUT, DELETE } from '../../../../../../const/method';
import { _get } from '../../../../../../services/base-api';
import { LANGUAGES } from '../../../../../../services/api/public.api';
import ILanguageSkill from '../../../../../../models/language-skill';
import '../LanguageSkills.scss'
let { Option } = Select;

interface IProps {
    index?: string,
    item?: any,
    complete?: string,
    fix?: string
    getData?: Function;
    _fixDate?: Function;
    id?: string | number;
}

interface IState {
    languageSkill?: ILanguageSkill;
    id?: string,
    activeKey?: string,
    list_language?: Array<any>,
    loading?: boolean
}

class LanguageSkillItem extends Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.state = {
            languageSkill: {
                languageID: 0,
                level: "",
                certificate: "",
                score: 0
            },
            id: '',
            activeKey: this.props.complete,
            list_language: [],
            loading: false
        }

    }

    async componentDidMount() {
        let { languageSkill, activeKey, list_language } = this.state;
        let res_language = await _get(null, LANGUAGES, PUBLIC_HOST, {});
        list_language = res_language.data.items;
        if (this.props.item) {
            // console.log(this.props.item)
            languageSkill.languageID = this.props.item.language.id
            languageSkill.level = this.props.item.level
            languageSkill.certificate = this.props.item.certificate
            languageSkill.score = this.props.item.score
        }
        this.setState({ languageSkill, activeKey, list_language });
    }

    _deleteLanguageSkill = () => {
        let { id } = this.props.id;
        this._createRequest(id);
    }

    _handleSelect = (key) => {
        // console.log(this.props.item)
        let { activeKey } = this.state;
        activeKey = key;
        this.setState({ activeKey })
    }

    _choseLevel = (event) => {
        let level = event.target.value
        this._handleLanguageSkills(level, "level")
    }

    _chooseLanguage = (id) => {
        this._handleLanguageSkills(id, "languageID")
    }

    _handleLanguageSkills = (value, key) => {
        let { languageSkill } = this.state;
        languageSkill[key] = value;
        this.setState({ languageSkill })
    }

    _createRequest = (method) => {
        this.requestServer(method);
    }

    async requestServer(method) {
        let res;
        let { id, complete } = this.props;
        let { languageSkill } = this.state;
        if (method === PUT) {
            if (
                languageSkill.languageID === null ||
                languageSkill.level === '') {
            } else {
                this.setState({loading: true})
                res = await _requestToServer(PUT, languageSkill, LANGUAGE_SKILL + '/' + id, null, null, null, true);
                if (res) {
                    await this.props.getData();
                }
                this.setState({loading: false})
                await this._handleSelect(complete);
            }
        } else if (method === DELETE) {
            let params = [id]
            this.setState({loading: true})
            res = await _requestToServer(DELETE, null, LANGUAGE_SKILL, null, null, params, true);
            this.setState({loading: false})
            if (res) {
                await this.props.getData();
            }
        }
    }

    render() {
        let { index, item, complete, fix } = this.props;
        let { languageSkill, activeKey, list_language, loading } = this.state;
        return (
            <Tabs key={index} activeKey={activeKey} onSelect={() => { }} >
                {/* Update of delete */}
                <Tab eventKey={complete} onSelect={this._handleSelect} id={complete} >

                    <div className='wrapper'>
                        <div className="edit-delete">
                            <i id={index} className="fa fa-edit" onClick={() => { 
                                this._handleSelect(fix)
                                this.setState({languageSkill: 
                                    { ...languageSkill, 
                                        certificate: this.props.item.certificate,
                                        score: this.props.item.score,
                                        level: this.props.item.level
                                    }})
                            }} />
                            <Popconfirm
                                title="Bạn muốn xóa mục này ？"
                                okText="Xóa"
                                cancelText="Hủy"
                                onConfirm={() => this._createRequest(DELETE)}
                                okType={'danger'}                            >
                                <i className="fa fa-trash" />
                            </Popconfirm>
                        </div>
                        <div className="language-skills " id={complete}>
                            {/* function for button */}
                            <Row>
                                <Col sm={24} md={12} lg={6}>
                                    <label id="language-name">
                                        {item.language.name}
                                    </label>
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
                <Tab eventKey={fix}  >
                    <div className='wrapper'>
                        <div className='language-skills-fix'>
                            <Row>
                                <Col xs={24} sm={24} md={8} lg={8} style={{marginBottom: 10}}>
                                    <p className='language-input'>
                                        Chọn ngôn ngữ
                                        </p>
                                    <Select
                                        showSearch
                                        placeholder="Chose language"
                                        style={{ width: "100%" }}
                                        optionFilterProp="children"
                                        onChange={(event) => this._chooseLanguage(event)}
                                        filterOption={(input, option) =>
                                            //@ts-ignore
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        value={this.props.item.language.id}
                                    >
                                        {list_language.map((item, index) => {
                                            return <Option value={item.id} key={index + "fix_language"}>{item.name}</Option>
                                        })}
                                    </Select>
                                </Col>
                                <Col xs={0} sm={0} md={16} lg={16} ></Col>
                                <Col xs={24} sm={24} md={24} lg={24} style={{marginBottom: 10}}>
                                    <p className='language-input'>
                                        Trình độ
                                        </p>
                                    <Radio.Group onChange={this._choseLevel} value={languageSkill.level}>
                                        <Radio value={"Bản địa"}>Bản địa</Radio>
                                        <Radio value={"Sơ cấp"}>Sơ cấp</Radio>
                                        <Radio value={"Trung cấp"}>Trung cấp</Radio>
                                        <Radio value={"Cao cấp"}>Cao cấp</Radio>
                                    </Radio.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={24} sm={24} md={16} lg={16} style={{ paddingRight: 10}}>
                                    <p className='language-input'>
                                        Chứng chỉ
                                        </p>
                                    <Input placeholder='Certificate' value={languageSkill.certificate} onChange={(event) => this._handleLanguageSkills(event.target.value, "certificate")} />

                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} >
                                    <p>
                                        Điểm số
                                        </p>
                                    <Input placeholder='Score' value={languageSkill.score} onChange={(event) => this._handleLanguageSkills(event.target.value, "score")} />
                                </Col>

                            </Row>
                            {/* Button holder */}
                            <Row className='holder-button' style={{justifyContent: 'flex-end', display: 'flex', textAlign: 'right'}}>
                                <Col xs={24}>
                                    <button className='danger' onClick={() => (this._handleSelect(complete))}> Hủy</button> 
                                    {loading ? <button className='request'><Icon type="loading" /></button> :
                                    <button className='request' onClick={() => this._createRequest(PUT)}> Lưu</button>}                                  
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Tab>
            </Tabs>
        )
    }
}

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getData: () => dispatch({ type: REDUX_SAGA.PERSON_INFO.GET_PERSON_INFO }),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LanguageSkillItem)