import React, { useState, useEffect } from "react";
import Layout from "../../layout/Layout";
import { connect } from "react-redux";
import HomeJob from "./home-job/HomeJob";
import TopEm from "./top-em/TopEm";
import TopJob from "./top-job/TopJob";
import Banner from "./banner/Banner";
import Branch from "./branch/Branch";
import { REDUX_SAGA } from "../../../../const/actions";

import HashLoader from "react-spinners/HashLoader";
// import { REDUX_SAGA } from '../../../const/actions';

function Home(props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('is loading agin')
    props.getTopEmpoyer(0);
    props.getEvenJob(0);
    props.getEventHotJob(0);
    setLoading(false)
  })
  if (loading) {
    return (
      <div className="loading-page">
        <HashLoader
          sizeUnit={"px"}
          size={150}
          color={"#32A3F9"}
          loading={true}
        />
      </div>
    )
  }
  else {
    return (
      <Layout disableFooterData={false}>
        <div>
          <Banner {...props} />
        </div>
        <Branch />
        <TopEm />
        <div className="content"
          style={{ paddingTop: 20, paddingBottom: 20, scrollBehavior: "smooth" }}
        >
          <TopJob />
          <HomeJob />
        </div>
      </Layout>
    );
  }

}

const mapStateToProps = (state) => ({
  isAuthen: state.AuthState.isAuthen,
});


const mapDispatchToprops = (dispatch) => ({
  getEvenJob: (pageIndex?: number, pageSize?: number) =>
    dispatch({ type: REDUX_SAGA.EVENT.JOB.NORMAL, pageIndex, pageSize }),
  getTopEmpoyer: (pageIndex?: number, pageSize?: number) =>
    dispatch({ type: REDUX_SAGA.EVENT.EMPLOYER.BANNER, pageIndex, pageSize }),
  getEventHotJob: (pageIndex?: number, pageSize?: number) =>
    dispatch({ type: REDUX_SAGA.EVENT.JOB.HOT, pageIndex, pageSize }),

});

export default connect(mapStateToProps, mapDispatchToprops)(Home);
