import React from 'react';
import { connect } from 'react-redux';
import { Empty } from 'antd';
import { TYPE } from './../../../const/type';

interface IProps {
    skills?: Array<any>
    onClick?: Function
}

function Skills(props?: IProps,) {
    let { skills } = props;

    return (
        <div className='wrapper'>
            <div style={{ marginBottom: 20 }}>
                <b>
                    Thêm công việc hoặc kĩ năng để nhà tuyển dụng tìm kiếm phù hợp với bạn.
                </b>
            </div>
            {skills && skills.length > 0 ? skills.map((item, index) => {
                return (
                    <label key={index}><span className='tag-ability'> {item.name}</span></label>
                )
            }) : <div onClick={() => props.onClick(TYPE.SKILLS)}>
                    <Empty description={<b>Nhấp vào để thêm kỹ năng</b>} />
                </div>
            }
        </div>
    );
}

const mapStateToProps = (state) => ({
    skills: state.FullPersonalInfo.skills
})

export default connect(mapStateToProps, null)(Skills);
