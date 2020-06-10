import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
  Button,
  Icon,
  Row,
  Col,
  Affix,
  BackTop,
  Avatar,
  Rate,
  Skeleton,
  Divider,
} from "antd";
import AvatarDefault from "../../../../assets/image/avatar_default.png";
import DefaultImage from "../../../../assets/image/base-image.jpg";
// import { routeLink, routePath } from '../../../../../const/break-cumb';
import "./ArticleDetail.scss";
import { _get, _post } from "../../../../services/base-api";
import { ANNOUNCEMENTS } from "../../../../services/api/public.api";
import { PUBLIC_HOST } from "../../../../environment/development";
import { noInfoHeader } from "../../../../services/auth";
import { timeConverter } from "../../../../utils/convertTime";
import TextArea from "antd/lib/input/TextArea";

import { store } from "../../../../redux/store/index";
import { TYPE } from "../../../../const/type";
// import { NotUpdate } from '../../../layout/common/Common';

interface IProps {}

interface IState {}

class ArticleDetail extends PureComponent<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      author: {
        avatarUrl: null,
        firstName: null,
        lastName: null,
      },
      type: null,
      rated: 0,
      content: null,
      imageUrl: null,
      lastModified: null,
      title: null,
      views: 0,

      listComment: [],
      rating: 5,
      comment: null,
    };
  }

  componentDidMount() {
    console.log(this.props.match.params.id);
    this.DetailArticle();
    this.getComment();
  }
  async DetailArticle() {
    let res = await _get(
      null,
      ANNOUNCEMENTS.DETAIL.replace("{id}", this.props.match.params.id),
      PUBLIC_HOST,
      noInfoHeader
    );
    let data = res.data;
    this.setState({
      author: data.admin,
      rated: data.averageRating,
      content: data.content,
      createdDate: timeConverter(data.createdDate),
      imageUrl: data.imageUrl === null ? DefaultImage : data.imageUrl,
      title: data.title,
      views: data.viewNumber,
    });
  }

  async getComment() {
    let dataSend = {
      rating: null,
      userID: null,
      userType: null,
      createdDate: null,
      lastModified: null,
    };
    let res = await _post(
      dataSend,
      ANNOUNCEMENTS.COMMENT.replace("{id}", this.props.match.params.id),
      PUBLIC_HOST,
      noInfoHeader
    );
    console.log(res);
    try {
      this.setState({
        listComment: res.data.items,
      });
    } catch (e) {
      console.log(e);
    }
  }
  setComment = (e) => {
    this.setState({
      comment: e.target.value,
    });
  };
  render() {
    let isAuthen = store.getState().AuthState.isAuthen;
    return (
      <div className="article-detail">
        <Row>
          <Col xs={0} sm={0} md={1} lg={2} xl={2} xxl={4}></Col>

          <Col xs={24} sm={24} md={22} lg={20} xl={20} xxl={16}>
            <Row>
              <Col xs={0} sm={1} md={1} lg={2} xl={3} xxl={4}>
                <Affix offsetTop={200}>
                  <div className="affix-annou-card hidden-only-phone">
                    <div className="affix-annou-card-content">
                      <div>
                        <Icon
                          type={"message"}
                          style={{ fontSize: 22, marginTop: 15 }}
                          onClick={() => {
                            window.scrollTo({
                                top: document.body.scrollHeight,
                                behavior: 'smooth'
                            });
                          }}
                        />
                      </div>
                      <div>
                        <Icon
                          type={"facebook"}
                          style={{ fontSize: 22, marginTop: 15 }}
                        />
                      </div>
                      <div>
                        <Icon
                          type={"star"}
                          style={{ fontSize: 22, marginTop: 15 }}
                        />
                      </div>
                    </div>
                  </div>
                </Affix>
              </Col>

              <Col xs={0} sm={23} md={15} lg={17} xl={16} xxl={16}>
                <div className="article-detail-header">
                  <Avatar
                    src={
                      this.state.author.avatarUrl === null
                        ? this.state.author.avatarUrl
                        : AvatarDefault
                    }
                  />
                  <div>
                    {this.state.author.lastName + this.state.author.firstName}
                  </div>
                  <div>
                    {" "}
                    <Icon type={"clockCircle"} />
                    {this.state.createdDate}
                  </div>
                  <div>
                    <Icon type={"eye"} />
                    {this.state.views}
                  </div>
                </div>
                <Rate
                  value={this.state.rated}
                  style={{
                    fontSize: 12,
                    position: "absolute",
                    right: 10,
                    top: "5vh",
                  }}
                  disabled
                />
                <div className="content">
                  <h5>{this.state.title}</h5>
                  <div
                    dangerouslySetInnerHTML={{ __html: this.state.content }}
                  />
                </div>
                {isAuthen ? (
                  <div className="comment">
                    <div className="rating-cmt">
                      <div>Đánh giá</div>
                      <Rate
                        value={this.state.rating}
                        onChange={(event: number) => setRating(event)}
                      />
                    </div>
                    <div>
                      <TextArea
                        id="text-msg"
                        className="text-comment"
                        placeholder={"Hãy viết nhận xét của bạn"}
                        value={this.state.comment}
                        onChange={this.setComment}
                        maxLength={1000}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <Divider />
                    Đăng nhập để bình luận</div>
                )}
                <Divider />
                {this.state.listComment &&
                  this.state.listComment.map((item, index) => (
                    <div className="list-comment" key={index}>
                      <Skeleton
                        avatar
                        paragraph={{ rows: 2 }}
                        active
                        loading={false}
                      >
                        <div className="img-cmt">
                          <Avatar
                            src={item ? item.avatarUrl : DefaultImage}
                            style={{
                              marginRight: 10,
                              width: 40,
                              height: 40,
                            }}
                            icon={"user"}
                          />
                        </div>
                        <div>
                          <div>{item.name}</div>
                          <div>
                            <Rate
                              value={item && item.rating}
                              disabled
                              style={{ fontSize: "0.9rem" }}
                            />
                          </div>
                          <div className="comment-msg">{item.comment}</div>
                        </div>
                      </Skeleton>
                    </div>
                  ))}
              </Col>
            </Row>
          </Col>
          <Col xs={0} sm={0} md={1} lg={2} xl={2} xxl={4}></Col>
        </Row>
        <BackTop />
      </div>
    );
  }
}

export default connect()(ArticleDetail);
