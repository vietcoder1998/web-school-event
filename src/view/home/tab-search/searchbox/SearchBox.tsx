import React, { Component } from 'react';
import { Input, Select, Button, Icon, Modal, Tabs,Affix } from 'antd';
import './SearchBox.scss';
import { connect } from 'react-redux';
import { REDUX_SAGA, REDUX } from '../../../../const/actions';
//@ts-ignore
// import CHPlay from '../../../../assets/image/CHPlay.png';
//@ts-ignore
// import AppStore from '../../../../assets/image/app-store.png';
//@ts-ignore
import QRCodeAppStore from '../../../../assets/image/qr-code-appstore.png';
//@ts-ignore
import QRCodeCHPlay from '../../../../assets/image/qr-code-chplay.png';
import qs from 'query-string';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { TYPE } from '../../../../const/type';
import { Link } from 'react-router-dom';

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
    jobName?: any;
    setFilterJobName?: any;
    setFilterListDay?: any;
    show_days?: any;
    setFilter?: any;
    primaryColor?: string;
    param?: string;
    textSearch?: string;
    getMajors: (name?: string) => any;
    majors?: Array<any>
    setFilterMajor: Function;
    major?: any;
    title?: string;
    setFilterJobtitle?: Function;
};

interface IState {
    jobName?: { name?: string, id?: 0 },
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
    showQRImageType?: any,
    title?: string;
};

class SearchBox extends Component<IProps, IState>{
    constructor(props) {
        super(props);
        this.state = {
            jobName: { name: '', id: 0 },
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
            show_days: false,
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
            title: null,
            showQRImageType: 0
        }
    }

    _isMounted = false;

    async componentDidMount() {
        this.props.getRegions();
        this.props.getJobNames();
        this.props.getMajors();
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
        let { jobName } = this.state;
        this.setState({ jobName })
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
        if (e) {
            let { jobNames } = this.props;
            let jobName = jobNames && jobNames.length > 0 ? jobNames.find(item => item.name === e) : { id: null, name: null }
            if (jobName && jobName.id) {
                this.props.setFilterJobName(jobName)
            }

            this.props.setFilterJobtitle(e)
            localStorage.setItem("wls", e)
        }
    }

    _selectMajor = (e) => {
        if (e) {
            let { majors } = this.props;
            let major = majors && majors.length > 0 ? majors.find(item => item.name === e) : { id: null, name: null }
            this.props.setFilterMajor(major)
        }
    }

    _setArea = (event) => {
        if (event) {
            let { regions } = this.props;
            let area = regions && regions.length > 0 ? regions.find(item => item.name === event) : { id: null, name: null }
            this.setState({ area });
            this.props.setFilterArea(area);
            localStorage.setItem("region", JSON.stringify(area))
        }
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
        // console.log(event)
        this.props.setFilterJobtitle(event)
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

    _handleTabs = (jobType?:  string) => {
        let showDay = false
        if (jobType===TYPE.ALL) {
            jobType=null
        }
        if (jobType===TYPE.PARTTIME) {
            showDay=true
        }

        this._handleShowDay(jobType,showDay )
    }

    keyJobType(jobType) {
        switch (jobType) {
            case null:
                return '0'
            case 'PARTTIME':
                return '1'
            case 'FULLTIME':
                return '2'
            case 'INTERNSHIP':
                return '3'
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
                onChange={this._setArea}
            >
                {regions && regions.length > 0 ? regions.map(item => <Option
                    key={item.id}
                    value={item.name}
                    children={item.name} />) : null
                }
            </Select>)
    }

    _createRequest = () => {
        let {
            // list_shift,
            // list_day,
            location,
            choose_location,
        } = this.state;
        let { jobType, list_shift, list_day, area, jobName, show_days, major, title } = this.props

        let employerID = null;
        let excludedJobIDs = null;
        let excludePriority = null;
        let jobNameIDs = jobName && jobName.id ? [jobName.id] : null;
        let majorIDs = major && major.id ? [major.id] : null;
        let jobGroupID = null;
        let shuffle = true;
        let jobShiftFilter = {
            gender: 'BOTH',
            weekDays: [],
            dayTimes: []
        };
        let jobTitle = jobName && jobName.id ? null : title
        let jobLocationFilter = {
            regionID: null,
            lat: null,
            lon: null,
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
                jobLocationFilter,
                majorIDs,
                jobTitle
            }
        )
    }

