import React, { PureComponent } from "react";
import { Col, Carousel} from "antd";

import { _requestToServer } from "../../../services/exec";
import { POST } from "../../../const/method";
import { ANNOUNCEMENTS } from "../../../services/api/public.api";
import { PUBLIC_HOST } from "../../../environment/development";

import Card1 from "../component/Card1";
// import Card2 from "../component/Card2";
import Title from "../component/Title";

// import HashLoader from "react-spinners/HashLoader";
import GoodArticle from "../component/GoodArticle";
interface IProps {
  idType?: any;
}
interface IState {
  listArticleData?: any;
  body?: any;
  loading?: boolean;
  pageIndex?: any;
  pageSize?: any;
}

class HeaderArticle extends PureComponent<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      listArticleData: [],
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
        listArticleData: res.data.items,
        loading: false,
      });
    } catch (e) { }
  }
  render() {
    const props = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    return (
      <>
        <Col sm={24} md={24} lg={16} xl={16} xxl={16}>
          <Title title={"Bài viết hay"} />
          <Carousel
            dots={true}
            autoplay
            autoplaySpeed={3000}
            {...props}
          >
            {this.state.listArticleData.map((item, index) => (
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
        <Col xs={24} sm={12} md={12} lg={7} xl={7} xxl={7}>
          <GoodArticle />
        </Col>
      </>
    );
  }
}

export default HeaderArticle;
