import React, { PureComponent } from "react";
import { Col, Row } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
//@ts-ignore
import defaultImage from "../../../../assets/image/base-image.jpg";
import { REDUX_SAGA } from "../../../../const/actions";

interface IProps {
  getTopEmpoyer?: Function;
  listEmployer?: any;
  param?: any;
}
interface IState {
  list_job_top: Array<any>;
  pageIndex: number;
  pageSize: number;
  is_loading: boolean;
}

class TopEm extends PureComponent<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      list_job_top: [],
      pageIndex: 0,
      pageSize: 9,
      is_loading: true,
    };
  }

  componentDidMount = async () => {
    this.props.getTopEmpoyer();
  };

  render() {
    let { listEmployer, param } = this.props;
    return (
      <div
        className="top-em"
        style={{ display: listEmployer.totalItems === 0 ? "none" : "" }}
      >
        <h5 style={{ textAlign: "center", fontSize: '1.75rem' }}>DOANH NGHIỆP NỔI BẬT </h5>
        <Row className="a_c" type="flex">
          {listEmployer && listEmployer.items
            ? listEmployer.items.map((item: { employer: { id: string; logoUrl: string; employerName: React.ReactNode; }; }, index: React.ReactText) => (
              <Col xs={12} sm={6} md={3} lg={4} xl={3} xxl={3} key={index}>
                <Link to={`/employer/${window.btoa(item.employer.id)}${param}`}
                  target="_blank"
                  className="name_employer"
                >
                  <div className="h-j-item">
                    <img
                      src={
                        item.employer.logoUrl === null
                          ? defaultImage
                          : item.employer.logoUrl
                      }
                      alt="logo"
                      className="image-employer"
                      
                    />

                  </div>
                  <div className="job-content">

                    <p style={{ color: "#415167", fontWeight: "bold" }}>
                      {item.employer.employerName}
                    </p>

                  </div>
                </Link>
              </Col>
            ))
            : null}

        </Row>
      </div >
    );
  }
}

const mapStateToProps = (state) => ({
  listEmployer: state.TopEmployer.data,
  param: state.DetailEvent.param
});

const mapDispatchToProps = (dispatch) => ({
  getTopEmpoyer: (pageIndex?: number, pageSize?: number) =>
    dispatch({ type: REDUX_SAGA.EVENT.EMPLOYER.TOP, pageIndex, pageSize }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopEm);
