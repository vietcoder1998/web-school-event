import React from 'react';
import './Description.scss';
import { connect } from 'react-redux';

function Description(props?: {description?: string}) {
    return (
        <div className='wrapper'>
            <div style={{ minHeight: "150px" }}>{props.description}</div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    description: state.PersonalInfo.description
})

export default connect(mapStateToProps, null)(Description);