    requestToServer(data) {
        let { jobName, area, list_day, list_shift, major, title } = this.props
        let jobNameID = jobName && jobName.id ? jobName.id : null;
        let majorID = major && major.id ? major.id : null;
        let regionID = area && area.id ? area.id : null;
        let jobTitle = jobName && jobName.id ? null : title;
        this.props.setFilter(true);
        localStorage.setItem('paging', JSON.stringify({ pageIndex: 0, pageSize: 10 }));
        localStorage.setItem('searchData', data);
        localStorage.setItem('wls', this.props.title)
        this.props.getJobResult(data);

        let queryParam: Object = {
            jobType: this.props.jobType,
            jobNameID,
            regionID,
            majorID,
            jobTitle
        };

        queryParam = Object.assign(queryParam, list_day)
        queryParam = Object.assign(queryParam, list_shift)
        queryParam = qs.stringify(queryParam)

        // console.log(queryParam);
        if (this.props.param) {
            // let param = this.props.param.substring(1)
            let param = qs.parse(this.props.param)
            this.props.history.push('/result?' + queryParam + '&eventID=' + param.eventID + '&schoolID=' + param.schoolID)
        } else {
            this.props.history.push('/result?' + queryParam);
        }
    }

    componentWillUnmount() {
        this._isMounted = true;
    }

