import React, { PureComponent } from "react";
import { Avatar, Skeleton, Icon, Row, Col, Rate } from "antd";
import DefaultImage from "../../../../assets/image/base-image.jpg";
import { Link } from "react-router-dom";
import "./Card.scss";

interface IProps {
  id?: string;
  summary?: string;
  title?: string;
  imageUrl?: string;
}
interface IState {
  loading?: boolean;
  title?: string;
  content?: string;
  imageUrl?: string;
  id?: string;
}
export default class Card1 extends PureComponent<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      title: "",
      content: "",
      imageUrl: "",
      id: null,
    };
  }

  async componentDidMount() {
    await this.setState({
      title: this.props.title,
      content: this.props.summary,
      id: this.props.id,
      imageUrl: this.props.imageUrl === null ? DefaultImage : this.props.imageUrl,
      loading: false,
    });
  }

  render() {
    return (
      <Link to={`/announcementDetail/${this.state.id}`}>
        <Skeleton
          avatar
          paragraph={{ rows: 2 }}
          active
          loading={this.state.loading}
        >
          <div className="card1">
            <img
              className="img-card"
              src={this.state.imageUrl}
              alt="info"
            />
            <div className="info-card">
              <div className="title">{this.state.title}</div>
              <div className="summary">{this.state.content}</div>
            </div>
          </div>
        </Skeleton>
      </Link>
    );
  }
}
