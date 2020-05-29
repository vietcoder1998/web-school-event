import React, { Component } from 'react';
import { Input, Select, Button, Icon, Modal, Tabs, Col, Row } from 'antd';
import './SearchBox.scss';
import { connect } from 'react-redux';
import { REDUX_SAGA, REDUX } from '../../../../../const/actions';
//@ts-ignore
import CHPlay from '../../../../../assets/image/CHPlay.png';
//@ts-ignore
import AppStore from '../../../../../assets/image/app-store.png';
//@ts-ignore
import QRCodeAppStore from '../../../../../assets/image/qr-code-appstore.png';
//@ts-ignore
import QRCodeCHPlay from '../../../../../assets/image/qr-code-chplay.png';
import qs from 'query-string';


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

// let region = JSON.parse(localStorage.getItem('region'));


interface IProps {
    marker?: any;
    getJobResult?: Function;
    history?: any;
    getRegions?: Function;
    getJobNames?: Function;
    jobNames?: Array<any>;
    regions?: Array<any>;
    setFilterJobType?: any;
    jobType?: any;
    setFilterListShift?: any;
    list_shift?: any;
    list_day?: any;
    setFilterArea?: any;
    area?: any;
    job_dto?: any;
    setFilterJobName?: any;
    setFilterListDay?: any;
    show_days?: any;
    setFilter?: any
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
    choose_location?: boolean,
    visible?: boolean,
    showQRImageType?: any
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
                SAT: false,
                SUN: false,
            },

            jobType: 'PARTTIME',

            list_shift: {
                MOR: true,
                AFT: false,
                EVN: false,
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
            choose_location: false,
            visible: false,
            showQRImageType: 0,
        }
    }

    _isMounted = false;

    async componentDidMount() {
        this.props.getRegions();
        // this.props.getJobNames();
        if (!this.props.area) {
            // this.setState({ area: region })
            this.props.setFilterArea({ id: 24, name: 'Hà Nội' });
        }
        // console.log('vao componentDidMount search box');
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = e => {
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };
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
        // let { list_shift } = this.state;
        let { list_shift } = this.props;
        let shift = e.target.id;
        list_shift[shift] = !list_shift[shift];
        this.setState({ list_shift });
        this.props.setFilterListShift(list_shift)
    }

    _handleTime = (e) => {
        let { list_day } = this.props;
        let day = e.target.id;
        list_day[day] = !list_day[day];
        this.setState({ list_day });
        this.props.setFilterListDay(list_day)
    }

    _handleShowDay = (jobType, show_days) => {
        let show_days_;
        if (show_days) {
            show_days_ = show_days
        } else {
            show_days = false
        };

        this.setState({ show_days: show_days_, jobType })
        this.props.setFilterJobType(jobType, show_days_)
    }

    _selectJob = (e) => {
        let { job_dto } = this.props;
        job_dto.name = e.key;
        job_dto.id = e.item.props.id;
        // this.setState({ job_dto });
        this.props.setFilterJobName(job_dto);
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
        this.props.setFilterArea(item);
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
        let { regions, area } = this.props;
        return (
            <Select
                showSearch={true}
                defaultValue={area ? area.name : 'Chọn tỉnh thành bạn muốn'} style={{ width: '80%' }}
                size="default"
            >
                {regions.map((item, index) => {
                    return <Select.Option
                        key={index}
                        value={item.name}
                        onClick={() => { this._setArea(item) }} >{item.name}</Select.Option>
                })}
            </Select>)
    }

    _createRequest = () => {
        let {
            // list_shift,
            // list_day,
            location,
            choose_location,
        } = this.state;
        let { jobType, list_shift, list_day, area, job_dto, show_days } = this.props

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
        let { job_dto, area, list_day, list_shift } = this.props
        let jobNameID = job_dto.id ? job_dto.id : null;
        let regionID = area.id ? area.id : null;
        this.props.setFilter(true);
        localStorage.setItem('paging', JSON.stringify({ pageIndex: 0, pageSize: 10 }));
        localStorage.setItem('searchData', data);
        this.props.getJobResult(data);

        let queryParam = {};
        queryParam.jobType = this.props.jobType;
        queryParam.jobNameID = jobNameID;
        queryParam.regionID = regionID;
        queryParam = Object.assign(queryParam, list_day)
        queryParam = Object.assign(queryParam, list_shift)
        queryParam = qs.stringify(queryParam)

        // console.log(queryParam);

        this.props.history.push('/result?' + queryParam);

    }

    componentWillUnmount() {
        this._isMounted = true;
    }

    render() {
        let {

            choose_advanced,
            showQRImageType
        } = this.state;

        let { jobNames, regions, list_shift, list_day, area, job_dto, show_days } = this.props;

        return (
            <>
                {/* Choose location modal */}
                {/* <Modal
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
                </Modal> */}
                <Modal
                    title="Mã QR ứng dụng tìm việc"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                    <Button key="submit" type="primary" onClick={this.handleOk}>
                    Ok
                    </Button>]}
                >
                    {showQRImageType === 1 ?
                        <div style={{ textAlign: 'center' }}>
                            <img src={QRCodeAppStore} alt='AppleStore Tìm việc QRCode' height='250px' width='auto' style={{ marginTop: '1.2px', marginLeft: '5px' }} />
                            <div>Ứng dụng tìm việc Worksvn trên AppleStore</div>
                        </div>
                        :
                        <div style={{ textAlign: 'center' }}>
                            <img src={QRCodeCHPlay} alt='CHPlay Tìm việc QRCode' height='250px' width='auto' style={{ marginTop: '1.2px', marginLeft: '5px' }} />
                            <div>Ứng dụng tìm việc Worksvn trên CHPlay</div>                        
                        </div>
                    }
                </Modal>
                <div className='search-area'>
                    {/* Search Box in Phone */}
                    <div className='search-box-phone show-only-phone'>
                        <Select
                            style={{ width: '100%' }}
                            placeholder="Tìm kiếm công việc của bạn"
                            size="default"
                            showSearch
                            optionFilterProp="children"
                            onSearch={this._onSearch}
                            defaultValue={job_dto && job_dto.name ? job_dto.name : undefined}
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
                        {/* Choose Area */}
                        <div className='find-area'>
                            <InputGroup>
                                <Select defaultValue={area ? area.name : 'Chọn tỉnh thành bạn muốn'} style={{ width: '100%' }} size="default" >
                                    {regions.map((item, index) => {
                                        return <Select.Option
                                            key={index}
                                            value={item.name}
                                            onClick={() => { this._setArea(item) }} >{item.name}</Select.Option>
                                    })}
                                </Select>
                            </InputGroup>
                        </div>
                        {/* Choose Type Job */}
                        <Tabs defaultActiveKey={this.props.jobType == 'PARTTIME' ? '1' : (this.props.jobType == 'FULLTIME' ? '2' : '3')} onChange={this._handleTabs}>
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


                        <div className='find-now'>
                            <Button
                                size='large'
                                onClick={() => this._createRequest()}
                                type='danger'
                                style={{
                                    color: 'white',
                                    // backgroundColor: 'orange',
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
                        {/* <div className='location-address'>
                            <InputGroup>
                                <Button type='primary' onClick={this._handleShowLocation}>{show_location ? 'Ẩn' : 'Xem chi tiết'}</Button>
                                <Input
                                    placeholder='Vị trí của bạn'
                                    value={choose_location ? location.address : area.name}
                                    style={{ width: show_location ? '500px' : '150px' }}
                                    prefix={<Icon type="environment" style={{ color: "green" }} />}
                                    readOnly />
                            </InputGroup>
                        </div> */}

                        <div>
                            <p style={{ fontSize: '1.5rem', color: 'white', fontWeight: 550, marginBottom: '5px' }}>Tìm Công Việc Mơ Ước. Nâng Bước Thành Công!</p>
                        </div>
                        {/* Choose Type Job */}
                        <Tabs defaultActiveKey={this.props.jobType == 'PARTTIME' ? '1' : (this.props.jobType == 'FULLTIME' ? '2' : '3')} onChange={this._handleTabs}>
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
                                                    color: list_shift[item.shortcut] ? 'white' : 'black',
                                                    border: list_day[item.shortcut] ? 'solid 1px rgb(24, 144, 255)' : 'white'
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
                                                        color: list_day[item.shortcut] ? 'white' : 'black',
                                                        border: list_day[item.shortcut] ? 'solid 1px rgb(24, 144, 255)' : 'white'
                                                    }}
                                                >{item.shortcut === 'SUN' ? 'CN' : 'Thứ ' + (index + 2)}</Button>)
                                        })}
                                    </div>
                                </div>
                            </TabPane>
                            <TabPane tab="Chính thức" key="2" onClick={() => { this._handleShowDay(false, "FULLTIME") }}>
                            </TabPane>
                            <TabPane tab="Thực tập" key="3">
                            </TabPane>
                        </Tabs>
                        <div className='search-type' style={{ margin: choose_advanced ? '0px' : '20px 0px' }}>
                            <InputGroup size="large" compact>
                                {/* <Select className='primary' defaultValue="Option2" style={{ width: '20%' }} size="large" >
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
                                </Select> */}
                                <Select
                                    style={{ width: '45%' }}
                                    placeholder="Tìm kiếm công việc của bạn"
                                    size="large"
                                    showSearch
                                    optionFilterProp="children"
                                    onSearch={(event) => this._onSearch(event)}
                                    defaultValue={job_dto && job_dto.name ? job_dto.name : undefined}
                                >
                                    <Option
                                        key={'1'}
                                        value={null}
                                        onClick={() => {
                                            this.props.setFilterJobName({ id: null, name: 'Tất cả các công việc' })
                                        }}
                                    >
                                        Tất cả các công việc
                                    </Option>
                                    {jobNames && jobNames.map((item, index) => {
                                        return (<Option key={index}
                                            id={item.id}
                                            value={item.name}
                                            onClick={this._selectJob}

                                        >{item.name + '  '}
                                        </Option>)
                                    })}
                                </Select>
                                {/* <Select defaultValue="Option4" style={{ width: '32%' }} size="large" >
                                    <Option value="Option4" onClick={() => { this._handleChooseLocation(false) }}>Chọn khu vực</Option>
                                    <Option value="Option5" onClick={() => { this._handleChooseLocation(true) }}>Chọn vị trí</Option>
                                </Select> */}
                                <Select
                                    showSearch={true}
                                    defaultValue={area ? area.name : 'Chọn tỉnh thành bạn muốn'} style={{ width: '32%' }}
                                    size="large"
                                >
                                    <Option
                                        key={'1'}
                                        value={null}
                                        onClick={() => { this._setArea({ id: null, name: 'Tất cả các tỉnh thành' }) }}
                                    >
                                        Tất cả các tỉnh thành
                                    </Option>
                                    {regions.map((item, index) => {
                                        return <Select.Option
                                            key={index}
                                            value={item.name}
                                            onClick={() => { this._setArea(item) }} >{item.name}</Select.Option>
                                    })}
                                </Select>

                                <Button size="large"
                                    // type='primary'
                                    type='danger'
                                    style={{ width: '23%' }}
                                    // onClick={this._openModal}
                                    onClick={() => this._createRequest()}
                                >
                                    <Icon type='search' />Tìm việc ngay
                                </Button>
                            </InputGroup>
                        </div>
                        <div style={{ paddingTop: "25px", paddingBottom: "15px" }}>
                            <p style={{ color: '#fff' }}>Trải nghiệm tìm việc đỉnh cao bằng ứng dụng Worksvn trên điện thoại!</p>
                            <Row>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} style={{ justifyContent: 'flex-end', display: 'flex', padding: '0 15px', borderRight: '1px solid #fff' }}>
                                    <a href={'https://apps.apple.com/vn/app/worksvn-sinh-vi%C3%AAn/id1492437454'}>
                                        <img src={AppStore} alt='AppleStore Tìm việc' height='50px' width='auto' />
                                    </a>

                                    <img onClick={() => { this.setState({ visible: true, showQRImageType: 1 }) }} src={QRCodeAppStore} alt='AppleStore Tìm việc QRCode' height='47px' width='auto' style={{ marginTop: '1.2px', marginLeft: '5px', cursor: 'pointer' }} />
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} style={{ justifyContent: 'flex-start', display: 'flex', padding: '0 15px' }}>
                                    <a href={'https://play.google.com/store/apps/details?id=com.worksvn.candidate&hl=vi'}>
                                        <img src={CHPlay} alt='CHPlay Tìm việc' height='50px' width='auto' />
                                    </a>
                                    <img onClick={() => { this.setState({ visible: true, showQRImageType: 2 }) }} src={QRCodeCHPlay} alt='CHPlay Tìm việc QRCode' height='47px' width='auto' style={{ marginTop: '1.2px', marginLeft: '5px', cursor: 'pointer' }} />
                                </Col>
                            </Row>
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
    jobType: state.JobResult.filter.jobType,
    show_days: state.JobResult.filter.show_days,
    list_shift: state.JobResult.filter.list_shift,
    list_day: state.JobResult.filter.list_day,
    area: state.JobResult.filter.area,
    job_dto: state.JobResult.filter.job_dto,

})