    render() {
        let {
            choose_advanced,
            showQRImageType
        } = this.state;

        let { jobNames, regions, list_shift, list_day, area, jobName, show_days, primaryColor, majors, major } = this.props;
        return (
            <>
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
                            <LazyLoadImage data-src={QRCodeAppStore} alt='AppleStore Tìm việc QRCode' height='250px' width='auto' style={{ marginTop: '1.2px', marginLeft: '5px' }} />
                            <div>Ứng dụng tìm việc Worksvn trên AppleStore</div>
                        </div>
                        :
                        <div style={{ textAlign: 'center' }}>
                            <LazyLoadImage data-src={QRCodeCHPlay} alt='CHPlay Tìm việc QRCode' height='250px' width='auto' style={{ marginTop: '1.2px', marginLeft: '5px' }} />
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
                            onChange={this._selectJob}
                            defaultValue={jobName && jobName.name ? jobName.name : undefined}
                        >
                            {jobNames && jobNames.map(item => <Option
                                key={item.id}
                                value={item.name}
                                children={item.name}
                            />
                            )}
                        </Select>
                        {/* Choose Area */}
                        <div className='find-area'>
                            <InputGroup>
                                <Select
                                    defaultValue={area ? area.name : 'Chọn tỉnh thành bạn muốn'}
                                    style={{ width: '100%' }}
                                    size="default"
                                    onChange={this._setArea}
                                >
                                    {regions && regions.length > 0 ? regions.map(item => <Option
                                        key={item.id}
                                        value={item.name}
                                        children={item.name} />) : null
                                    }
                                </Select>
                            </InputGroup>
                        </div>
                        {/* Choose Type Job */}
                        <Tabs defaultActiveKey={this.props.jobType} onChange={this._handleTabs}>
                            <TabPane tab="Làm thêm" key={TYPE.PARTTIME} >
                                <div className='choose-time' style={{ display: show_days === true ? 'block' : 'none' }}>
                                    <div className='choose-shift'>
                                        {list_day_times.map((item, index) => {
                                            return <Button
                                                id={item.shortcut}
                                                key={index}
                                                onClick={this._handleShift}
                                                style={{
                                                    background: list_shift[item.shortcut] ? primaryColor : 'white',
                                                    color: list_shift[item.shortcut] ? 'white' : primaryColor
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
                                                        background: list_day[item.shortcut] ? primaryColor : 'white',
                                                        color: list_day[item.shortcut] ? 'white' : primaryColor
                                                    }}
                                                >{item.shortcut === 'SUN' ? 'CN' : 'T' + (index + 2)}</Button>)
                                        })}
                                    </div>
                                </div>
                            </TabPane>
                            <TabPane tab="Chính thức" key={TYPE.FULLTIME} />
                            <TabPane tab="Thực tập" key={TYPE.INTERNSHIP} />
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
                        <div>
                            <p style={{ fontSize: '1.8rem', color: 'white', fontWeight: 550, marginBottom: '5px' }}>Định Hướng Việc Hay, Nhận Ngay Khi Rảnh!</p>
                        </div>
                        {/* Choose Type Job */}
                        <Tabs defaultActiveKey={TYPE.ALL} onChange={this._handleTabs}>
                            <TabPane tab="Tất cả loại công việc" key={TYPE.ALL} />
                            <TabPane tab="Làm thêm" key={TYPE.PARTTIME}/>
                            <TabPane tab="Chính thức" key={TYPE.FULLTIME} />
                            <TabPane tab="Thực tập" key={TYPE.INTERNSHIP} />
                        </Tabs>
                        <Affix offsetTop={-20}>
                            <div className='search-type' style={{ margin: choose_advanced ? '0px' : '20px 0px' }}>
                                <InputGroup
                                    size="large"
                                    compact
                                    style={{ fontSize: "1.2rem" }}
                                >
                                    <Select
                                        showSearch={true}
                                        defaultValue={
                                            area ? area.name : 'Chọn tỉnh thành'}
                                        style={{ width: '20%' }}
                                        size="large"
                                        onChange={event => this._setArea(event)}
                                        suffixIcon={<Icon type="environment" />}
                                        autoFocus={false}
                                    >
                                        <Option
                                            key={'1'}
                                            value={null}
                                            style={{fontWeight: "bold", color: "red"}}
                                            children={ "Tất cả các tỉnh thành"}
                                        />
                                        {
                                            regions && regions.length > 0 ?
                                                regions.map(item => <Option 
                                                    key={item.id} 
                                                    value={item.name} 
                                                    style={{fontWeight: "bold"}}
                                                    children={item.name} 
                                                    />) : null
                                        }
                                    </Select>
                                    <Select
                                        style={{ width: '40%'}}
                                        placeholder="Tìm kiếm công việc của bạn"
                                        size="large"
                                        showSearch
                                        optionFilterProp="children"
                                        onSearch={(event) => this._onSearch(event)}
                                        onChange={this._selectJob}
                                        defaultValue={"Tất cả các công việc"}
                                        suffixIcon={<Icon type="tool" />}
                                        // onInputKeyDown={event => {if (event.keyCode === 13){this._createRequest()}}}
                                    >
                                        <Option
                                            key={'1'}
                                            value={null}
                                            style={{fontWeight: "bold", color: "red", fontStyle: "italic"}}
                                            children={" Tất cả các công việc"}
                                        />
                                        {
                                            this.props.title ?
                                                <Option
                                                    value={this.props.title}
                                                    style={{fontWeight: "bold"}}
                                                    children={this.props.title}
                                                /> : null
                                        }
                                        {
                                            jobNames && jobNames.length > 0 ? jobNames.map(item =>
                                                <Option key={item.id}
                                                    value={item.name}
                                                    style={{fontWeight: "bold"}}
                                                    children={item.name} />) : null
                                        }
                                    </Select>
                                    <Select
                                        style={{ width: '20%' }}
                                        placeholder="Chuyên ngành"
                                        size="large"
                                        showSearch
                                        optionFilterProp="children"
                                        onSearch={(event) => this.props.getMajors(event)}
                                        defaultValue={
                                            major &&
                                                major.name ?
                                                major.name :
                                                "Tất cả các chuyên ngành"
                                        }
                                        suffixIcon={<Icon type="branches" />}
                                        onChange={this._selectMajor}
                                    >
                                        <Option
                                            key={'1'}
                                            value={null}
                                            style={{fontWeight: "bold", color: "red", fontStyle: "italic"}}
                                            children={"Tất cả các chuyên ngành"}
                                        />
                                        {
                                            majors && majors.length > 0 ? majors.map(item => <Option key={item.id}
                                                value={item.name}
                                                style={{fontWeight: "bold"}}
                                                children={item.name}
                                            />
                                            ) : ""}
                                    </Select>
                                    <Button size="large"
                                        // type='primary'
                                        type='danger'
                                        style={{ width: '20%', fontWeight: "bold" }}
                                        // onClick={this._openModal}
                                        onClick={() => this._createRequest()}
                                        icon="search"
                                    >
                                        Tìm việc ngay
                                    </Button>
                                </InputGroup>
                            </div>
                        </Affix>
                        <div className='choose-time'>
                            {
                                show_days?<> <div className='choose-shift'>
                                    {list_day_times.map((item, index) => {
                                        return <Button
                                            id={item.shortcut}
                                            key={index}
                                            onClick={this._handleShift}
                                            style={{
                                                background: list_shift[item.shortcut] ? primaryColor : 'white',
                                                color: list_shift[item.shortcut] ? 'white' : 'black',
                                                border: list_day[item.shortcut] ? `solid ${primaryColor} 2px` : 'white',
                                                fontWeight: "bold"
                                            }}>
                                            {item.name}

                                        </Button>
                                    })}
                                </div>
                                <div className='choose-day'>
                                {list_week.map((item, index) => {
                                    return (
                                        <Button
                                            id={item.shortcut}
                                            key={index}
                                            className='choose_btn'
                                            onClick={this._handleTime}
                                            style={{
                                                fontStyle: "bold",
                                                background: list_day[item.shortcut] ? primaryColor : 'white',
                                                color: list_day[item.shortcut] ? 'white' : 'black',
                                                border: list_day[item.shortcut] ? `solid 1px ${primaryColor}` : 'white',
                                                fontWeight: 'bold'
                                            }}
                                        >{item.shortcut === 'SUN' ? 'CN' : 'Thứ ' + (index + 2)}</Button>)
                                })}
                            </div>
                            </>:null
                            }

                            {/* Choose day in week */}
                            
                        </div>
                        {/* <div>{this.props.jobType === 'PARTTIME' ? null :
                            <div style={{ paddingTop: "25px", paddingBottom: "15px" }}>
                                <p style={{ color: '#fff' }}>Trải nghiệm tìm việc đỉnh cao bằng ứng dụng Worksvn trên điện thoại!</p>
                                <Row>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} style={{ justifyContent: 'flex-end', display: 'flex', padding: '0 15px', borderRight: '1px solid #fff' }}>
                                        <a href={'https://apps.apple.com/vn/app/worksvn-sinh-vi%C3%AAn/id1492437454'}>
                                            <LazyLoadImage src={AppStore} alt='AppleStore Tìm việc' height='50px' width='auto' />
                                        </a>

                                        <LazyLoadImage onClick={() => { this.setState({ visible: true, showQRImageType: 1 }) }} src={QRCodeAppStore} alt='AppleStore Tìm việc QRCode' height='47px' width='auto' style={{ marginTop: '1.2px', marginLeft: '5px', cursor: 'pointer' }} />
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} style={{ justifyContent: 'flex-start', display: 'flex', padding: '0 15px' }}>
                                        <a href={'https://play.google.com/store/apps/details?id=com.worksvn.candidate&hl=vi'}>
                                            <LazyLoadImage src={CHPlay} alt='CHPlay Tìm việc' height='50px' width='auto' />
                                        </a>
                                        <LazyLoadImage onClick={() => { this.setState({ visible: true, showQRImageType: 2 }) }} src={QRCodeCHPlay} alt='CHPlay Tìm việc QRCode' height='47px' width='auto' style={{ marginTop: '1.2px', marginLeft: '5px', cursor: 'pointer' }} />
                                    </Col>
                                </Row>
                            </div>}
                        </div> */}
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
    jobName: state.JobResult.filter.jobName,
    major: state.JobResult.filter.major,
    primaryColor: state.DetailEvent.primaryColor,
    param: state.DetailEvent.param,
    majors: state.Majors.items,
    title: state.JobResult.filter.jobTitle
})

