import React, { Component } from 'react';
import './FixDescription.scss';

import { update_description } from '../../../../../services/api/private/profile'
import { sendStringHeader } from '../../../../../services/auth';
import { connect } from 'react-redux';
import { _requestToServer } from '../../../../../services/exec';
import { Row, Col } from 'react-bootstrap';
import { REDUX_SAGA } from '../../../../../const/actions';

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
        window.location.reload();
        await this.props._fixData('description');
    }

    render() {

        let { description } = this.state;
        return (
            <div className='wrapper'>
                <textarea placeholder='Giới thiệu tính cách, sở thích, câu nói yêu thích của bản thân' onChange={this._handleDescription} value={description}></textarea>
                <Row className='holder-button' >
                    <Col xs={6}>
                        <button className='danger' onClick={() => { this.props._fixData('description') }}> Hủy</button>
                    </Col>
                    <Col xs={6}>
                        <button className='request' onClick={() => this._createRequest()}> Lưu</button>
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
