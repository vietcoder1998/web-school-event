import React, { PureComponent } from "react";
import { Skeleton,} from "antd";
//@ts-ignore
import DefaultImage from "../../../assets/image/base-image.jpg";
import { Link } from "react-router-dom";
// import "./Card.scss";
import { LazyLoadImage } from 'react-lazy-load-image-component';

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
      <Link to={`/announcementDetail/${window.btoa(this.state.id)}`}>
        <Skeleton
          avatar
          paragraph={{ rows: 2 }}
          active
          loading={this.state.loading}
        >
          <div className="card1">
            <LazyLoadImage
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
