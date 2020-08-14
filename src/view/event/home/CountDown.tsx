import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import { Button } from "antd";
import { connect } from "react-redux";
import { REDUX } from "../../../const/actions";


interface IProps {
  time?: string;
  haveEvent?: any;
}
interface IState {
  days: number;
  hours: number;
  min: number;
  sec: number;
}
class Countdown extends Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
    };
  }

  componentDidMount() {
    const dateX = this.props.time;
    this.interval = setInterval(() => {
      const date = this.calculateCountdown(dateX);
      date ? this.setState(date) : this.stop();
    }, 1000);
  }

  componentWillUnmount() {
    this.stop();
  }

  calculateCountdown(endDate) {
    let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000;

    // clear countdown when date is reached
    if (diff <= 0) {
      return false;
    }
    const timeLeft = {
      years: 0,
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
      millisec: 0,
    };

    // calculate time difference between now and expected date
    if (diff >= 365.25 * 86400) {
      // 365.25 * 24 * 60 * 60
      timeLeft.years = Math.floor(diff / (365.25 * 86400));
      diff -= timeLeft.years * 365.25 * 86400;
    }
    if (diff >= 86400) {
      // 24 * 60 * 60
      timeLeft.days = Math.floor(diff / 86400);
      diff -= timeLeft.days * 86400;
    }
    if (diff >= 3600) {
      // 60 * 60
      timeLeft.hours = Math.floor(diff / 3600);
      diff -= timeLeft.hours * 3600;
    }
    if (diff >= 60) {
      timeLeft.min = Math.floor(diff / 60);
      diff -= timeLeft.min * 60;
    }
    timeLeft.sec = diff;

    return timeLeft;
  }

  stop() {
    clearInterval(this.interval);
  }

  addLeadingZeros(value) {
    value = String(value);
    while (value.length < 2) {
      value = "0" + value;
    }
    return value;
  }

  render() {
    const countDown = this.state;
    let { haveEvent } = this.props;
    if (haveEvent) {
      return (
        <div className="Countdown">
          <div className="center">
            {/* <span className="Countdown-col">
                        <span className="Countdown-col-element">
                            <h2>NGÀY HỘI VIỆC LÀM</h2>
                        </span>
                    </span> */}
            <div className="time">
              <span className="Countdown-col">
                <span className="Countdown-col-element">
                  <strong>{this.addLeadingZeros(countDown.days)}</strong>
                  <span>Ngày</span>
                </span>
              </span>
              <span className="Countdown-col">
                <span className="Countdown-col-element">
                  <strong>{this.addLeadingZeros(countDown.hours)}</strong>
                  <span>Giờ</span>
                </span>
              </span>

              <span className="Countdown-col">
                <span className="Countdown-col-element">
                  <strong>{this.addLeadingZeros(countDown.min)}</strong>
                  <span>Phút</span>
                </span>
              </span>

              <span className="Countdown-col">
                <span className="Countdown-col-element">
                  <strong>{this.addLeadingZeros(countDown.sec)}</strong>
                  <span>Giây</span>
                </span>
              </span>
            </div>

            <a href="/home">
              <Button type="primary" shape="round" className="btn">
                Về trang chủ
              </Button>
            </a>
          </div>
        </div>
      );
    } else {
      return (
        <Redirect to='/home' />
      )
    }
  }
}
const mapStateToProps = (state) => ({
  isAuthen: state.AuthState.isAuthen,
  eventStart: state.EventStatusReducer,
  time: state.EventStatusReducer.time,
  haveEvent: state.EventStatusReducer.haveEvent,
  msgError: state.EventStatusReducer.msgError,
});

const mapDispatchToProps = (dispatch) => ({
  checkEvent: (status, time) => {
    dispatch({
      type: REDUX.EVENT.START,
      time: time,
      status,
    });
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Countdown);
