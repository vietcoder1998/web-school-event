import React, { Component } from 'react';
import { Input, Select, Button, Icon, Modal, Tabs } from 'antd';
import './SearchBox.scss';
import MapContainer from '../../../layout/google-maps/MapContainer';
import { connect } from 'react-redux';
import { REDUX_SAGA } from '../../../../../const/actions';

const InputGroup = Input.Group;
const { Option } = Select;
const { TabPane } = Tabs;
let list_week = [
    { name: 'Thứ hai', shortcut: 'MON' },
    { name: 'Thứ ba', shortcut: 'TUE' },
    { name: 'Thứ tư', shortcut: 'WED' },
    { name: 'Thứ năm', shortcut: 'THU' },
    { name: 'Thứ sáu', shortcut: 'FRI' },
    { name: 'Thứ bảy', shortcut: 'SAT' },
    { name: 'Chủ nhật', shortcut: 'SUN' }];

let list_day_times = [
    { name: 'Ca sáng', shortcut: 'MOR' },
    { name: 'Ca Chiều ', shortcut: 'AFT' },
    { name: 'Ca Tối', shortcut: 'EVN' }
]

let region = JSON.parse(localStorage.getItem('region'));

interface IProps {
    marker?: any;
    getJobResult?: Function;
    history?: any;
    getRegions?: Function;
    getJobNames?: Function;
    jobNames?: Array<any>;
    regions?: Array<any>;
};

interface IState {
    job_dto?: { name?: string, id?: 0 },
    list_day?: {
        MON?: boolean,
        TUE?: boolean,
        WED?: boolean,
        THU?: boolean,
        FRI?: boolean,
        SAT?: boolean,
        SUN?: boolean,
    },
    jobType?: string,
    list_shift?: {
        MOR?: boolean,
        AFT?: boolean,
        EVN?: boolean,
    },
    show_days?: boolean,
    choose_advanced?: boolean,
    jobNames?: Array<any>,
    regions?: Array<any>,
    data_jobs?: Array<any>,
    show_modal?: boolean,
    location?: {
        marker?: {
            lat?: number,
            lng?: number
        },
        address?: string
    },

    area?: {
        id?: null,
        name?: string,
        totalJobs?: number
    },

    show_location?: boolean,
    choose_location?: boolean
};

class SearchBox extends Component<IProps, IState>{
    constructor(props) {
        super(props);
        this.state = {
            job_dto: { name: '', id: 0 },
            list_day: {
                MON: true,
                TUE: true,
                WED: true,
                THU: true,
                FRI: true,
                SAT: true,
                SUN: true,
            },

            jobType: 'PARTTIME',

            list_shift: {
                MOR: true,
                AFT: true,
                EVN: true,
            },
            show_days: true,
            choose_advanced: false,
            jobNames: [],
            regions: [],
            data_jobs: [],
            show_modal: false,
            location: {
                marker: {
                    lat: 0,
                    lng: 0
                },
                address: ''
            },

            area: {
                id: null,
                name: '',
                totalJobs: 0
            },

            show_location: false,
            choose_location: false
        }
    }

    _isMounted = false;

    async componentDidMount() {
        this.props.getRegions();
        this.props.getJobNames();
        if (region) {
            this.setState({ area: region })
        }
    }

    _handleInput = () => {
        let { job_dto } = this.state;
        this.setState({ job_dto })
    }

