import React, { useState, useEffect, PureComponent } from "react";
import Layout from "../layout/Layout";
import { connect } from "react-redux";

import { REDUX_SAGA } from "../../../const/actions";

import { Tabs } from "antd";
import Header from "./Head/ListArticle";
import "./Article.scss";

import Title from "./Component/Title";
import Middle from "./Middle/Middle";
const { TabPane } = Tabs;

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      idType: null,
    };
  }
  componentDidMount() {
    this.props.getTypeArticle(0);
  }
  render() {
    let { listType } = this.props;
    return (
      <Layout disableFooterData={true}>
        <div className="Article">
          <div className="Header">
            <Header />
          </div>
          <div>
            <Middle />
          </div>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  listType: state.AnnounTypes.listType,
});

const mapDispatchToProps = (dispatch) => ({
  getTypeArticle: (pageIndex?: number, pageSize?: number) =>
    dispatch({ type: REDUX_SAGA.ANNOUNCEMENTS.GET_TYPES, pageIndex, pageSize }),
});
export default connect(mapStateToProps, mapDispatchToProps)(Article);
