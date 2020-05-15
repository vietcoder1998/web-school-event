import React from "react";
import Layout from "../../layout/Layout";
import { connect } from "react-redux";
import HomeJob from "./home-job/HomeJob";
import TopEm from "./top-em/TopEm";
import TopJob from "./top-job/TopJob";
import Banner from "./banner/Banner";
import Branch from "./branch/Branch";
import TabSearch from './tab-search/TabSearch'
// import { REDUX_SAGA } from '../../../const/actions';

function Home(props) {
  return (
    <Layout disableFooterData={false}>
      <Banner {...props} />
      <Branch />
      <TopEm />
      <div
        className="content"
        style={{ paddingTop: 20, paddingBottom: 20, scrollBehavior: "smooth" }}
      >
        <TopJob />
        <HomeJob />
      </div>
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  isAuthen: state.AuthState.isAuthen,
});

///comment
const mapDispatchToprops = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToprops)(Home);
