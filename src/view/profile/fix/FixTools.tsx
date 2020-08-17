import React, { Component } from 'react';
// import * as _ from 'lodash';
import { connect } from 'react-redux';
import { _requestToServer } from '../../../services/exec';
import { _get } from '../../../services/base-api';
import { PUBLIC_HOST } from '../../../environment/development';
import { Row, Col, Button, Icon } from 'antd';
import { PUT } from '../../../const/method';
import { REDUX_SAGA } from '../../../const/actions';
import { noInfoHeader } from '../../../services/auth';
import { TOOLS } from './../../../services/api/public.api';
import { TOOLS_P } from './../../../services/api/private.api';

interface IProps {
    tools?: Array<{ id?: number, name?: string }>;
    getData?: Function;
    _fixData?: Function;
    index?: string;
}

interface IState {
    state?: Array<string>,
    toolList?: Array<any>,
    tools?: Array<{ id?: number, name?: string }>,
    params: {
        pageIndex: number,
        pageSize: number,
    },
    list_tag: Array<{ id?: number, name?: string }>
}

class FixTools extends Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.state = {
            state: ['Thiết kế', 'PHP', 'html'],
            toolList: [],
            tools: [],
            params: {
                pageIndex: 0,
                pageSize: 0,
            },
            list_tag: []
        }
    }

    async componentDidMount() {
        let { tools } = this.props;
        let { toolList } = this.state;
        let res = await _get(null, TOOLS, PUBLIC_HOST, noInfoHeader);
        toolList = res.data.items;
        this.setState({ toolList, tools });
    }

    _addLabel = (item?: any, index?: any) => {
        let { tools, toolList } = this.state;
        console.log(tools)
        tools.push(item);
        if (index !== -1) {
            toolList.splice(index, 1);
        };
        this.setState({ tools, toolList });
    }

    _removeTag = (index_tools, name_tools, id_tools) => {
        let { tools, toolList } = this.state;
        let index = index_tools;

        if (index !== -1) {
            tools.splice(index, 1);
        };

        toolList.push({ id: id_tools, name: name_tools })
        this.setState({ tools, toolList })
    }

    _createRequest = async () => {
        await this.requestToServer();
    }

    async requestToServer() {
        let { tools } = this.state;
        let arrTools = tools.map((item) => {
            return item.id;
        })

        await _requestToServer(PUT, arrTools, TOOLS_P, null, null, null, true);
        await this.props.getData();
        await this.setState({ tools: this.props.tools })
        await this.props._fixData('tools')
    }

    _getTools = (name?: string) => {

    }

    render() {
        let { toolList, tools } = this.state;
        return (
            <div className='wrapper'>
                <div className='ability'>
                    {/* List Tools */}
                    <p><b>Thêm công cụ, kỹ năng bạn có thể sử dụng</b></p>
                    <div className='list-ability'>
                        {tools && tools.length > 0 ? tools.map((item, index?: number) => {
                            return (
                                <label key={index} className='tag-ablity'>
                                    {item.name}
                                    <Icon type="close" onClick={() => { this._removeTag(index, item.name, item.id) }} />
                                </label>
                            );
                        }) : ""}
                    </div>
                    <div className='list-skills'>
                        <ul className='data-api'>
                            {toolList && toolList.length > 0 ? toolList.map((item, index) => {
                                return (
                                    <label id={item.id} key={index} onClick={() => this._addLabel(item, index)}>
                                        {item.name}
                                    </label>
                                )
                            }) : ""}
                        </ul>
                    </div>
                    <Row className="holder-button">
                        <Col span={12}>
                            <Button
                                type="danger"
                                size="large"
                                icon="close"
                                onClick={() => {
                                    this.props._fixData("tools");
                                }}
                            >
                                Hủy
                        </Button>
                        </Col>
                        <Col span={12}>
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
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch) => ({
    getData: () => dispatch({ type: REDUX_SAGA.PERSON_INFO.GET_FULL_PERSON_INFO }),
})

const mapStateToProps = (state) => {
    return {
        tools: state.FullPersonalInfo.tools
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FixTools);
