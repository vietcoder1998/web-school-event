import React from 'react';
import { Icon } from 'antd';

interface IResultFilter {
    numberRs?: number;
    regionName?: string;
    totalJobs?: number;
}

export default function ResultFilter(props?: IResultFilter) {
    let { numberRs, regionName, totalJobs } = props;

    return (
        <div className='result-filter'>
            <div className='sub-filter'>
                <p>
                    <label style={{ paddingLeft: 10 }}>
                        <label>Đã tìm thấy</label>
                        <label style={{ color: 'red', padding: '0 3px 0 2px' }}>{numberRs}</label>
                        <label className='text-icon'>công việc</label>
                        {/* <Icon type={numberRs === 0 ? 'frown' : 'smile'} theme="twoTone" /> */}
                    </label>
                    <label style={{ padding: ' 0px 5%' }}>
                        <label className='text-icon' style={{ padding: '0 4px' }}><Icon type="environment" theme="twoTone" /></label>
                        <label >Khu vực: </label>
                        <label style={{ padding: '0 4px' }}> {regionName}</label>
                    </label>
                    <label style={{ padding: '0px 5%' }}>
                        <label className='text-icon' style={{ padding: '0 4px' }}><Icon type="carry-out" theme="twoTone" /></label>
                        <label >Công việc:</label>
                        <label style={{ padding: '0 4px' }}> {totalJobs}</label>
                    </label>
                </p>
            </div>
        </div>
    )
}