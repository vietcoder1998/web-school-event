import React, { Component } from 'react';
import './ToggleButton.scss';
import { connect } from 'react-redux';
import { _requestToServer } from '../../../../services/exec';
import { isLookingFobJobState } from '../../../../services/api/private.api';
import { PUT } from '../../../../const/method';
import { REDUX_SAGA } from '../../../../const/actions';

class ButtonToggle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            state: true
        }
    }

    componentDidMount() {
        let { state } = this.props;
        this.setState({ state });
    }

    _handleStateButton = () => {
        let { state } = this.state;
        state = !state;
        this.setState({ state });
        this.requestToSever(state);
    }

    async requestToSever(state) {
        await _requestToServer(PUT, null, isLookingFobJobState + state, null, null);
        await this.props.getData();
    }

    render() {
        let { state } = this.state;
        return (
            <div className='toggle-button' >
                <div
                    className='toggle-wrapper'
                    onClick={this._handleStateButton}
                    style={{
                        backgroundColor: state === true ? 'rgb(9, 209, 9)' : 'gray',
                        borderColor: state === true ? 'rgb(9, 209, 9)' : 'gray'
                    }}>
                    <div className='toggle-range' style={{
                        width: state === true ? '9px' : '0px'
                    }}>
                    </div>
                    <div className='toggle-state'></div>
                </div>
                <div>
                    {this.state.state === true ? 'Đang tìm việc' : 'Đã có việc'}
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    getData: () => dispatch({ type: REDUX_SAGA.PERSON_INFO.GET_PERSON_INFO })
})

const mapStateToProps = (state) => {
    return {
        state: state.FullPersonalInfo.personalInfo.lookingForJob
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ButtonToggle);
