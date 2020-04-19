import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Popup.scss';
import { REDUX } from '../../../../const/actions';

interface IProps {
    closePopup?: Function;
    data?: any;
    is_show?: boolean;
}

class Popup extends Component<IProps> {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        }
    }

    _closePopup = () => {
        this.props.closePopup();
    }

    render() {
        return (
            <div></div>
        );
    }
}

const mapStateToProps = (state) => ({
    data: state.PopupState.data,
    is_show: state.PopupState.is_show
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    closePopup: () =>
        dispatch({
            type: REDUX.POPUP.CLOSE_POPUP
        })
})


export default connect(mapStateToProps, mapDispatchToProps)(Popup);