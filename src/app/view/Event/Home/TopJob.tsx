import React, {PureComponent} from "react";
import {Col, Row, Pagination, Icon} from "antd";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {convertFullSalary} from '../../../../utils/convertNumber'
//@ts-ignore
import DefaultImage from "../../../../assets/image/base-image.jpg";
import {REDUX_SAGA} from "../../../../const/actions";
import {JobType} from "../../layout/common/Common";

interface IProps {
    getEventHotJob?: Function;
    getInDay?: Function;
    topJob?: any;
    indayJob?: any;
    setLoadinggetEventHotJob?: Function;
    loading_hot_job?: any;
    param?: any
}

class TopJob extends PureComponent<IProps> {
    constructor(props) {
        super(props);
        this.state = {
            current: 1,
        };
    }

    componentDidMount = async () => {

    };

    changePage = (event?: number) => {
        this.props.getEventHotJob(event - 1);
        this.setState({
            current: event,
        });
    };

    render() {
        let {topJob, param} = this.props;
        return (
            <Row
                className="home-job"
                style={{display: topJob.totalItems === 0 ? "none" : ""}}
            >
                <h5 style={{textAlign: "center"}}>VIỆC LÀM NỔI BẬT TRONG NGÀY HỘI</h5>
                {topJob && topJob.items
                    ? topJob.items.map((item, index) => {
                        let logoUrl = item.employerLogoUrl;

                        if (!logoUrl) {
                            logoUrl = DefaultImage;
                        }

                        return (
                            <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6} key={index}>
                                <div key={index} className="h-j-item-top">
                                    <div className="img-job">
                                        <img src={logoUrl} alt="employer logo"/>
                                        <JobType>{item.jobType}</JobType>
                                    </div>
                                    <div>

                                        <div className="job-content">
                                            <ul>
                                                <li className="j-d">
                                                    <Link
                                                        to={`/event-job-detail/${window.btoa(item.id)}${param}`}
                                                        target="_blank"
                                                    >
                                                        <h6
                                                            className="l_c"
                                                            style={{
                                                                color: item.titleHighlight ? "red" : "black",
                                                            }}
                                                        >
                                                            <span className="top-badge"
                                                                  style={{marginRight: 5}}>Hot</span>
                                                            {item.jobTitle}
                                                        </h6>
                                                    </Link>
                                                </li>
                                                <li className="l_c">
                                                    <Link
                                                        to={`/employer/${window.btoa(item.employerID)}${param}`}
                                                        target="_blank"
                                                        className="name_employer"
                                                    >
                                                        {item.employerName}
                                                    </Link>
                                                </li>
                                                <li className="region">
                                                    <Icon type="environment" style={{marginRight: 3}}/>
                                                    {item.region && item.region.name
                                                        ? item.region.name
                                                        : null}
                                                </li>
                                                <li className="salary">
                                                    <Icon type="dollar" style={{marginRight: 3}}/>
                                                    <span className="salary-label">
                                                        <b>
                                                            {convertFullSalary(item.minSalary, item.minSalaryUnit,
                                                                item.maxSalary, item.maxSalaryUnit)}
                                                        </b>
                                                    </span>
                                                </li>

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        );
                    })
                    : null}
                <Col span={24} style={{textAlign: "center"}}>
                    <Pagination
                        current={this.state.current}
                        pageSize={topJob.pageSize}
                        total={topJob.totalItems}
                        style={{margin: "25px 0px 10px"}}
                        onChange={this.changePage}
                    />
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state) => ({
    topJob: state.EventHotJobResults.data,
    param: state.DetailEvent.param
});

const mapDispatchToProps = (dispatch) => ({
    getEventHotJob: (pageIndex?: number, pageSize?: number) =>
        dispatch({type: REDUX_SAGA.EVENT.JOB.HOT, pageIndex, pageSize}),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopJob);
