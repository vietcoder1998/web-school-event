import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import { connect } from "react-redux";

import { REDUX_SAGA } from "../../../const/actions";

import HashLoader from "react-spinners/HashLoader";

function Article(props) {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(false)
    })

    if (loading) return (
        <div className='loading-page'>
            <HashLoader
                size={150}
                color={"#32A3F9"}
                loading={true}
            />
        </div>
    )
    else {
        return(
            <Layout disableFooterData={true}>
                <div>
                    ok
                </div>
            </Layout>
        )
    }
}