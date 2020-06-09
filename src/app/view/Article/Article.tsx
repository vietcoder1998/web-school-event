import React, { useState, useEffect, PureComponent } from "react";
import Layout from "../layout/Layout";
import { connect } from "react-redux";

import { REDUX_SAGA } from "../../../const/actions";

import HashLoader from "react-spinners/HashLoader";
import { Tabs } from "antd";
import HightLight from './ListArticle/ListArticle'
import './Article.scss'
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
        <div className="tabs">
          <Tabs
            defaultActiveKey="ALL"
            onChange={(e) => {
              this.setState({ idType: e })
            }}
          >
            <TabPane key={"ALL"} tab={`Tất cả`}>

            </TabPane>
            {listType &&
              listType.map((item, index) => (
                <TabPane key={item.id} tab={`${item.name}`}>
                </TabPane>
              ))}
           
          </Tabs>
          <HightLight type={this.state.idType} />
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
