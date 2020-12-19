import React from 'react';
import { 
    // Icon, Popover, Tabs, Dropdown, Menu, 
    Select, Button, Col, Row } from 'antd';
import { TYPE } from '../../../const/type';

const {Option} = Select
interface IResultFilter {
    numberRs?: number;
    regionName?: string;
    totalJobs?: number;
    onChangeJobFilter?: Function;
    branchIDs?: number|string;
}

export default function ResultFilter(props?: IResultFilter) {
    let { numberRs } = props;
    let url_string = window.location.href;
    var url = new URL(url_string);
    var jobType = url.searchParams.get("jobType");

    return (
            <div className='result-filter'>
                <Row className='sub-filter'>
                {/* <Affix offsetTop={75}> */}
                <Col span={12}>
                    <p style={{backgroundColor: "white", marginLeft: -10, width: "200px", borderRadius: 5}}>
                            <label style={{ paddingLeft: 10 }}>
                                <label>Đã tìm thấy</label>
                                <label style={{ color: 'red', padding: '0 3px 0 4px' }}><b>{numberRs}</b></label>
                                <label className='text-icon'>công việc</label>
                                {/* <Icon type={numberRs === 0 ? 'frown' : 'smile'} theme="twoTone" /> */}
                            </label>
                        </p>
                </Col>

                <Col span={12}>
                                   
                {
                    jobType && jobType === TYPE.INTERNSHIP ? <div className="right-filter " > 
                            <Button
                                type={props.branchIDs===13?"primary":null}
                                style={{marginRight: 5}}
                                onClick={()=>{props.onChangeJobFilter({branchIDs:13, jobType: TYPE.INTERNSHIP})}}
                            >Kỹ thuật</Button>
                            <Button
                                type={props.branchIDs===31?"primary":null}
                                style={{marginRight: 5}}
                                onClick={()=>{props.onChangeJobFilter({branchIDs:31, jobType: TYPE.INTERNSHIP})}}
                            >Kinh tế</Button>
                        </div> : null
                    }
                </Col>
                </Row>
            </div>
    )
}