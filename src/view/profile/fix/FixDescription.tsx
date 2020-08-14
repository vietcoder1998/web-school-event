import React, { Component } from 'react';
import { update_description } from '../../../services/api/private/profile'
import { sendStringHeader } from '../../../services/auth';
import { connect } from 'react-redux';
import { _requestToServer } from '../../../services/exec';
import { Row, Col, Input } from 'antd';
import { REDUX_SAGA } from '../../../const/actions';
import { Button } from 'antd';

interface IProps {
    description?: string;
    method?: string;
    reloadData?: Function;
    _fixData?: Function;
}

interface IState {
    description?: string;
    method?: string;
}


class FixDescription extends Component<IProps, IState>{
    constructor(props) {
        super(props)
        this.state = {
            description: ''
        }
    }

    componentDidMount() {
        let { description } = this.props;

        this.setState({
            description
        })
    }

    _handleDescription = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    _createRequest = async () => {
        let { description } = this.state;
        await _requestToServer(this.props.method, description, update_description, null, sendStringHeader, null, true);
        await this.props._fixData('description');
    }

    render() {

        let { description } = this.state;
        return (
            <div className='wrapper'>
                <Input.TextArea
                    placeholder='Giới thiệu tính cách, sở thích, câu nói yêu thích của bản thân'
                    onChange={this._handleDescription}
                    rows={10}
                    value={description}
                />
                <Row className="holder-button">
                    <Col span={12}>
                        <Button
                            className="danger"
                            size="large"
                            icon="close"
                            onClick={() => {
                                this.props._fixData("description");
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
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    reloadData: () => { dispatch({ type: REDUX_SAGA.PERSON_INFO.GET_FULL_PERSON_INFO }) }
});

const mapStateToProps = state => ({
    description: state.FullPersonalInfo.description
})

export default connect(mapStateToProps, mapDispatchToProps)(FixDescription);
