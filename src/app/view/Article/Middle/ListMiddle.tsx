import React, { Component } from "react";
import { _requestToServer } from "../../../../services/exec";
import { POST } from "../../../../const/method";
import { ANNOUNCEMENTS } from "../../../../services/api/public.api";
import { PUBLIC_HOST } from "../../../../environment/development";
import { Skeleton } from "antd";
import Card2 from "../Component/Card2";

export default class ListMiddle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      listArticleRender: [],
      pageIndex: 0,
      pageSize: 5,
    };
  }

  componentDidMount() {
    this.getListArticle(
      this.props.idType,
      this.state.pageIndex,
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
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div>
        <Skeleton avatar loading={this.state.loading}>
          {this.state.listArticleRender &&
            this.state.listArticleRender.map((item, index) => (
              <div>
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
