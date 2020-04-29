import React, { Component } from 'react';
import './FixSkills.scss';
// import * as _ from 'lodash';
import { connect } from 'react-redux';
import { _requestToServer } from '../../../../../services/exec';
import { skillsController } from '../../../../../services/api/private.api';
import { _get } from '../../../../../services/base-api';
import { SKILLS } from '../../../../../services/api/public.api';
import { PUBLIC_HOST } from '../../../../../environment/development';
import { Row, Col } from 'react-bootstrap';
import { PUT } from '../../../../../const/method';
import { REDUX_SAGA } from '../../../../../const/actions';
import { Icon } from 'antd';

interface IProps {
    skills?: Array<{ id?: number, name?: string }>;
    getData?: Function;
    _fixData?: Function;
    index?: string;
}

interface IState {
    state?: Array<string>,
    list_skills?: Array<any>,
    skills?: Array<{ id?: number, name?: string }>,
    params: {
        pageIndex: number,
        pageSize: number,
    },
    list_tag: Array<{ id?: number, name?: string }>,
    loading?: boolean
}

class FixSkills extends Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.state = {
            state: ['Thiết kế', 'PHP', 'html'],
            list_skills: [],
            skills: [],
            params: {
                pageIndex: 0,
                pageSize: 0,
            },
            list_tag: [],
            loading: false
        }
    }

    async  componentDidMount() {
        let { skills } = this.props;
        let { list_skills } = this.state;
        let res = await _get({ pageIndex: 0, pageSize: 0 }, SKILLS, PUBLIC_HOST, {});
        list_skills = res.data.items;
        this.setState({ list_skills, skills });
    }

    _addLabel = (item, index) => {
        let { skills, list_skills } = this.state;
        skills.push(item);
        if (index !== -1) {
            list_skills.splice(index, 1);
        };
        this.setState({ skills, list_skills });
    }

    _removeTag = (index_skills, name_skills, id_skills) => {
        let { skills, list_skills } = this.state;
        let index = index_skills;

        if (index !== -1) {
            skills.splice(index, 1);
        };

        list_skills.push({ id: id_skills, name: name_skills })
        this.setState({ skills, list_skills })
    }

    _createRequest = async () => {
        await this.requestToServer();
    }

    async requestToServer() {
        let { skills } = this.state;
        let array_list_skills = skills.map((item) => {
            return item.id;
        })
        this.setState({ loading: true })
        await _requestToServer(PUT, array_list_skills, skillsController, null, null, null, true);
        await this.props.getData();
        await this.setState({ skills: this.props.skills, loading: false })
        await this.props._fixData('skills')
    }

    render() {
        let { list_skills, skills, loading } = this.state;
        return (
            <div className='wrapper'>
                <div className='ability'>
                    {/* List Skills */}
                    <p>Thêm kĩ năng hoặc công việc phù hợp</p>
                    <div className='list-ability'>
                        {skills && skills.map((item, index?: number) => {
                            return (
                                <label key={index} className='tag-ablity'>
                                    {item.name}
                                    <i className="fa fa-times" aria-hidden="true" onClick={() => { this._removeTag(index, item.name, item.id) }} />
                                </label>
                            );
                        })}
                    </div>
                    <div className='list-skills'>
                        <ul className='data-api'>
                            {list_skills && list_skills.map((item, index) => {
                                // console.log(skills.filter(item2 => (item.name == item2.name)).length)
                                if (skills.filter(item2 => (item.name == item2.name)).length >0) {                                    
                                    return null
                                }
                                return (
                                    <label id={item.id} key={index} onClick={() => this._addLabel(item, index)}>
                                        {item.name}
                                    </label>
                                )
                            })}
                        </ul>
                    </div>
                    <Row className='holder-button' style={{ justifyContent: 'flex-end', display: 'flex' }}>
                        <Col xs={24} style={{ marginRight: '15px' }}>
                            <button className='danger' onClick={() => { this.props._fixData('skills') }}> Hủy</button>
                            {loading ? <button className='request'><Icon type="loading" /></button> :
                                <button className='request' onClick={() => this._createRequest()}> Lưu</button>}
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch) => ({
    getData: () => dispatch({ type: REDUX_SAGA.PERSON_INFO.GET_PERSON_INFO }),
})

const mapStateToProps = (state) => {
    return {
        skills: state.PersonalInfo.skills
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FixSkills);
