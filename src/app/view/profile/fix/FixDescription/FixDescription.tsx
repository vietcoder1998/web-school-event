import React, { Component } from 'react';
import './FixDescription.scss';

import { DESCRIPTION } from '../../../../../services/api/private.api';
import { sendStringHeader } from '../../../../../services/auth';
import { connect } from 'react-redux';
import { _requestToServer } from '../../../../../services/exec';
import { Row, Col } from 'react-bootstrap';
import { REDUX_SAGA } from '../../../../../const/actions';
import {Icon} from 'antd';
interface IProps {
    description?: string;
    method?: string;
    reloadData?: Function;
    _fixData?: Function;
}

interface IState {
    description?: string;
    method?: string;
    loading?: boolean;
}


class FixDescription extends Component<IProps, IState>{
    constructor(props) {
        super(props)
        this.state = {
            description: '',
            loading: false,
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
        this.setState({loading: true})
        await _requestToServer(this.props.method, description, DESCRIPTION, null, sendStringHeader, null, true);
        this.setState({loading: false})
        await this.props.reloadData();
        await this.props._fixData('description');
    }

    render() {

        let { description, loading } = this.state;
        return (
            <div className='wrapper'>
                <textarea placeholder='Giới thiệu tính cách, sở thích, câu nói yêu thích của bản thân' onChange={this._handleDescription} value={description}></textarea>
                <Row className='holder-button' style={{justifyContent: 'flex-end', display: 'flex'}}>
                    <Col xs={24} style={{marginRight: '15px'}}>
                        <button className='danger' onClick={() => { this.props._fixData('description') }}> Hủy</button>
                        {loading ? <button className='request'><Icon type="loading" /></button> :
                        <button className='request' onClick={() => this._createRequest()}> Lưu</button>}
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    reloadData: () => { dispatch({ type: REDUX_SAGA.PERSON_INFO.GET_PERSON_INFO }) }
});

const mapStateToProps = state => ({
    description: state.PersonalInfo.description
})

export default connect(mapStateToProps, mapDispatchToProps)(FixDescription);
