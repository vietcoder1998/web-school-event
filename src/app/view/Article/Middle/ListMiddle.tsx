import React, { PureComponent } from "react";
import { _requestToServer } from "../../../../services/exec";
import { POST } from "../../../../const/method";
import { ANNOUNCEMENTS } from "../../../../services/api/public.api";
import { PUBLIC_HOST } from "../../../../environment/development";
import { Skeleton } from "antd";
import Card3 from "../Component/Card3";
import Card2 from "../Component/Card2";

// import ImageDeault from "../../../../assets/image/base-image.jpg";

interface IProps {
  idType?: any;
  pageIndex?: number;
}
export default class ListMiddle extends PureComponent<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      listArticleRender: [
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
      announcementTypeID: type,
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

    try {
      let { listArticleRender } = this.state;
      listArticleRender = listArticleRender.concat(res.data.items);
      this.setState({
        listArticleRender,
        loading: false,
      });
    } catch (e) {}
  }

  render() {
    if (this.state.loading)
      return (
        <div>
          <Skeleton />
        </div>
      );
    else {
      return (
        <div>
          <Skeleton avatar loading={this.state.loading}>
            {this.state.listArticleRender && (this.state.listArticleRender.length > 0) &&
            (
              <Card3
                id={this.state.listArticleRender[0].id}
                title={this.state.listArticleRender[0].title}
                imageUrl={this.state.listArticleRender[0].imageUrl}
                summary={this.state.listArticleRender[0].previewContent}
                rating={this.state.listArticleRender[0].averageRating}
                date={this.state.listArticleRender[0].createdDate}
              />
            )
            }
            {this.state.listArticleRender && 
              this.state.listArticleRender.slice(1).map((item, index) => (
                <div key={index} style={{ marginTop: 20 }}>
                  <Card2
                    id={item.id}
                    title={item.title}
                    imageUrl={item.imageUrl}
                    summary={item.previewContent}
                    rating={item.averageRating}
                    date={item.createdDate}
                  />
                </div>
              ))}
          </Skeleton>
        </div>
      );
    }
  }
}
