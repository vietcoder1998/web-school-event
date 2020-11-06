import React from "react";
import Layout from "../layout/Layout";
import Header from "./Head/HeaderArticle";
// import "./Article.scss";
// import Middle from "./middle";
import { _requestToServer } from "../../services/exec";
import { GET } from "../../const/method";
import { ANNOUNCEMENTS } from "../../services/api/public.api";
import { PUBLIC_HOST } from "../../environment/development";
import ListMiddle from './middle/ListMidle';
import { Col, Row, Affix, Tabs } from 'antd';

interface IProps {
  match?: any,
  history?: History,
}

interface IState {
  loading: boolean,
  idType: any,
  listType: Array<any>,
}

const { TabPane } = Tabs;



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
    console.log(this.props);
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

  callback = (key?: string | number) => {
    this.props.history.push(`/bai-viet/${key}`)
  }

  render() {
    let { listType } = this.state;
    let { match } = this.props;

    return (
      <Layout disableFooterData={true}>
        <>
          <Affix
            offsetTop={0}
            children={(
              <Tabs
                defaultActiveKey="1"
                onChange={this.callback}
                style={{
                  backgroundColor: "white",
                  marginBottom: 0,
                  textAlign: "center",
                  width: '100%',
                  fontWeight: 500
                }}
              >
                <TabPane tab="Tất cả" key="all" />
                {listType && listType.length > 0 ?
                  listType.map(
                    (item?: any) => <TabPane disabled={true} tab={item.name} key={item.id} />
                  ) : undefined}
              </Tabs>
            )} />
          <Row className="content-an">
            <Col xs={24} sm={24} lg={23} xl={22} xxl={22}>
              <div className="Article">
                <Row className="head-an">
                  <Header idType={this.props.match.params.id} />
                </Row>
                <Row className="l-middle">
                  {listType && listType.length > 0 ?
                    listType.map(
                      (item?: any, i?: number) => (<ListMiddle key={item.id} type={item} idType={match.params.id} />)
                    ) : ""}
                </Row>
              </div>
            </Col>
          </Row>
        </>
      </Layout>
    );
  }
}

export default Article;