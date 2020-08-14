import React from 'react';
import { connect } from 'react-redux';
import ExperienceItem from './../item/ExperienceItem';

function Experience(props) {
    let { experiences } = props;
    return (
        experiences.map((item, index) => {
            return (
                <ExperienceItem
                    item={item}
                    key={index}
                    id={item.id}
                    complete={'complete' + index + 'experience'}
                    fix={'fix' + index + 'experience'}
                />
            )
        })
    );
}

const mapStateToProps = (state) => ({
    experiences: state.FullPersonalInfo.experiences
})

export default connect(mapStateToProps, null)(Experience);
