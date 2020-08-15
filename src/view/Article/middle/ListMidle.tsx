import React, { PureComponent } from "react";
import { _requestToServer } from "../../../services/exec";
import { POST } from "../../../const/method";
import { ANNOUNCEMENTS } from "../../../services/api/public.api";
import { PUBLIC_HOST } from "../../../environment/development";
import { Skeleton, Row, Col } from "antd";
import Card3 from "../component/Card3";
import Card2 from "../component/Card2";

// import ImageDeault from "../../../assets/image/base-image.jpg";
import { GET } from './../../../const/method';
import Title from './../component/Title';

interface IProps {
  idType?: any;
  pageIndex?: number;
  listType?: any;
}

interface IState {
  loading?: boolean;
  listArticleData?: Array<any>;
  pageIndex?: number;
  pageSize?: number;
}

export default class ListMiddle extends PureComponent<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      listArticleData: [
        // {
        //   id: null,
        //   title: null,
        //   imageUrl: ImageDeault,
        //   summary: "",
        //   rating: 5,
        //   date: 0,
        // },
      ],
      pageIndex: 0,
      pageSize: 5,
    };
  }

  componentDidMount() {
    this.getListArticle(
      this.props.idType,
      this.props.pageIndex,
      this.state.pageSize
    );
  }

  async getListArticle(type, pageIndex, pageSize = 10) {
    let body = {
      adminID: null,
      hidden: null,
      createdDate: null,
      announcementTypeID: null,
    };

    await _requestToServer(
      POST,
      body,
      ANNOUNCEMENTS.LIST + `?pageIndex=${0}&pageSize=${5}`,
      PUBLIC_HOST,
      {
        pageIndex: pageIndex,
        pageSize: pageSize,
      },
      false
    ).then((res?: any) => {
      if (res) {
        let { listArticleData } = this.state;
        listArticleData = res.data.items.map((item?: any) => item);

        this.setState({
          listArticleData,
          loading: false,
        });
      }
    });
  }

  render() {
    let { listArticleData, loading } = this.state;
    if (loading) return <Skeleton />
    else return (
      <Skeleton avatar loading={loading}>
        <Row>
          <Col span={3} xs={12}>
            <Title title={"Hướng nghiệp"} />
            {listArticleData &&
              listArticleData.slice(1).map((item?: any, index?: number) => (
                <Card2
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  imageUrl={item.imageUrl}
                  summary={item.previewContent}
                  rating={item.averageRating}
                  date={item.createdDate}
                />
              ))}
          </Col>
          <Col span={3} xs={12}>
            <Title title={"Nổi bật"} />
            <Card3
              id={listArticleData[0].id}
              title={listArticleData[0].title}
              imageUrl={listArticleData[0].imageUrl}
              summary={listArticleData[0].previewContent}
              rating={listArticleData[0].averageRating}
              date={listArticleData[0].createdDate}
            />
          </Col>
        </Row>
      </Skeleton>
    );
  }
}
