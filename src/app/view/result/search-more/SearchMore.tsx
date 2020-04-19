import React from 'react';
import { Affix, Card, Collapse, Checkbox, Icon, Button, Row, Col } from 'antd';
import './SearchMore.scss';
import { TYPE } from '../../../../const/type';
// import MapContainer from '../../layout/google-maps/MapContainer';
const { Panel } = Collapse;
const optionDays = [
    { label: 'T2', value: TYPE.MON },
    { label: 'T3', value: TYPE.TUE },
    { label: 'T4', value: TYPE.WED },
    { label: 'T5', value: TYPE.THU },
    { label: 'T6', value: TYPE.FRI },
    { label: 'T7', value: TYPE.SAT },
    { label: 'CN', value: TYPE.SUN },
];

const optionShifts = [
    { label: 'Ca sáng', value: TYPE.MOR },
    { label: 'Ca chiều', value: TYPE.AFT },
    { label: 'Ca tối', value: TYPE.EVN },
];

interface ISearchMore {
    onChangeShiftsFilter: (event?: any) => any;
    loading?: boolean;
}

export default function SearchMore(props?: ISearchMore) {
    const [weekDays, setWeekDays] = React.useState(null);
    const [dayTimes, setDayTimes] = React.useState(null);
    const { loading } = props;
    const Content = () => {
        return (
            <Card className='search-more' title={'Lọc theo thời gian'} size="small">
                <Collapse bordered={true} defaultActiveKey={['1', '2']}>
                    <Panel header="Chọn thứ" key="1">
                        <Checkbox.Group
                            value={weekDays}
                            onChange={(event: any) => setWeekDays(event)}
                            options={optionDays}
                            defaultValue={null}
                        />
                    </Panel>
                    <Panel header="Chọn ca" key="2">
                        <Checkbox.Group
                            value={dayTimes}
                            onChange={(event: any) => setDayTimes(event)}
                            options={optionShifts}
                            defaultValue={null}
                        />
                    </Panel>
                </Collapse>
                <Row>
                    <Col md={12} lg={10} xl={10} xxl={10}>
                        <Button
                            size={'large'}
                            icon='close'
                            type={'danger'}
                            style={{
                                width: 'calc(100% - 5px)',
                                color: 'white',
                                margin: '10px 0px 0px',
                                border: 'solid white 1px'
                            }}
                            onClick={() => {
                                setDayTimes(null);
                                setWeekDays(null);
                            }}
                        >
                            Hủy lọc
                    </Button>
                    </Col>
                    <Col md={12} lg={14} xl={14} xxl={14}>
                        <Button
                            size={'large'}
                            icon='filter'
                            style={{
                                backgroundColor: 'orange',
                                width: '100%',
                                color: 'white',
                                margin: '10px 0px 0px',
                                border: 'solid white 1px'
                            }}
                            onClick={() => props.onChangeShiftsFilter({ weekDays, dayTimes })}
                        >
                            {loading ? <Icon type={'loading'} /> : 'Lọc'}
                        </Button>
                    </Col>
                </Row>
            </Card>
        )
    }

    return (
        <div>
            <Affix offsetBottom={-200} >
                {Content()}
            </Affix>
        </div>
    )
}