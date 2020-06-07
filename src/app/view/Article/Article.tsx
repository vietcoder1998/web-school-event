import React, { useState, useEffect, PureComponent } from "react";
import Layout from "../layout/Layout";
import { connect } from "react-redux";

import { REDUX_SAGA } from "../../../const/actions";

import HashLoader from "react-spinners/HashLoader";
import { Tabs } from "antd";
const { TabPane } = Tabs;

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  async componentDidMount() {
    await this.props.getTypeArticle(0);
  }
  render() {
    let { loading } = this.state;
    let { listType } = this.props;
    return (
      <Layout disableFooterData={true}>
        <div className="tabs">
          <Tabs
            defaultActiveKey="ALL"
            onChange={(e) => {
              console.log(e);
            }}
          >
            <TabPane key={"ALL"} tab={`Tất cả`} />
            {listType &&
              listType.map((item, index) => (
                <TabPane key={item.id} tab={`${item.name}`}>
                    <div>
                        
                    </div>
                </TabPane>
              ))}
          </Tabs>
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
