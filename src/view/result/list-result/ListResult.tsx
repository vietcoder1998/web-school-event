import React from 'react';
import { Row, Col, Icon, Spin, Tooltip, Empty } from 'antd';
import { Link } from 'react-router-dom';
import { limitString } from '../../../utils/limitString';
import moment from 'moment';
//@ts-ignore
import TextImage from '../../../assets/image/phone.jpg';
import { convertFullSalary } from '../../../utils/convertNumber';
import { IJobDetail } from '../../../models/job-detail';
// import { IAnnouncement } from '../../../models/announcements';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import LinkToolTip from '../../layout/common/LinkToolTip';
import { _requestToServer } from './../../../services/exec';
import { DELETE, POST } from '../../../const/method';
import { JobType } from '../../layout/common/Common';
import { render } from 'react-dom';

interface IListResultProps {
    listResult?: Array<IJobDetail>;
    loading?: boolean;
    isSearchEvent?: boolean; // phân biệt job-event và job-normal ở 2 trang khác nhau ,
    param?: any
}

interface IListResultState {
    saveMap: boolean[],
    listResult?: Array<IJobDetail>;
}


export default class ListResult extends React.Component<IListResultProps, IListResultState>{
    constructor(props) {
     super(props)
     this.state= {
         saveMap:[],
         listResult: []
     }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.listResult && props.listResult.length>0 ){
            return {
                listResult: props.listResult,
                saveMap: props.listResult.map(item => item.saved)
            }
        }
        return {
            listResult: [],
            saveMap: []
        }   
    }
   

    saveJob =(id: string, saved?: boolean, index?: number) => {
        let {saveMap} = this.state;
        if (id) {
            let saved = saveMap[index]
            _requestToServer(
                !saved ? POST : DELETE,
                !saved ? undefined : [id],
                !saved ? `/api/students/jobs/${id}/saved` : '/api/students/jobs/saved',
                undefined,
                undefined,
                undefined,
                true
            ).then(res=>{
                if (res) {
                    let newSaveMap = saveMap
                    newSaveMap[index] =  !saveMap[index]
                    this.setState({saveMap: newSaveMap})
                    this.forceUpdate()
                }
            })
        }
    }

    render() {
        let { loading, isSearchEvent, param } = this.props;
        let {saveMap, listResult} = this.state;

        return (
            <div className='result' >
                {loading ? <div className='loading'><Spin /></div> : (listResult.length > 0 ? listResult.map((item?: IJobDetail, index?: number) => {
                    let jobTitle = item.jobTitle;
                    if (jobTitle) {
                        jobTitle = jobTitle.toLowerCase();
                    }
                    return (
                        // <LazyLoadComponent>
                        <Row key={index} className='result-item' >
                            {/* Image */}
                            <Col xs={3} sm={4} md={4} lg={4} xl={4} xxl={4} >
                                {/* <Link to={`/job-detail/${window.btoa(item.id)}`} target='_blank'> */}
                                <div className='image-content'>
                                    <Link to={`/employer/${btoa(item.employerID)}`}>
                                        <LazyLoadImage src={item.employerLogoUrl ? item.employerLogoUrl : TextImage} alt={item.employerName} />
                                    </Link>
                                    <JobType>
                                        {item.jobType}
                                    </JobType>
                                </div>
                                {/* </Link> */}
                            </Col>
                            {/* Content */}
                            <Col xs={19} sm={19} md={18} lg={18} xl={18} xxl={18} className='item-content'>
                                <div className='item-header'>
                                    <h4 >
                                        <Link
                                            style={{ color: item.priority === 'TOP' ? 'red' : 'black' }}
                                            to={isSearchEvent ? `event-job-detail/${window.btoa(item.id)}${param}` : `/chi-tiet-cong-viec/${window.btoa(item.id)}${param}`}
                                            target='_blank'
                                        >
                                            <LinkToolTip
                                                title={jobTitle}
                                                name={limitString(jobTitle, 60)}
                                                transform={"uppercase"}
                                            />
                                        </Link>
                                        {item.priority === 'TOP' ? <Tooltip title='Công việc hot'>
                                            <span> <Icon type='fire' twoToneColor="#eb2f96" style={{ color: 'red' }} /></span>
                                        </Tooltip> : null}
                                    </h4>
                                </div>
                                {/* Info */}
                                <div
                                    className='item-info'
                                >
                                    <div>
                                        {/* <p> */}
                                        <Link
                                            to={`/employer/${window.btoa(item.employerID)}${param}`}
                                            target='_blank'
                                            className="name_employer"
                                        >
                                            <Icon type="shop" style={{ color: '#168ECD', marginRight: 5 }} />
                                            {item.employerName ? item.employerName.toUpperCase() : null}
                                        </Link>
                                        {/* </p> */}
                                    </div>
                                    <div
                                        className='item-detail'
                                    >
                                        <Row style={{ margin: "10px 0px" }}>
                                            <Col xs={24} sm={24} md={10} lg={10} xl={10} >
                                                <Icon type="calendar" style={{ color: '#168ECD' }} /> <span>Ngày đăng: {moment(item.createdDate).format('DD/MM/YYYY')}</span>
                                            </Col>
                                            <Col xs={24} sm={24} md={12} lg={10} xl={12} >
                                                <Icon type="calendar" style={{ color: '#168ECD' }} /> <span>Hết hạn: {moment(item.expirationDate).format('DD/MM/YYYY')}</span>
                                            </Col>
                                            <Col xs={24} sm={24} md={10} lg={10} xl={10} >
                                                <Icon type='environment' style={{ color: '#168ECD' }} /><span>Tỉnh thành: {item.region.name}</span>
                                            </Col>
                                            <Col xs={24} sm={24} md={14} lg={14} xl={14} >
                                                <Icon type="dollar" style={{ color: '#168ECD' }} /> <span>Lương: {convertFullSalary(item.minSalary, item.minSalaryUnit, item.maxSalary, item.maxSalaryUnit)}</span>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Col>
                            {/* Save */}
                            <Col xs={1} sm={1} md={2} lg={2} xl={2} className='item-option '>
                                <Tooltip title='Lưu lại'>
                                    <div className='item-save'
                                        style={{ display: localStorage.getItem("actk") ? 'block' : 'none' }}
                                        onClick={() => {
                                            this.saveJob(item.id, item.saved, index);
                                        }}
                                    >
                                        <Icon
                                            type="heart"
                                            style={{ color: saveMap && saveMap[index] ? "red" : null, fontSize: 18 }}
                                        />
                                    </div>
                                </Tooltip>
                            </Col>
                        </Row >
                    )
                }) : <Empty style={{ minHeight: '500px', backgroundColor: 'white', padding: '8.5vw 0', margin: '0' }} description={'Không tìm thấy công việc liên quan'} />)}
            </div >
        )
    }
    
}