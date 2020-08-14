import React from "react";
import Layout from "../layout/Layout";
import { connect } from "react-redux";
import TabSearch from "./tab-search/TabSearch";
import TopJob from "./top-job/TopJob";
// import AllJob from "./all-job/AllJob";
import TopEm from "./top-em/TopEm";
import Announcements from "./annoucements/Announcements";
import JobExpect from "./JobExpect";
import VideoAd from "./VideoAd";
import { IAppState } from "../../../redux/store/reducer";

// import { REDUX_SAGA } from '../../../const/actions';
import IndayJob from './inday-job/IndayJob';

function Home(props) {
  return (
    <Layout disableFooterData={false}>
      {/* <CarouselUX /> */}
      <TabSearch {...props} />
      <div className="content" style={{ paddingTop: 20, paddingBottom: 20 }}>
        <JobExpect />
        <IndayJob />
        <TopJob />
        <TopEm />
        <VideoAd {...props} />
        <Announcements {...props} />
      </div>
    </Layout>
  );
}

const mapStateToProps = (state: IAppState) => ({
  isAuthen: state.AuthState.isAuthen,
});

const mapDispatchToprops = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToprops)(Home);
