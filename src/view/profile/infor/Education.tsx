import React, { Component } from "react";
// import { Tabs, Tab } from 'react-bootstrap';
import { connect } from "react-redux";
import { REDUX_SAGA } from "../../../const/actions";
import IEducation from "../../../models/education";

interface IProps {
  item?: any;
  complete?: any;
  id?: string | number;
  getData?: Function;
  fix?: string;
  _fixData?: Function;
  schools?: any;
  major?: any;
  personalInfo?: any;
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

  render() {
    let { schools, personalInfo, major } = this.props;
    return (
      <div className="education">
        <div className="wrapper">
          <div className="content-school">
            <p>
              <b> Nơi học:</b>
            </p>
            <li>
              {schools.name} ({schools.shortName})
        </li>
          </div>
          <div className="content-school">
            <p>
              <b> Thời gian học:</b>
            </p>
            <li>
              {personalInfo.schoolYearStart} -{" "}
              {personalInfo.schoolYearEnd}
            </li>
          </div>
          <div className="content-school">
            <p>
              <b> Mã sinh viên:</b>
            </p>
            <li>
              {personalInfo.studentCode}
            </li>
          </div>
          <div className="content-school">
            <p>
              <b>Chuyên ngành học / Ngành học:</b>
            </p>
            <li>
              {major.name} /{" "}
              {major.branch && major.branch.name}
            </li>
          </div>
        </div>
      </div>


    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getData: () => dispatch({ type: REDUX_SAGA.PERSON_INFO.GET_FULL_PERSON_INFO }),
});

const mapStateToProps = (state) => ({
  schools: state.FullPersonalInfo.educations,
  personalInfo: state.FullPersonalInfo.personalInfo,
  major: state.FullPersonalInfo.major,
  redux: state.FullPersonalInfo,
});
export default connect(mapStateToProps, mapDispatchToProps)(Education);
