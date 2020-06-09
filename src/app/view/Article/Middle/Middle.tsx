import React, { Component } from "react";
import { Row, Col } from "antd";
import Title from "../Component/Title";
import "./Middle.scss";
import ListMiddle from "./ListMiddle";
export default class Middle extends Component {
  render() {
    return (
      <div className="article-middle">
        <Row>
          <Col sm={0} md={0} lg={2} xl={2} xxl={2}></Col>
          <Col sm={24} md={24} lg={6} xl={6} xxl={6}>
            <Title title={"Kỹ năng mềm"} />
            <ListMiddle idType={23} />
          </Col>
          <Col sm={24} md={22} lg={6} xl={6} xxl={6}>
            <Title title={"Hướng nghiệp"} />
            <ListMiddle idType={17} />
          </Col>
          <Col sm={24} md={22} lg={6} xl={6} xxl={6}>
            <Title title={"Khởi nghiệp"} />
            <ListMiddle idType={18} />
          </Col>
         
        </Row>
      </div>
    );
  }
}
