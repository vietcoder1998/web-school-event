import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Row, Col, Divider, Skeleton } from "antd";
import Card from "./Card";
import FirstCard from "./FirstCard";
import { REDUX_SAGA } from "../../../../const/actions";
import { _requestToServer } from "../../../../services/exec";
import { POST } from "../../../../const/method";
import { ANNOUNCEMENTS } from "../../../../services/api/public.api";
import { PUBLIC_HOST } from "../../../../environment/development";

interface IProps {
  type?: string;
  getListArticle?: Function;
  listArticle?: Array<any>;
}
interface IState {
  listArticleRender?: any;
  body?: any;
  loading?: boolean;
  pageIndex?: any;
  pageSize?: any;
}

class ListArticle extends PureComponent<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      listArticleRender: [],
      body: {
        adminID: null,
        hidden: null,
        createdDate: null,
        announcementTypeID: null,
      },
      loading: true,
      pageIndex: 0,
      pageSize: 10,
    };
  }

  componentDidMount() {
    let { type } = this.props;
    this.getListArticle(type, 0, 10);
  }

  async UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.type === this.props.type) return 0;
    else {
      let { type } = nextProps;
      let { listArticleRender } = this.state;
      listArticleRender = [];
      await this.setState({
        listArticleRender,
        loading: true,
        pageIndex: 0,
      });
      this.getListArticle(type, 0, 10);
    }
  }
  async getListArticle(type, pageIndex, pageSize = 10) {
    let { body, listArticleRender } = this.state;
    type === "ALL"
      ? (body.announcementTypeID = null)
      : (body.announcementTypeID = type);
    let res = await _requestToServer(
      POST,
      body,
      ANNOUNCEMENTS.LIST + `?pageIndex=${pageIndex}&pageSize=${pageSize}`,
      PUBLIC_HOST,
      {
        pageIndex: pageIndex,
        pageSize: pageSize,
      },
      false
    );
    try {
      listArticleRender = listArticleRender.concat(res.data.items);
      this.setState({
        body,
        listArticleRender,
        loading: false,
      });
    } catch (e) {
      console.log(e);
    }
  }
  getMoreArticle = () => {
    let { pageIndex, body } = this.state;
    pageIndex++;
    this.setState({
      pageIndex,
    });
    let type = body.announcementTypeID;
    this.getListArticle(type, pageIndex, 10);
  };
  render() {
    if (this.state.loading) {
      return (
        <div style={{ height: "100vh" }}>
          <Skeleton active paragraph={{ rows: 10 }} />;
        </div>
      );
    } else {
      return (
        <div>
          <Row>
            <Col sm={0} md={1} lg={3} xl={3} xxl={4}></Col>
            <Col sm={24} md={22} lg={18} xl={18} xxl={16}>
              <div>
                <Row>
                  <Col sm={24} md={24} lg={24} xl={14} xxl={14}>
                    <FirstCard item={this.state.listArticleRender[0]} />
                  </Col>
                  <Col sm={24} md={24} lg={24} xl={10} xxl={10}>
                    <Divider children="Bài viết hay" orientation="left" />
                    <div>
                      <Card item={this.state.listArticleRender[1]} key={1} />
                      <Card item={this.state.listArticleRender[2]} key={2} />
                      <Card item={this.state.listArticleRender[3]} key={3} />
                      <Card item={this.state.listArticleRender[4]} key={4} />
                    </div>
                  </Col>
                  <Divider orientation="left" children="Danh sách" />
                  <Col sm={17} md={17} lg={17} xl={17} xxl={17}>
                   
                    {this.state.listArticleRender &&
                      this.state.listArticleRender.length > 5 &&
                      this.state.listArticleRender.map((item, index) => (
                        <div
                          style={{ display: index > 4 ? "" : "none" }}
                          key={index}
                        >
                          <Card item={item} />
                        </div>
                      ))}
                    <div
                      onClick={() => {
                        this.getMoreArticle();
                      }}
                    >
                      Xem thêm...
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col sm={0} md={1} lg={3} xl={3} xxl={4}></Col>
          </Row>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  listArticle: state.AnnounList.listAnnoun,
});

const mapDispatchToProps = (dispatch) => ({
  getListArticle: (pageIndex?: number, pageSize?: number, body?: any) =>
    dispatch({
      type: REDUX_SAGA.ANNOUNCEMENTS.GET_LIST,
      pageIndex,
      pageSize,
      body,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListArticle);
