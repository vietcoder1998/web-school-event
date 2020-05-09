import React from 'react';
import './Skills.scss';
import { connect } from 'react-redux';
import { Empty } from 'antd';

interface IProps {
    skills?: Array<any>
}

function Skills(props?: IProps) {
    let { skills } = props;

    return (
        <div className='wrapper'>
            <div style={{ marginBottom: 10 }}>Thêm công việc hoặc kĩ năng để nhà tuyển dụng tìm kiếm phù hợp với bạn</div>
            {skills && skills.length > 0 ? skills.map((item, index) => {
                return (
                    <label key={index}><span className='tag-ability'> {item.name}</span></label>
                )
            }) : <Empty />}
        </div>
    );
}

const mapStateToProps = (state) => ({
    skills: state.FullPersonalInfo.skills
})

export default connect(mapStateToProps, null)(Skills);
