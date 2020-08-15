import React from "react";
import Layout from "../layout/Layout";
import Header from "./head/HeaderArticle";
// import "./Article.scss";
// import Middle from "./middle";
import { _requestToServer } from "../../services/exec";
import { GET } from "../../const/method";
import { ANNOUNCEMENTS } from "../../services/api/public.api";
import { PUBLIC_HOST } from "../../environment/development";
import ListMiddle from './middle/ListMidle';
import {Col, Row} from 'antd';

interface IProps {
  match?: any,
}

interface IState {
  loading: boolean,
  idType: any,
  listType: Array<any>,
}

class Article extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      idType: null,
      listType: [],
    };

  }
  componentDidMount() {
    this.getListTypeArticle()
    // this comment for test ssh remote to gitlab
  }

  async getListTypeArticle() {
    await _requestToServer(
      GET,
      null,
      ANNOUNCEMENTS.TYPE,
      PUBLIC_HOST,
      {
        pageIndex: 0,
        pageSize: 50,
        priority: "",
      },
      false
    ).then((res?: any) => {
      this.setState({
        listType: res.data.items
      })
    });
  }

  render() {
    let { listType } = this.state;
    let { match } = this.props;

    return (
      <Layout disableFooterData={true}>
        <Row className="content-an">
          <Col xs={24} sm={24} lg={24} xl={24} xxl={24}>
            <div className="Article">
              <div className="Header">
                <Header idType={this.props.match.params.id} />
              </div>
              <ListMiddle listType={listType} idType={match.params.id} />
            </div>
          </Col>
        </Row>
      </Layout>
    );
  }
}


export default Article;
