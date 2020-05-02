import React from 'react';
import Layout from '../../layout/Layout';
import { connect } from 'react-redux';
import HomeJob from './home-job/HomeJob';
import TopEm from './top-em/TopEm';
import Announcements from './annoucements/Announcements';
import TopJob from './top-job/TopJob';
import Banner from './banner/Banner';
import Branch from './branch/Branch'
// import { REDUX_SAGA } from '../../../const/actions';

function Home(props) {
    return (
        <Layout disableFooterData={false}>
            <Banner />
            <div className='content' style={{ paddingTop: 20, paddingBottom: 20 }}>
                <Branch />
                <TopEm />
                <TopJob />
                <HomeJob />
                {/* <AllJob /> */}
            </div>
        </Layout>
    );
}

const mapStateToProps = state => ({
    isAuthen: state.AuthState.isAuthen,
})

const mapDispatchToprops = dispatch => ({
})



export default connect(mapStateToProps, mapDispatchToprops)(Home);
