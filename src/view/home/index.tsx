import React from "react";
import Layout from "../layout/Layout";
import { connect } from "react-redux";
import TabSearch from "./tab-search";
import TopJob from "./TopJob";
import AllJob from "./AllJob";
// import TopEm from "./TopEm";
import Announcements from "./Announcements";
import JobExpect from "./JobExpect";
import VideoAd from "./VideoAd";
import { IAppState } from "../../redux/store/reducer";
// import { REDUX_SAGA } from '../../../const/actions';
import IndayJob from './IndayJob';
import FitJob from "./FitJob";

function Home(props) {
  return (
    <Layout disableFooterData={false}>
      {/* <CarouselUX /> */}
      <TabSearch {...props} />
      <div className="content">
        {
          props.isAuthen ? <FitJob/>: null
        }
        <IndayJob />
        <JobExpect />
        <TopJob />
        <AllJob   {...props} />
        <VideoAd {...props} />
        <Announcements  {...props} />
      </div>
    </Layout>
  );
}

const mapStateToProps = (state: IAppState) => ({
  isAuthen: state.AuthState.isAuthen,
  mobileState: state.MobileState
});

const mapDispatchToprops = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToprops)(Home);
