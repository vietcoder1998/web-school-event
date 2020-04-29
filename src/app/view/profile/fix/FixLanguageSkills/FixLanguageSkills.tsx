import React, { Component } from 'react';
import './FixLanguageSkills.scss';
import { Row, Col, Input, Select, Radio } from 'antd';
import { _get } from '../../../../../services/base-api';
import { LANGUAGES } from '../../../../../services/api/public.api';
import { PUBLIC_HOST } from '../../../../../environment/development';
import { connect } from 'react-redux';
import { POST } from '../../../../../const/method';
import { _requestToServer } from '../../../../../services/exec';
import { LANGUAGE_SKILL } from '../../../../../services/api/private.api';
import { REDUX_SAGA } from '../../../../../const/actions';
import ILanguageSkill from '../../../../../models/language-skill';
import {Icon} from 'antd'
let { Option } = Select;
interface IProps {
    method?: string;
    _fixData?: Function;
    getData?: Function;
}
interface IState {
    list_language: Array<{ id?: string, name?: string }>,
    is_show?: boolean,
    choose_lg?: any,
    languageName?: string,
    languageSkill?: ILanguageSkill,
    loading?: boolean
}

class FixLanguageSkills extends Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.state = {
            list_language: [],
            is_show: false,
            choose_lg: {},
            languageName: '',
            languageSkill: {
                languageID: 0,
                level: "Bản địa",
                certificate: "",
                score: 0
            },
            loading: false
        }
    }

    async componentDidMount() {
        let { list_language } = this.state;
        let res_language = await _get(null, LANGUAGES, PUBLIC_HOST, {});
        list_language = res_language.data.items;
        this.setState({ list_language });
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

    _createRequest = () => {
        this.requestServer(this.props.method);
    }

    async requestServer(method) {
        let { languageSkill } = this.state;
        this.setState({loading: true})
        if (languageSkill.languageID === null || languageSkill.level === '') {
        } else if (method === POST) {
            let res = await _requestToServer(POST, languageSkill, LANGUAGE_SKILL, null, null, null, true);
            if (res) {
                await this.props.getData();
                await this.props._fixData('languageSkill');
            }

        }
        await this.setState({loading: false})
    }

    render() {
        let { list_language, languageSkill, loading } = this.state;
        return (
            <div className='wrapper language-skills-fix'>
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
                                // @ts-ignore
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
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
                    <Col xs={24} sm={24} md={8} lg={8}>
                        <p>
                            Điểm số
                        </p>
                        <Input placeholder='Score' value={languageSkill.score} onChange={(event) => this._handleLanguageSkills(event.target.value, "score")} />
                    </Col>

                </Row>
                {/* Button holder */}
                <Row className='holder-button' style={{justifyContent: 'flex-end', display: 'flex', textAlign: 'right'}}>
                    <Col xs={24}>
                        <button className='danger' onClick={() => { this.props._fixData('languageSkill') }}> Hủy</button>
                        {loading ? <button className='request'><Icon type="loading" /></button> :
                        <button className='request' onClick={() => this._createRequest()}> Lưu</button> }                       
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    getData: () => dispatch({ type: REDUX_SAGA.PERSON_INFO.GET_PERSON_INFO }),
})
export default connect(null, mapDispatchToProps)(FixLanguageSkills);
