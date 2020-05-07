import React, { Component } from "react";
// import { Tabs, Tab } from 'react-bootstrap';
import { connect } from "react-redux";
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

  componentDidMount() {
   
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
            {major.branch && major.branch.name}
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
  schools: state.FullPersonalInfo.educations,
  personalInfo: state.FullPersonalInfo.personalInfo,
  major: state.FullPersonalInfo.major,
  redux: state.FullPersonalInfo,
});
export default connect(mapStateToProps, mapDispatchToProps)(Education);
