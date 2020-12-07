import React from 'react';
// import { Icon } from 'antd';

interface IResultFilter {
    numberRs?: number;
    regionName?: string;
    totalJobs?: number;
}

export default function ResultFilter(props?: IResultFilter) {
    let { numberRs } = props;

    return (
            <div className='result-filter'>
                <div className='sub-filter'>
                {/* <Affix offsetTop={75}> */}
                    <p style={{backgroundColor: "white", marginLeft: -10, width: "200px", borderRadius: 5}}>
                        <label style={{ paddingLeft: 10 }}>
                            <label>Đã tìm thấy</label>
                            <label style={{ color: 'red', padding: '0 3px 0 4px' }}><b>{numberRs}</b></label>
                            <label className='text-icon'>công việc</label>
                            {/* <Icon type={numberRs === 0 ? 'frown' : 'smile'} theme="twoTone" /> */}
                        </label>
                    </p>
                {/* </Affix> */}
                </div>
            </div>
    )
}