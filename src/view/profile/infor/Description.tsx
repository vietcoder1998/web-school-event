import React from 'react';
import { connect } from 'react-redux';
import { Empty } from 'antd';
import { TYPE } from './../../../const/type';

function Description(props?: { description?: string, onClick?: Function }) {
    return (
        <div className='wrapper' >
            {
                props.description ? <div style={{ minHeight: "150px" }}>{props.description}</div> :
                    <div onClick={props.onClick ? () => props.onClick(TYPE.DESCRIPTION) : undefined}>
                        <Empty description={<b>Nhấp vào để mục tiêu nghề nghiệp</b>} />
                    </div>
            }
        </div>
    );
}

const mapStateToProps = (state) => ({
    description: state.FullPersonalInfo.description
})

export default connect(mapStateToProps, null)(Description);
