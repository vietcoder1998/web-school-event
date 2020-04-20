import React, { Component } from "react";
// import { Tabs, Tab } from 'react-bootstrap';
import { _requestToServer } from "../../../../../services/exec";
import { educationController } from "../../../../../services/api/private.api";
import { connect } from "react-redux";
import moment from "moment";
import { PUT, DELETE } from "../../../../../const/method";
import { REDUX_SAGA } from "../../../../../const/actions";
import IEducation from "../../../../../models/education";

interface IProps {
  item?: any;
  complete?: any;
  id?: string | number;
  getData?: Function;
  fix?: string;
  _fixData?: Function;
}

interface IStates {
  education?: IEducation;
  activeKey?: string;
  fix?: string;
}

class Education extends Component<IProps, IStates> {
  constructor(props) {
    super(props);
    this.state = {
      education: {
        school: "",
        branchOfLearning: "",
        startedDate: 0,
        finishedDate: 0,
        description: "",
      },
    };
  }

  componentDidMount = () => {
    let { schools, personalInfo, major } = this.props;
    console.log("school");
    console.log(schools);
    console.log(personalInfo);
    console.log(major);
  };

  render() {
    let { schools, personalInfo, major } = this.props;
    return (
      <div className="education">
        <div className="wrapper">
          <div className="content-school">
            Tên trường: {schools.name} ({schools.shortName})
          </div>
          <div className="content-school">
            Thời gian học: {personalInfo.schoolYearStart} -{" "}
            {personalInfo.schoolYearStart}
          </div>
          <div className="content-school">
            Mã sinh viên: {personalInfo.studentCode}
          </div>
          <div className="content-school">
            Chuyên ngành học / Ngành học: {major.name} /{" "}
            {major.branch && major.branch.name }
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getData: () => dispatch({ type: REDUX_SAGA.PERSON_INFO.GET_PERSON_INFO }),
});

const mapStateToProps = (state) => ({
  schools: state.PersonalInfo.schools,
  personalInfo: state.PersonalInfo.personalInfo,
  major: state.PersonalInfo.major,
  redux: state.PersonalInfo,
});
export default connect(mapStateToProps, mapDispatchToProps)(Education);
