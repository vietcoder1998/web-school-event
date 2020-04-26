import React from 'react';
import { Select, Row, Col, Button, Icon } from "antd";
import { TYPE } from '../../../../const/type';

const { Option } = Select;

interface ISearchFilterProps {
    regions?: Array<any>;
    jobNames?: Array<any>;
    jobType?: string;
    loading?: boolean;
    onChangeJobFilter?: (event?: any) => any;
};

export default function SearchFilter(props?: ISearchFilterProps) {
    let { regions, jobNames, loading } = props;
    let [filter, setFilter] = React.useState({ jobType: null, regionID: null, jobNameID: null });

    return (
        <div className='filter-name-job' style={{ padding: '10px 2%' }}>
            <Row>
                <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
                    <Select
                        size={"large"}
                        showSearch
                        onChange={(event: string) => {
                   
                            let newFilter = filter;
                            newFilter.jobType = event;
                            setFilter(newFilter);
                            props.onChangeJobFilter(newFilter);
                        }}
                        style={{ width: '100%', margin: '5px 0px' }}
                        placeholder={'Tất cả các công việc'}
                    >
                        <Option
                            key={'1'}
                            value={null}
                        >
                            Tất cả
                        </Option>
                        <Option
                            key={'1'}
                            value={TYPE.FULLTIME}
                        >
                            Fulltime
                        </Option>
                        <Option
                            key={'2'}
                            value={TYPE.PARTTIME}
                        >
                            Parttime
                        </Option>
                        <Option
                            key={'3'}
                            value={TYPE.INTERNSHIP}
                        >
                            Internship
                    </Option>
                    </Select>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
                    <Select
                        allowClear
                        size={"large"}
                        showSearch
                        onChange={(event: string) => {
                            let newFilter = filter;
                            let region = regions && regions.filter((item) => event === item.name);
                            let regionID = null;

                            if (region && region.length > 0) {
                                regionID = region[0].id;
                            }

                            newFilter.regionID = regionID;
                            setFilter(newFilter);
                            props.onChangeJobFilter(newFilter);
                        }}
                        style={{ width: '100%', margin: '5px 0px' }}
                        placeholder={'Tất cả các tỉnh thành'}
                    >
                        <Option
                            key={'1'}
                            value={null}
                        >
                            Tất cả
                        </Option>
                        {regions.length > 0 ?
                            regions.map(
                                (item, index) => {
                                    return (
                                        <Option
                                            key={index}
                                            value={item.name}
                                        >
                                            {item.name}
                                        </Option>)
                                }) : null
                        }
                    </Select>
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
                    <Select
                        allowClear
                        size={"large"}
                        showSearch
                        onChange={(event: string) => {
                            let newFilter = filter;
                            newFilter.jobNameID = event;
                            setFilter(newFilter);
                            props.onChangeJobFilter(newFilter);
                        }}
                        style={{ width: '100%', margin: '5px 0px' }}
                        placeholder={'Tất cả các công việc'}
                    >
                        <Option
                            key={'1'}
                            value={null}
                        >
                            Tất cả
                        </Option>
                        {jobNames.length > 0 ?
                            jobNames.map(
                                (item, index) => {
                                    return (
                                        <Option
                                            key={index}
                                            value={item.id}
                                        >
                                            {item.name}
                                        </Option>)
                                }) : null
                        }
                    </Select>
                </Col>
                <Col xs={24} sm={24} md={12} lg={4} xl={4} xxl={4}>
                    <Button
                        size='large'
                        children={loading ? <Icon type='loading' /> : 'Tìm kiếm'}
                        style={{
                            width: "100%",
                            margin: '5px 0px',
                            backgroundColor:
                                'orange',
                            color: 'white'
                        }}
                        onClick={() => props.onChangeJobFilter(filter)}
                    />
                </Col>
            </Row>
        </div>
    )
}