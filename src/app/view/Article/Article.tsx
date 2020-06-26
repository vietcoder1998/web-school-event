import React from "react";
import Layout from "../layout/Layout";
import Header from "./Head/HeaderArticle";
import "./Article.scss";
import Middle from "./Middle/Middle";
import { _requestToServer } from "../../../services/exec";
import { GET } from "../../../const/method";
import { ANNOUNCEMENTS } from "../../../services/api/public.api";
import { PUBLIC_HOST } from "../../../environment/development";

class Article extends React.Component {
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
  }
  async  getListTypeArticle() {
    let res = await _requestToServer(GET, null, ANNOUNCEMENTS.TYPE, PUBLIC_HOST, {
      pageIndex: 0,
      pageSize: 50,
      priority: "",
    },
      false)
    try {
      this.setState({
        listType: res.data.items
      })
    }
    catch (e) {
      console.log(e)
    }
  }

  render() {
    return (
      <Layout disableFooterData={true}>
        <div className="Article">
          <div className="Header">
            <Header idType={this.props.match.params.id} />
          </div>
          <div>
            <Middle listType={this.state.listType} idType={this.props.match.params.id}/>
          </div>
        </div>
      </Layout>
    );
  }
}


export default Article;
