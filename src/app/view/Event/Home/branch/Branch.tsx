import React, { PureComponent } from "react";
import { Col, Row, Button } from "antd";
import { connect } from "react-redux";
import "./Branch.scss";
import { PUBLIC_HOST } from "../../../../../environment/development";
import { EVENT_PUBLIC } from "../../../../../services/api/public.api";
import { _get } from "../../../../../services/base-api";
import { REDUX_SAGA } from "../../../../../const/actions";

interface IProps {
  getEvenJob?: Function;
  listBranch?: any;
}
interface IState {
  listBranch: any;
  is_loading: boolean;
}

class TopEm extends PureComponent<IProps, IState> {
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
  };
  handleClick = (id) => {
    localStorage.setItem("e_bid", id);
    this.props.getEvenJob(0);
    window.scrollTo(0, 1800);
  };

  render() {
    let { listBranch } = this.state;
    return (
      <div
        className="top-branch"
        style={{ backgroundColor: "#F9FBFF !important" }}
      >
        <h5 style={{ textAlign: "center" }}>LÀM VIỆC THEO NGÀNH NGHỀ </h5>
        <Row align='center' type='flex'>
          {listBranch && listBranch.items
            ? listBranch.items.map((item, index) => (
                <Col xs={12} sm={6} md={6} lg={6} xl={6} xxl={6} key={index}>
                  <div className="branch-item" style={{ textAlign: "center" }}>
                    <a
                      onClick={() => {
                        this.handleClick(item.id);
                      }}
                    >
                      <img
                        src={item.imageUrl}
                        alt="branch"
                        className="image-branch"
                      />
                      <div style={{ fontWeight: "bold", fontSize: '16px',  marginTop: 15 }}>
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

export default connect(mapStateToProps, mapDispatchToProps)(TopEm);
