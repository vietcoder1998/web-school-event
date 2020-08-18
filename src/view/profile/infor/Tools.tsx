import React from 'react';
import { connect } from 'react-redux';
import { Empty } from 'antd';
import { TYPE } from './../../../const/type';

interface IProps {
    tools?: Array<any>;
    onClick?: Function;
}

function Tools(props?: IProps) {
    let { tools } = props;

    return (
        <div className='wrapper'>
            <div style={{ marginBottom: 20 }}>
                <b>
                    Thêm các công cụ bạn có thể làm.
                </b>
            </div>
            {tools && tools.length > 0 ? tools.map((item, index) => {
                return (
                    <label key={index}><span className='tag-ability'> {item.name}</span></label>
                )
            }) : <div onClick={() => props.onClick(TYPE.TOOLS)}>
            <Empty description={<b>Nhấp vào để thêm công cụ</b>} />
        </div>}
        </div>
    );
}

const mapStateToProps = (state) => ({
    tools: state.FullPersonalInfo.tools
})

export default connect(mapStateToProps, null)(Tools);
