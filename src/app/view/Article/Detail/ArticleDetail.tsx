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
  Menu,
  Dropdown,
} from "antd";
import Layout from "../../layout/Layout";
import DefaultImage from "../../../../assets/image/base-image.jpg";
// import { routeLink, routePath } from '../../../../../const/break-cumb';
import "./ArticleDetail.scss";
import { _get, _post } from "../../../../services/base-api";
import { ANNOUNCEMENTS } from "../../../../services/api/public.api";
import { PUBLIC_HOST, STUDENT_HOST } from "../../../../environment/development";
import { noInfoHeader, authHeaders } from "../../../../services/auth";
import { timeConverter } from "../../../../utils/convertTime";
import TextArea from "antd/lib/input/TextArea";

import { store } from "../../../../redux/store/index";
import GoodArticle from "../Component/GoodArticle";
import { _requestToServer } from "../../../../services/exec";
import { POST, DELETE } from "../../../../const/method";
import { ANNOUNCEMENTS_PRIVATE } from "../../../../services/api/private.api";
// import { NotUpdate } from '../../../layout/common/Common';
import HashLoader from "react-spinners/HashLoader";

interface IProps {
  match?: any;
}

interface IState {
  author?: any;
  type?: string;
  rated?: Number;
  content?: string;
  imageUrl?: string;
  createdDate?: string;
  title?: string;
  views?: Number;
  listComment?: any;
  rating?: Number;
  comment?: string;
  idType?: string;
  totalComment?: Number;
  id?: string;
  loadingCommnet?: boolean;
  userID?: string;
  loading?: boolean;
}

