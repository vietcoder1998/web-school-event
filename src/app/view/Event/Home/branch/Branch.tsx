import React, { PureComponent } from "react";
import { Col, Row } from "antd";
import { connect } from "react-redux";
import "./Branch.scss";
import { PUBLIC_HOST } from "../../../../../environment/development";
import { EVENT_PUBLIC } from "../../../../../services/api/public.api";
import { _get } from "../../../../../services/base-api";
import { REDUX_SAGA } from "../../../../../const/actions";
import whileImage from '../../../../../assets/image/while.png';

interface IProps {
  getEvenJob?: Function;
  listBranch?: any;
}
interface IState {
  listBranch: any;
  is_loading: boolean;
}

class Branch extends PureComponent<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      listBranch: [],
      is_loading: true,
    };
  }

  componentDidMount = async () => {
    await this.setState({ is_loading: false });
    let listBranch = await _get(null, EVENT_PUBLIC.BRANCH, PUBLIC_HOST, {});

    this.setState({
      listBranch: listBranch.data,
    });
    localStorage.removeItem("e_bid");
    localStorage.setItem('branch_name', "VIỆC LÀM TRONG NGÀY HỘI");
    // console.log(localStorage.getItem('branch_name'))
  };
  handleClick = (id, name) => {
    localStorage.setItem("e_bid", id);
    localStorage.setItem('branch_name', "VIỆC LÀM NHÓM NGÀNH " + name);
    this.props.getEvenJob(0);

  };

  render() {
    let { listBranch } = this.state;
    return (
      <div
        className="top-branch"
        style={{ backgroundColor: "#F9FBFF !important", padding: "3% 5%" }}
      >
        <h5 style={{ textAlign: "center", }}>LÀM VIỆC THEO NGÀNH NGHỀ </h5>
        <Row align='center' type='flex' gutter={[16, 32]}>
          {listBranch && listBranch.items
            ? listBranch.items.map((item, index) => (
              <Col xs={12} sm={6} md={6} lg={6} xl={4} xxl={4} key={index}>
                <div className="branch-item" style={{ textAlign: "center" }}>
                  <a
                    href="#normal_job"
                    onClick={() => {
                      this.handleClick(item.id, item.name);
                    }}
                  >
                    <div className='border-image-branch'>
                      <img
                        src={item.imageUrl === null ? whileImage : item.imageUrl}
                        alt="branch"
                        className="image-branch"
                      />
                    </div>

                    <div className='name-branch'>
                      {item.name}{" "}
                    </div>
                  </a>
                </div>
              </Col>
            ))
            : null}
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  getEvenJob: (pageIndex?: number, pageSize?: number) =>
    dispatch({ type: REDUX_SAGA.EVENT.JOB.NORMAL, pageIndex, pageSize }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Branch);
