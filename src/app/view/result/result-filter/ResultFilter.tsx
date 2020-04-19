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
                    <label style={{ padding: '0px 5%' }}>
                        <label>Đã tìm thấy</label>
                        <label style={{ color: 'red', padding: '0px 5px' }}>{numberRs}</label>
                        <label className='text-icon'>công việc cho bạn</label>
                        <Icon type={numberRs === 0 ? 'frown' : 'smile'} theme="twoTone" />
                    </label>
                    <label style={{ padding: ' 0px 5%' }}>
                        <label >Khu vực</label>
                        <label className='text-icon'><Icon type="environment" theme="twoTone" /></label>
                        <label>{regionName}</label>
                    </label>
                    <label style={{ padding: '0px 5%' }}>
                        <label >Công việc</label>
                        <label className='text-icon'><Icon type="carry-out" theme="twoTone" /></label>
                        <label >{totalJobs}</label>
                    </label>
                </p>
            </div>
        </div>
    )
}