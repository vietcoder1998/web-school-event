import React, { PureComponent } from "react";
import { Skeleton, Icon, Rate } from "antd";
//@ts-ignore
import DefaultImage from "../../../assets/image/base-image.jpg";
import { Link } from "react-router-dom";
// import "./Card.scss";
import { timeConverter } from "../../../utils/convertTime";
// import Title from './Title';

interface IProps {
  id?: string;
  summary?: string;
  title?: string;
  imageUrl?: string;
  rating?: any;
  date?: any;
}
interface IState {
  loading?: boolean;
  title?: string;
  content?: string;
  id?: string;
  imageUrl?: string;
  rating?: any;
  date?: any;
}
export default class Card3 extends PureComponent<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      title: "",
      content: "",
      imageUrl: "",
      id: null,
      rating: 0,
      date: 0,
    };
  }

  async componentDidMount() {
    await this.setState({
      title: this.props.title,
      content: this.props.summary,
      id: this.props.id,
      rating: this.props.rating,
      date: timeConverter(this.props.date),
      imageUrl:
        this.props.imageUrl === null ? DefaultImage : this.props.imageUrl,
      loading: false,
    });
  }

  render() {
    return (
      <Link to={`/chi-tiet-bai-viet/${window.btoa(this.state.id)}`}>
        <Skeleton
          avatar
          paragraph={{ rows: 2 }}
          active
          loading={this.state.loading}
        >
          <div className="card3">
            <img
              className="img-card"
              src={this.state.imageUrl}
              alt="article"
            />
            <div className='info'>
              <div className='title-article'>
                {this.state.title}
              </div>
              <div className="summary">{this.state.content}</div>
            </div>
            <div className="info">
              <div>
                <Icon type="calendar" /> {this.state.date}
              </div>
              <div>
                <Rate allowHalf disabled value={this.state.rating} />
              </div>
            </div>
          </div>
        </Skeleton>
      </Link>
    );
  }
}
