import React, { PureComponent } from "react";
import { _requestToServer } from "../../../services/exec";
import { POST } from "../../../const/method";
import { ANNOUNCEMENTS } from "../../../services/api/public.api";
import { PUBLIC_HOST } from "../../../environment/development";
import { Skeleton, Col } from "antd";
// import Card3 from "../component/Card3";
import Card2 from "../component/Card2";

// import ImageDeault from "../../../assets/image/base-image.jpg";
// import { GET } from './../../../const/method';
import Title from './../component/Title';
import { noInfoHeader } from '../../../services/auth';

interface IProps {
  idType?: any;
  pageIndex?: number;
  listType?: any;
  type?: any;
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
      this.props.type.id
    );
  }

  async getListArticle(type?: string | number) {
    let body = {
      adminID: null,
      hidden: null,
      createdDate: null,
      announcementTypeID: type,
    };

    await _requestToServer(
      POST,
      body,
      ANNOUNCEMENTS.LIST + `?pageIndex=${0}&pageSize=${5}`,
      PUBLIC_HOST,
      noInfoHeader,
      undefined,
      false,
      false,
      true
    ).then((res?: any) => {
      if (res && res.data && res.data.items) {
        let { listArticleData } = this.state;
        listArticleData = res.data.items;

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

        {listArticleData && listArticleData.length > 0 ?
          (
            <Col xs={24} sm={10} md={12} lg={8} xl={8} xxl={6}>
              <Title title={this.props.type.name} />
              {
                listArticleData.map((item?: any, index?: number) => {
                  if (index < 4) return (
                    <Card2
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      imageUrl={item.imageUrl}
                      summary={item.previewContent}
                      rating={item.averageRating}
                      date={item.createdDate}
                    />)
                  else return ''
                })}
            </Col>
          ) : undefined
        }

      </Skeleton>
    );
  }
}
