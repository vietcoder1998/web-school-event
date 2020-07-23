import React, { PureComponent } from "react";
import { Row, Col, Carousel, Skeleton } from "antd";

import { _requestToServer } from "../../../../services/exec";
import { POST } from "../../../../const/method";
import { ANNOUNCEMENTS } from "../../../../services/api/public.api";
import { PUBLIC_HOST } from "../../../../environment/development";

import Card1 from "../Component/Card1";
import Card2 from "../Component/Card2";
import Title from "../Component/Title";

import HashLoader from "react-spinners/HashLoader";
import GoodArticle from "../Component/GoodArticle";
interface IProps {
  idType?: any;
}
interface IState {
  listArticleRender?: any;
  body?: any;
  loading?: boolean;
  pageIndex?: any;
  pageSize?: any;
}

class HeaderArticle extends PureComponent<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      listArticleRender: [],
      pageIndex: 0,
      pageSize: 10,
      loading: true,
    };
    this.carousel = React.createRef();
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }
  next() {
    this.carousel.next();
  }
  previous() {
    this.carousel.prev();
  }
  componentDidMount() {
    this.getListArticle(0, 5);
  }

  async getListArticle(pageIndex, pageSize = 5) {
    let body = {
      adminID: null,
      hidden: null,
      createdDate: null,
      announcementTypeID: null,
    };
    this.props.idType === "all"
      ? (body.announcementTypeID = null)
      : (body.announcementTypeID = this.props.idType);
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
      this.setState({
        listArticleRender: res.data.items,
        loading: false,
      });
    } catch (e) {}
  }
  render() {
    let { listArticleRender } = this.state;
    const props = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    if (this.state.loading)
      return (
        <div>
          <Title title={"Bài viết hay"} />
          <Skeleton rows={6} />
        </div>
      );
    else {
      return (
        <div>
          <Row>
            <Col sm={0} md={0} lg={1} xl={1} xxl={1}></Col>
            <Col sm={24} md={24} lg={22} xl={23} xxl={23}>
              <div>
                <Row>
                  <Col sm={24} md={24} lg={24} xl={16} xxl={16}>
                    <div
                      style={{
                        display: this.props.idType === "all" ? "" : "none",
                      }}
                    >
                      <Title title={"Bài viết hay"} />
                    </div>
                    <Carousel
                      dots={true}
                      autoplay
                      autoplaySpeed={3000}
                      ref={(node) => (this.carousel = node)}
                      {...props}
                    >
                      {this.state.listArticleRender.map((item, index) => (
                        <div key={index}>
                          <Card1
                            id={item.id}
                            title={item.title}
                            imageUrl={item.imageUrl}
                            summary={item.previewContent}
                          />
                        </div>
                      ))}
                    </Carousel>
                  </Col>
                  <Col sm={24} md={24} lg={24} xl={1} xxl={1}></Col>
                  <Col sm={24} md={24} lg={24} xl={7} xxl={7}>
                    <GoodArticle />
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      );
    }
  }
}

export default HeaderArticle;
