import React, { Component } from "react";
import "./ToggleButton.scss";
import { connect } from "react-redux";
import { _requestToServer } from "../../../services/exec";
import { isLookingFobJobState } from "../../../services/api/private.api";
import { PUT } from "../../../const/method";
import { REDUX_SAGA } from "../../../const/actions";
import { Switch } from "antd";

class ButtonToggle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state: true,
    };
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
  };

  async requestToSever(state) {
    await _requestToServer(PUT, null, isLookingFobJobState + state, null, null);
    await this.props.getData();
  }

  render() {
    return (
      <div className="toggle-button">
        <b style={{ marginLeft: 10 }} >
          <Switch id="find-job" onChange={this._handleStateButton} defaultChecked={this.props.state} />
          <label htmlFor="find-job">
            {this.state.state === true ? "Đang tìm việc" : "Đã có việc"}
          </label>
        </b>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getData: () =>
    dispatch({
      type: REDUX_SAGA.PERSON_INFO.GET_FULL_PERSON_INFO,
    }),
});

const mapStateToProps = (state) => {
  return {
    state: state.FullPersonalInfo.personalInfo.isLookingForJob,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonToggle);