    _handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            this._createRequest();
        }
    }

    _handleShift = (e) => {
        let { list_shift } = this.state;
        let shift = e.target.id;
        list_shift[shift] = !list_shift[shift];
        this.setState({ list_shift });
    }

    _handleTime = (e) => {
        let { list_day } = this.state;
        let day = e.target.id;
        list_day[day] = !list_day[day];
        this.setState({ list_day });
    }

    _handleShowDay = (jobType, show_days) => {
        let show_days_;
        if (show_days) {
            show_days_ = show_days
        } else {
            show_days = false
        };

        this.setState({ show_days: show_days_, jobType })
    }

    _selectJob = (e) => {
        let { job_dto } = this.state;
        job_dto.name = e.key;
        job_dto.id = e.item.props.id;
        this.setState({ job_dto });
    }

    _handleOk = () => {
        let { location, show_location, choose_location } = this.state;
        if (choose_location) {
            location.address = localStorage.getItem('location');
            location.marker = this.props.marker;
        }

        show_location = true;
        this.setState({ show_modal: false, location, show_location })
    }

    _onSearch = (event?: string) => {
        this.props.getJobNames(event)
    }

    _openModal = () => {
        this.setState({ show_modal: true })
    }

    _handleCancel = () => {
        this.setState({ show_modal: false })
    }

    _handleShowLocation = () => {
        let { show_location } = this.state;
        show_location = !show_location;
        this.setState({ show_location })
    }

    _handleChooseLocation = (type) => {
        let { choose_location } = this.state;
        choose_location = type;
        this.setState({ choose_location });
    }

    _setArea = (item) => {
        this.setState({ area: item });
        localStorage.setItem("region", JSON.stringify(item))
    }

    _handleTabs = (key) => {
        switch (key) {
            case '1':
                this._handleShowDay('PARTTIME', true)
                break;
            case '2':
                this._handleShowDay('FULLTIME', false)
                break;
            case '3':
                this._handleShowDay('INTERNSHIP', false)
                break;

            default:
                break;
        }
    }

    listArea() {
        let { regions } = this.props;
        return (
            <div className='choose-area'>
                <Select
                    showSearch={true}
                    defaultValue={region ? region.name : 'Chọn tỉnh thành bạn muốn'} style={{ width: '100%' }}
                >
                    {regions.map((item, index) => {
                        return <Select.Option
                            key={index}
                            value={item.name}
                            onClick={() => { this._setArea(item) }} >{item.name}</Select.Option>
                    })}
                </Select>
            </div>)
    }

    _createRequest = () => {
        let {
            list_shift,
            list_day,
            location,
            choose_location,
            show_days,
            job_dto,
            jobType,
            area
        } = this.state;

        let employerID = null;
        let excludedJobIDs = null;
        let excludePriority = null;
        let jobNameIDs = job_dto.id ? [job_dto.id] : null;
        let jobGroupID = null;
        let shuffle = true;
        let jobShiftFilter = {
            gender: 'BOTH',
            weekDays: [],
            dayTimes: []
        };

        let jobLocationFilter = {
            regionID: null,
            lat: 0,
            lon: 0,
            distance: 20000
        }

        if (show_days) {
            Object.keys(list_day).map((key) => {
                if (list_day[key] === true) {
                    jobShiftFilter.weekDays.push(key)
                }

                return null;
            });

            Object.keys(list_shift).map((key) => {
                if (list_shift[key] === true) {
                    jobShiftFilter.dayTimes.push(key)
                }

                return null;
            });
        } else {
            jobShiftFilter = null
        }

        if (choose_location === true) {
            jobLocationFilter.lat = location.marker.lat;
            jobLocationFilter.lon = location.marker.lng
        } else {
            jobLocationFilter.regionID = area.id;
            jobLocationFilter.lat = null;
            jobLocationFilter.lon = null;
        }

        this.requestToServer(
            {
                employerID,
                excludedJobIDs,
                excludePriority,
                shuffle,
                jobNameIDs,
                jobGroupID,
                jobType,
                jobShiftFilter,
                jobLocationFilter
            }
        )
    }

    requestToServer(data) {
        localStorage.setItem('paging', JSON.stringify({ pageIndex: 0, pageSize: 10 }));
        localStorage.setItem('searchData', data);
        this.props.getJobResult(data);
        this.props.history.push('/result');
    }

    componentWillUnmount() {
        this._isMounted = true;
    }

    render() {
        let { list_day,
            show_days,
            list_shift,
            show_modal,
            location,
            area,
            show_location,
            choose_location,
            choose_advanced
        } = this.state;

        let { jobNames } = this.props;

        return (
            <>
                {/* Choose location modal */}
                <Modal
                    visible={show_modal}
                    title={choose_location ? 'Chọn vị trí' : 'Chọn khu vực'}
                    onOk={this._handleOk}
                    onCancel={this._handleCancel}
                    style={{ top: '5vh', height: 400 }}
                    footer={[
                        <Button key="back" onClick={this._handleCancel}>
                            Trở lại
                        </Button>,
                        <Button key="submit" type="primary" onClick={this._handleOk}>
                            Cập nhật
                    </Button>]}
                >

                    <div style={{ height: 400, width: '100%' }}>
                        {choose_location ?
                            <MapContainer style={{ height: 350 }} /> : this.listArea()}
                    </div>
                </Modal>
                <div className='search-area'>
                    {/* Search Box in Phone */}
                    <div className='search-box-phone show-only-phone test'>
                        {/* Choose location address */}
                        <div className="location-address">
                            <Input
                                placeholder='Vị trí tìm việc của bạn'
                                prefix={
                                    <Icon type='environment'
                                        style={{ color: 'green' }}
                                        onClick={() => this._openModal()} />}
                                value={choose_location ? location.address : area.name}
                                onClick={() => this._openModal()}
                                readOnly
                            />
                        </div>
                        <Select
                            style={{ width: '100%' }}
                            placeholder="Tìm kiếm công việc của bạn"
                            size="default"
                            showSearch
                            optionFilterProp="children"
                            onSearch={this._onSearch}
                        >
                            {jobNames && jobNames.map((item, index) => {
                                return (
                                    <Option
                                        key={index}
                                        id={item.id}
                                        value={item.name}
                                        onClick={this._selectJob}

                                    >{item.name + '  '}
                                    </Option>)
                            })}
                        </Select>
                        {/* Choose Type Job */}
                        <Tabs defaultActiveKey="1" onChange={this._handleTabs}>
                            <TabPane tab="Làm thêm" key="1" onClick={() => { this._handleShowDay(true, 'PARTTIME') }}>
                                <div className='choose-time' style={{ display: show_days === true ? 'block' : 'none' }}>
                                    <div className='choose-shift'>
                                        {list_day_times.map((item, index) => {
                                            return <Button
                                                id={item.shortcut}
                                                key={index}
                                                onClick={this._handleShift}
                                                style={{
                                                    background: list_shift[item.shortcut] ? '#1890ff' : 'white',
                                                    color: list_shift[item.shortcut] ? 'white' : '#1890ff'
                                                }}>
                                                {item.name}

                                            </Button>
                                        })}
                                    </div>
                                    {/* Choose day in week */}
                                    <div className='choose-day'>
                                        {list_week.map((item, index) => {
                                            return (
                                                <Button
                                                    id={item.shortcut}
                                                    key={index}
                                                    className='choose_btn'
                                                    onClick={this._handleTime}
                                                    style={{
                                                        background: list_day[item.shortcut] ? '#1890ff  ' : 'white',
                                                        color: list_day[item.shortcut] ? 'white' : '#1890ff  '
                                                    }}
                                                >{item.shortcut === 'SUN' ? 'CN' : 'T' + (index + 2)}</Button>)
                                        })}
                                    </div>
                                </div>
                            </TabPane>
                            <TabPane tab="Chính thức" key="2" onClick={() => { this._handleShowDay(false, "FULLTIME") }}>
                            </TabPane>
                            <TabPane tab="Thực tập" key="3">
                            </TabPane>
                        </Tabs>

                        {/* Choose Area */}
                        <div className='find-area'>
                            <InputGroup>
                                <Select defaultValue="Option4" style={{ width: '80%' }} size="default" >
                                    <Option value="Option4" onClick={() => { this._handleChooseLocation(false) }}>Chọn khu vực</Option>
                                    <Option value="Option5" onClick={() => { this._handleChooseLocation(true) }}>Chọn vị trí</Option>
                                </Select>
                                <Button size='default'
                                    type='primary'
                                    style={{ width: '20%' }}
                                    onClick={this._openModal}
                                >
                                    <Icon type="environment" />
                                </Button>
                            </InputGroup>
                        </div>
                        <div className='find-now'>
                            <Button
                                size='large'
                                onClick={() => this._createRequest()}
                                style={{
                                    color: 'white',
                                    backgroundColor: 'orange',
                                    border: 'solid white 1px',
                                    width: '100%'
                                }}
                            >
                                <Icon type='search' />Tìm việc ngay
                         </Button>
                        </div>
                    </div>
                    {/* Search in Computer */}
                    <div className='search-box hidden-only-phone'>
                        {/* Choose Option */}
                        <div className='location-address'>
                            <InputGroup>
                                <Button type='primary' onClick={this._handleShowLocation}>{show_location ? 'Ẩn' : 'Xem chi tiết'}</Button>
                                <Input
                                    placeholder='Vị trí của bạn'
                                    value={choose_location ? location.address : area.name}
                                    style={{ width: show_location ? '500px' : '150px' }}
                                    prefix={<Icon type="environment" style={{ color: "green" }} />}
                                    readOnly />
                            </InputGroup>
                        </div>
                        <div>
                            <p style={{ fontSize: '1.5rem', color: 'white' }}>Tìm Công Việc Mơ Ước. Nâng Bước Thành Công!</p>
                        </div>
                        <div className='search-type' style={{ margin: choose_advanced ? '0px' : '30px 0px' }}>
                            <InputGroup size="large" compact>
                                <Select className='primary' defaultValue="Option2" style={{ width: '20%' }} size="large" >
                                    <Option
                                        value="Option2"
                                        // @ts-ignore
                                        onClick={() => { this._handleShowDay('PARTTIME', true) }}
                                    >
                                        Làm thêm (PartTime)
                                        </Option>
                                    <Option
                                        value="Option1"
                                        // @ts-ignore
                                        onClick={() => { this._handleShowDay('FULLTIME', false) }}
                                    >
                                        Chính thức (FullTime)
                                        </Option>
                                    <Option
                                        value="Option3"
                                        // @ts-ignore
                                        onClick={() => { this._handleShowDay('INTERNSHIP', false) }}
                                    >
                                        Thực tập
                                        </Option>
                                </Select>
                                <Select
                                    style={{ width: '35%' }}
                                    placeholder="Tìm kiếm công việc của bạn"
                                    size="large"
                                    showSearch
                                    optionFilterProp="children"
                                    onSearch={(event) => this._onSearch(event)}
                                >
                                    {jobNames && jobNames.map((item, index) => {
                                        return (<Option key={index}
                                            id={item.id}
                                            value={item.name}
                                            onClick={this._selectJob}

                                        >{item.name + '  '}
                                        </Option>)
                                    })}
                                </Select>
                                <Select defaultValue="Option4" style={{ width: '22%' }} size="large" >
                                    <Option value="Option4" onClick={() => { this._handleChooseLocation(false) }}>Chọn khu vực</Option>
                                    <Option value="Option5" onClick={() => { this._handleChooseLocation(true) }}>Chọn vị trí</Option>
                                </Select>
                                <Button size="large"
                                    type='primary'
                                    style={{ width: '23%' }}
                                    onClick={this._openModal}
                                >
                                    <Icon type="environment" color='green' />{choose_location ? 'Định vị bản đồ' : 'Chọn khu vực'}
                                </Button>
                            </InputGroup>
                        </div>
                        {/* Choose Time */}
                        <div className='advanced'>
                            <Button
                                type='danger'
                                size='large'
                                onClick={() => this._createRequest()}
                                style={{ float: 'right' }}
                            >
                                <Icon type='search' /> Tìm việc ngay
                            </Button>
                            <button className='btn-advanced' onClick={() => this.setState({ choose_advanced: !choose_advanced })} >
                                Tùy chọn nâng cao
                                <Icon type="up" style={{ transform: choose_advanced ? 'rotate(0deg)' : 'rotate(180deg)', transition: '0.5s' }} />
                            </button>

                        </div>
                        <div className='choose-time' style={{ display: show_days && choose_advanced ? 'block' : 'none' }}>
                            <div className='choose-shift'>
                                {list_day_times.map((item, index) => {
                                    return <Button
                                        id={item.shortcut}
                                        key={index}
                                        onClick={this._handleShift}
                                        style={{
                                            background: list_shift[item.shortcut] ? '#1890ff  ' : 'white',
                                            color: list_shift[item.shortcut] ? 'white' : '#1890ff'
                                        }}>
                                        {item.name}

                                    </Button>
                                })}
                            </div>
                            {/* Choose day in week */}
                            <div className='choose-day'>
                                {list_week.map((item, index) => {
                                    return (<Button
                                        id={item.shortcut}
                                        key={index}
                                        className='choose_btn'
                                        onClick={this._handleTime}
                                        style={{
                                            background: list_day[item.shortcut] ? '#1890ff  ' : 'white',
                                            color: list_day[item.shortcut] ? 'white' : '#1890ff  '
                                        }}>
                                        {item.name}</Button>)
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => ({
    marker: state.MapState.marker,
    isAuthen: state.AuthState.isAuthen,
    regions: state.Regions.items,
    jobNames: state.JobNames.items,
})

const mapDispatchToProps = (dispatch) => ({
    getJobResult: (body) => dispatch({ type: REDUX_SAGA.JOB_RESULT.GET_JOB_RESULT, body }),
    getJobNames: (name?: string) => dispatch({ type: REDUX_SAGA.JOB_NAMES.GET_JOB_NAMES, name }),
    getRegions: () => dispatch({ type: REDUX_SAGA.REGIONS.GET_REGIONS })
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
