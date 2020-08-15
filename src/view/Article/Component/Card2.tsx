import React, { PureComponent } from "react";
import { Skeleton, Icon, Row, Col, Rate } from "antd";
//@ts-ignore
import DefaultImage from "../../../assets/image/base-image.jpg";
import { Link } from "react-router-dom";
// import "./Card.scss";
import { timeConverter } from "../../../utils/convertTime";
import { LazyLoadImage } from 'react-lazy-load-image-component';

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
export default class Card2 extends PureComponent<IProps, IState> {
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
    let {
      content,
      rating,
      imageUrl,
      title,
      id,
      loading,
      date
    } = this.state;

    return (
      <Link to={`/announcementDetail/${window.btoa(id)}`}>
        <Skeleton
          avatar
          paragraph={{ rows: 2 }}
          active
          loading={loading}
        >
          <Row className="card2">
            <Col className="a_c" xs={9} sm={10} md={10} lg={10} xl={10} xxl={10}>
              <LazyLoadImage
                className="img-card"
                src={imageUrl}
                alt={title}
              />
            </Col>
            <Col className="ct-article" style={{ padding: "0 0.5vw" }}xs={13} sm={13} md={13} lg={13} xl={13} xxl={14}>
              <div className='title-article'>
                {title}
              </div>
              <div className="summary">{content}</div>
              <div className="info">
                <p>
                  <Icon type="calendar" /> {date}
                </p>
                <p>
                  <Rate disabled={true} value={rating} style={{ fontSize: '0.8rem' }} />
                </p>
              </div>
            </Col>
          </Row>
        </Skeleton>
      </Link>
    );
  }
}