class ArticleDetail extends PureComponent<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      //data article
      id: null,
      author: {
        avatarUrl: null,
        firstName: null,
        lastName: null,
      },
      type: null,
      rated: 0,
      content: null,
      imageUrl: null,
      createdDate: null,
      title: null,
      views: 0,
      idType: null,
      totalComment: null,

      //data cmt
      listComment: [],
      loadingCommnet: true,

      //data for cmt
      rating: 5,
      comment: null,
      userID: null,
      loading: true,
    };
  }

  componentDidMount() {
    localStorage.setItem("last_access", window.location.href);
    this.setState({
      userID: localStorage.getItem("userID"),
    });
    this.DetailArticle();
    this.getComment();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.setState({ loading: true });
      this.props.match.params.id = nextProps.match.params.id;
      this.DetailArticle();
      this.getComment();
    } else return 0;
  }
  DetailArticle() {
    try {
      _get(
        null,
        ANNOUNCEMENTS.DETAIL.replace(
          "{id}",
          window.atob(this.props.match.params.id)
        ),
        PUBLIC_HOST,
        noInfoHeader
      )
        .then((res) => {
          let data = res.data;
          this.setState({
            author: data.admin,
            rated: data.averageRating,
            content: data.content,
            createdDate: timeConverter(data.createdDate),
            imageUrl: data.imageUrl === null ? DefaultImage : data.imageUrl,
            title: data.title,
            views: data.viewNumber,
            type: data.announcementType.name,
            idType: data.announcementType.id,
            totalComment: data.totalComment,
            id: this.props.match.params.id,
            loading: false,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    } catch {}
  }

  async getComment() {
    let dataSend = {
      rating: null,
      userID: null,
      userType: null,
      createdDate: null,
      lastModified: null,
    };
    try {
      _post(
        dataSend,
        ANNOUNCEMENTS.COMMENT.replace(
          "{id}",
          window.atob(this.props.match.params.id)
        ),
        PUBLIC_HOST,
        noInfoHeader
      )
        .then((res) => {
          this.setState({
            listComment: res.data.items,
            loadingCommnet: false,
            comment: null,
            rating: 5,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    } catch {}
  }
  setComment = (e) => {
    this.setState({
      comment: e.target.value,
    });
  };

  async sendCommnet() {
    let { rating, comment } = this.state;
    let dataSend = {
      comment: comment,
      rating: rating,
    };
    await _requestToServer(
      POST,
      dataSend,
      ANNOUNCEMENTS_PRIVATE.ADD_COMMENT.replace(
        "{id}",
        window.atob(this.state.id)
      ),
      STUDENT_HOST,
      authHeaders,
      null,
      false
    );
    this.getComment();
  }
  DeleteComment = (id) => {
    let dataSend = [id];
    console.log(dataSend);
    _requestToServer(
      DELETE,
      null,
      ANNOUNCEMENTS_PRIVATE.DELETE_COMMENT.replace(
        "{id}",
        window.atob(this.state.id)
      ),
      STUDENT_HOST,
      authHeaders,
      dataSend,
      false
    ).then((res) => {
        console.log(res);
        this.getComment();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    let isAuthen = store.getState().AuthState.isAuthen;
    const menu = (id) => (
      <Menu
        onClick={() => {
          this.DeleteComment(id);
        }}
      >
        <Menu.Item key="1">Xóa</Menu.Item>
      </Menu>
    );

    if (this.state.loading) {
      return (
        <div className="article-detail-loading">
          <HashLoader
            size={150}
            color={"#32A3F9"}
            loading={this.state.loading}
          />
        </div>
      );
    } else {
      return (
        <Layout disableFooterData={true}>
          <div className="article-detail">
            <Row>
              <Col xs={0} sm={0} md={0} lg={1} xl={1} xxl={1}></Col>
              <Col xs={24} sm={24} md={16} lg={16} xl={16} xxl={16}>
                <Row gutter={[16, 16]}>
                  <Col xs={0} sm={0} md={0} lg={3} xl={3} xxl={4}>
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
                                  behavior: "smooth",
                                });
                              }}
                            />
                          </div>
                          <div>
                            <Icon
                              type={"facebook"}
                              style={{ fontSize: 22, marginTop: 15 }}
                              onClick={() => {
                                // window.open(
                                //   `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
                                //   "facebook-share-dialog",
                                //   "width=626, height=436"
                                // );
                                // console.log("1");
                                FB.ui(
                                  {
                                    display: "popup",
                                    method: "share",
                                    href:
                                      "https://developers.facebook.com/docs/",
                                    picture: this.state.imageUrl,
                                  },
                                  function (response) {}
                                );
                              }}
                            />
                          </div>
                          <div>
                            <Icon
                              type={"home"}
                              style={{ fontSize: 22, marginTop: 15 }}
                              onClick={() => {
                                window.location.href = "/home";
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </Affix>
                  </Col>
                  <Col xs={23} sm={23} md={23} lg={20} xl={20} xxl={20}>
                    <div className="article-detail-header">
                      <div>
                        {this.state.author.lastName +
                          " " +
                          this.state.author.firstName}
                      </div>
                      <div>
                        {" "}
                        <Icon type={"clock-circle"} />
                        {this.state.createdDate}
                      </div>
                      <div>
                        <Icon type={"eye"} />
                        {this.state.views}
                      </div>
                      <div>
                        <Icon type={"message"} />
                        {this.state.totalComment}
                      </div>
                      <div>
                        <a href={`/announcement/${this.state.idType}`}>
                          {this.state.type}
                        </a>
                      </div>
                    </div>
                    <div>
                      <Rate value={this.state.rated} disabled />
                    </div>
                    <Divider />
                    <div className="content">
                      <div className="title">{this.state.title}</div>
                      <div
                        dangerouslySetInnerHTML={{ __html: this.state.content }}
                      />
                      <Divider />
                    </div>

                    {isAuthen ? (
                      <div className="comment">
                        <div className="rating-cmt">
                          <div style={{ fontWeight: "bold" }}>Đánh giá</div>
                          <Rate
                            value={this.state.rating}
                            onChange={(event: number) => {
                              this.setState({ rating: event });
                            }}
                          />
                        </div>
                        <div>
                          <TextArea
                            id="text-msg"
                            className="text-comment"
                            placeholder={"Viết phản hồi"}
                            value={this.state.comment}
                            onChange={this.setComment}
                            maxLength={1000}
                          />
                        </div>
                        <div>
                          <br />
                          <Button
                            type={"primary"}
                            onClick={() => {
                              this.sendCommnet();
                            }}
                          >
                            Gửi
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <Divider />
                        <a
                          href="/login"
                          onClick={() => {
                            let last_access = window.location.href;
                            localStorage.setItem("last_access", last_access);
                          }}
                        >
                          {" "}
                          Đăng nhập để bình luận
                        </a>
                      </div>
                    )}
                    <Divider />
                    {this.state.listComment &&
                      this.state.listComment.map((item, index) => (
                        <div className="list-comment" key={index}>
                          <Skeleton
                            avatar
                            paragraph={{ rows: 2 }}
                            active
                            loading={this.state.loadingComment}
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
                                  style={{ fontSize: "1rem" }}
                                />
                              </div>
                              <div className="comment-msg">{item.comment}</div>
                            </div>
                            <div
                              style={{
                                display:
                                  item.userID === this.state.userID
                                    ? ""
                                    : "none",
                                position: "absolute",
                                right: "0",
                              }}
                            >
                              <Dropdown overlay={menu(item.id)}>
                                <Icon type="more" />
                              </Dropdown>
                              ,
                            </div>
                          </Skeleton>
                        </div>
                      ))}
                  </Col>
                </Row>
              </Col>
              <Col xs={0} sm={0} md={8} lg={7} xl={6} xxl={6}>
                <div style={{ marginTop: "15vh" }}>
                  <GoodArticle cardType={3} />
                </div>
              </Col>
            </Row>
            <BackTop />
          </div>
        </Layout>
      );
    }
  }
}

export default connect()(ArticleDetail);
