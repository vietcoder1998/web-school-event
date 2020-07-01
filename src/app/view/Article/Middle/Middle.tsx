import React, { Component, PureComponent } from "react";
import { Row, Col, Button, Divider } from "antd";
import Title from "../Component/Title";
import "./Middle.scss";
import ListMiddle from "./ListMiddle";
import GoodArticle from "../Component/GoodArticle";
import bannerImage from '../../../../assets/image/Ứng dụng tìm kiếm việc làm hàng đầu.gif'

interface IProps {
  listType?: any;
  idType?: string;
}
interface IState {}
export default class Middle extends PureComponent<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      listType: [],
      isAll: true,
    };
  }
  componentDidMount() {
    // console.log(this.props.listType)
    this.setState({
      isAll: this.props.idType === "all" ? true : false,
      listType: this.props.listType,
    });
  }

  getTypeArticle() {}
  render() {
    return (
      <div className="article-middle">
        <Row gutter={12}>
          {this.state.isAll &&
            this.props.listType.slice(0, 2).map((item, index) => (
              <Col sm={24} md={24} lg={9} xl={9} xxl={9}>
                <div
                  key={index}
                  style={{ textAlign: "left", marginBottom: "20px 0 20px 0" }}
                >
                  <Title title={item.name} />
                  <ListMiddle idType={item.id} pageIndex={0} />
                  <Button
                    onClick={() => {
                      window.location.href = `/announcement/${item.id}`;
                    }}
                    type="primary"
                  >
                    Xem thêm
                  </Button>
                </div>
              </Col>
            ))}
          {this.state.isAll && (
            <div>
              <Col sm={24} md={24} lg={6} xl={6} xxl={6}>
                <img src={bannerImage} width={"100%"} height="auto" />
              </Col>
            </div>
          )}
          {!this.state.isAll && (
            <div>
              <Col sm={24} md={24} lg={8} xl={8} xxl={8}>
                <div>
                  <ListMiddle idType={this.props.idType} pageIndex={0} />
                  <Divider />
                </div>
              </Col>
              <Col sm={24} md={24} lg={8} xl={8} xxl={8}>
                <div>
                  <ListMiddle idType={this.props.idType} pageIndex={1} />
                  <Divider />
                </div>
              </Col>
              <Col sm={24} md={24} lg={7} xl={7} xxl={7}>
                <GoodArticle />
              </Col>
              <Col sm={24} md={24} lg={1} xl={1} xxl={1}></Col>
            </div>
          )}
        </Row>
      </div>
    );
  }
}
