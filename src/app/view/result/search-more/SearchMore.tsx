import React, { useEffect } from 'react';
import { Affix, Card, Collapse, Checkbox, Icon, Button, Row, Col } from 'antd';
import './SearchMore.scss';
import { connect } from 'react-redux';
import { TYPE } from '../../../../const/type';
import { render } from 'react-dom';
import qs from 'query-string';

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
    list_day?: any;
    list_shift?: any;
    jobType?: any;
    setFilter?: any;
    location?: any;
}
interface IStateSearchMore {
    weekDays?: any;
    dayTimes?: any;
}

class SearchMore extends React.Component<ISearchMore, IStateSearchMore> {
    // const [weekDays, setWeekDays] = React.useState(null);
    // const [dayTimes, setDayTimes] = React.useState(null);
    
    constructor(props) {
        super(props);
        this.state = {
            weekDays: null,
            dayTimes: null
        }
    }
    componentDidMount() {
        let newWeekDays = [];
        let newDayTimes= [];
        if (this.props.setFilter) { 
            Object.keys(this.props.list_day).map((key) => {
                if (this.props.list_day[key] === true) {
                    newWeekDays.push(key)
                }
            });
            Object.keys(this.props.list_shift).map((key) => {
                if (this.props.list_shift[key] === true) {
                    newDayTimes.push(key)
                }
            });
        } else {
            let queryParam = qs.parse(this.props.location.search, { ignoreQueryPrefix: true })
            Object.keys(this.props.list_day).map((key) => {
                if(queryParam[key] == 'true') {
                    newWeekDays.push(key)
                }
            })
            Object.keys(this.props.list_shift).map((key) => {
                if (queryParam[key] == 'true') {
                    newDayTimes.push(key)
                }
            });
        }
        
        this.setState({weekDays: newWeekDays, dayTimes: newDayTimes})

    }
    render(){
        let {weekDays, dayTimes} = this.state;
        let { loading } = this.props;
        return (
            <Card className='search-more' title={'Lọc theo thời gian'} size="small">
                <Collapse bordered={true} defaultActiveKey={['1', '2']}>
                    <Panel header="Chọn thứ" key="1">
                        <Checkbox.Group
                            value={weekDays}
                            onChange={(event: any) => {
                                this.setState({weekDays: event})
                                // console.log(event)
                            }}
                            options={optionDays}
                            defaultValue={null}
                        />
                    </Panel>
                    <Panel header="Chọn ca" key="2">
                        <Checkbox.Group
                            value={dayTimes}
                            onChange={(event: any) => this.setState({dayTimes: event})}
                            options={optionShifts}
                            defaultValue={null}
                        />
                    </Panel>
                </Collapse>
                <Row>
                    <Col md={12} lg={12} xl={12} xxl={12}>
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
                                // setDayTimes(null);
                                // setWeekDays(null);
                                this.setState({weekDays: null, dayTimes: null})

                            }}
                            disabled={this.props.jobType !== 'PARTTIME'}

                        >
                            Hủy lọc
                        </Button>
                    </Col>
                    <Col md={12} lg={12} xl={12} xxl={12}>
                        <Button
                            size={'large'}
                            icon='filter'
                            type={'primary'}
                            style={{
                                // backgroundColor: 'orange',
                                width: '100%',
                                color: 'white',
                                margin: '10px 0px 0px',
                                border: 'solid white 1px'
                            }}
                            onClick={() => this.props.onChangeShiftsFilter({ weekDays, dayTimes })}
                            disabled={this.props.jobType !== 'PARTTIME'}
                        >
                            {loading ? <Icon type={'loading'} /> : 'Lọc'}
                        </Button>
                    </Col>
                </Row>
            </Card>
        )
    }
}
const mapStateToProps = (state) => ({
    list_day: state.JobResult.filter.list_day,
    list_shift: state.JobResult.filter.list_shift,
    setFilter: state.JobResult.setFilter,
});

export default connect(
    mapStateToProps
)(SearchMore)