const mapDispatchToProps = (dispatch) => ({
    getJobResult: (body) => dispatch({ type: REDUX_SAGA.JOB_RESULT.GET_JOB_RESULT, body }),
    getJobNames: (name?: string) => dispatch({ type: REDUX_SAGA.JOB_NAMES.GET_JOB_NAMES, name }),
    getMajors: (name?: string) => dispatch({ type: REDUX_SAGA.MAJOR.GET_MAJOR, name }),
    getRegions: () => dispatch({ type: REDUX_SAGA.REGIONS.GET_REGIONS }),
    setFilterJobType: (jobType, show_days) => dispatch({ type: REDUX.JOB_RESULT.SET_FILTER_JOB_TYPE, jobType, show_days }),
    setFilterListShift: (list_shift) => dispatch({ type: REDUX.JOB_RESULT.SET_FILTER_LIST_SHIFT, list_shift }),
    setFilterListDay: (list_day) => dispatch({ type: REDUX.JOB_RESULT.SET_FILTER_LIST_DAY, list_day }),
    setFilterArea: (area) => dispatch({ type: REDUX.JOB_RESULT.SET_FILTER_AREA, area }),
    setFilterJobName: (jobName) => dispatch({ type: REDUX.JOB_RESULT.SET_FILTER_JOBNAME, jobName }),
    setFilterMajor: (major) => dispatch({ type: REDUX.JOB_RESULT.SET_FILTER_MAJOR, major }),
    setFilter: (setFilter) => dispatch({ type: REDUX.JOB_RESULT.SET_FILTER, setFilter }),
    setFilterJobtitle: (jobTitle) => dispatch({ type: REDUX.JOB_RESULT.SET_JOB_TITLE, jobTitle })
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