const mapDispatchToProps = (dispatch) => ({
    getJobResult: (body) => dispatch({ type: REDUX_SAGA.JOB_RESULT.GET_JOB_RESULT, body }),
    getJobNames: (name?: string) => dispatch({ type: REDUX_SAGA.JOB_NAMES.GET_JOB_NAMES, name }),
    getRegions: () => dispatch({ type: REDUX_SAGA.REGIONS.GET_REGIONS }),
    setFilterJobType: (jobType, show_days) => dispatch({ type: REDUX.JOB_RESULT.SET_FILTER_JOB_TYPE, jobType, show_days }),
    setFilterListShift: (list_shift) => dispatch({ type: REDUX.JOB_RESULT.SET_FILTER_LIST_SHIFT, list_shift }),
    setFilterListDay: (list_day) => dispatch({ type: REDUX.JOB_RESULT.SET_FILTER_LIST_DAY, list_day }),
    setFilterArea: (area) => dispatch({ type: REDUX.JOB_RESULT.SET_FILTER_AREA, area }),
    setFilterJobName: (job_dto) => dispatch({ type: REDUX.JOB_RESULT.SET_FILTER_JOBNAME, job_dto }),
    setFilter: (setFilter) => dispatch({ type: REDUX.JOB_RESULT.SET_FILTER, setFilter }),

})

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
