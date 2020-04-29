import React from 'react';
import './Education.scss';
import { connect } from 'react-redux';
import EducationItem from './Item/EducationItem';
import IEducation from './../../../../../models/education';

interface IProps {
    educations ?: Array<IEducation>
}

function Education(props?: IProps) {
    return (
        props &&
        props.educations &&
        props.educations.map((item?: IEducation, index?: number) =>
            (
                <EducationItem
                    item={item}
                    index={index}
                    key={index}
                    id={item.id}
                    complete={'complete' + index + 'education'}
                    fix={'fix' + index + 'education'}
                />
            )
        )
    );
}

const mapStateToProps = (state) => ({
    educations: state.PersonalInfo.educations
})

export default connect(mapStateToProps, null)(Education);
