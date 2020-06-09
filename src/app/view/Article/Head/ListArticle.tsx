import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Row, Col, Divider, Skeleton } from "antd";
import { REDUX_SAGA } from "../../../../const/actions";
import { _requestToServer } from "../../../../services/exec";
import { POST } from "../../../../const/method";
import { ANNOUNCEMENTS } from "../../../../services/api/public.api";
import { PUBLIC_HOST } from "../../../../environment/development";

import Card1 from "../Component/Card1";
import Card2 from "../Component/Card2";
import Title from "../Component/Title";
interface IProps {}
interface IState {
  listArticleRender?: any;
  body?: any;
  loading?: boolean;
  pageIndex?: any;
  pageSize?: any;
}

class GoodArticle extends PureComponent<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      listArticleRender: [],
      pageIndex: 0,
      pageSize: 10,
      loading: true,
    };
  }

  componentDidMount() {
    this.getListArticle(0, 4);
  }

  async getListArticle(pageIndex, pageSize = 5) {
    let body = {
      adminID: null,
      hidden: null,
      createdDate: null,
      announcementTypeID: null,
    };

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
    this.setState({
      listArticleRender: res.data.items,
      loading: false,
    });
  }
  render() {
    let { listArticleRender } = this.state;
    if (this.state.loading) return <div>loading .....</div>;
    else {
      return (
        <div>
          <Row>
            <Col sm={0} md={1} lg={2} xl={2} xxl={3}></Col>
            <Col sm={24} md={22} lg={19} xl={19} xxl={17}>
              <div>
                <Title title={"Bài viết hay"} />
                <Row>
                  <Col sm={24} md={24} lg={24} xl={13} xxl={13}>
                    <Card1
                      id={listArticleRender[1].id}
                      title={listArticleRender[1].title}
                      imageUrl={listArticleRender[1].imageUrl}
                      summary={listArticleRender[1].previewContent}
                    />
                  </Col>
                  <Col sm={24} md={24} lg={24} xl={1} xxl={1}></Col>
                  <Col sm={24} md={24} lg={24} xl={10} xxl={10}>
                    {listArticleRender.map((item, index) => (
                      <Card2
                        id={item.id}
                        title={item.title}
                        imageUrl={item.imageUrl}
                        summary={item.previewContent}
                        rating={item.averageRating}
                        date={item.createdDate}
                      />
                    ))}
                  </Col>
                </Row>
              </div>
            </Col>
            <Col sm={0} md={1} lg={2} xl={2} xxl={3}></Col>
          </Row>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  GoodArticle: state.AnnounList.listAnnoun,
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

export default connect(mapStateToProps, mapDispatchToProps)(GoodArticle);
