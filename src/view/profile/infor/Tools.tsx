import React from 'react';
import { connect } from 'react-redux';
import { Empty } from 'antd';

interface IProps {
    tools?: Array<any>
}

function Tools(props?: IProps) {
    let { tools } = props;

    return (
        <div className='wrapper'>
            <div style={{ marginBottom: 20 }}>
                <b>
                    Thêm công việc hoặc kĩ năng để nhà tuyển dụng tìm kiếm phù hợp với bạn
                </b>
            </div>
            {tools && tools.length > 0 ? tools.map((item, index) => {
                return (
                    <label key={index}><span className='tag-ability'> {item.name}</span></label>
                )
            }) : <Empty />}
        </div>
    );
}

const mapStateToProps = (state) => ({
    tools: state.FullPersonalInfo.tools
})

export default connect(mapStateToProps, null)(Tools);
