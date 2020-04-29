import React, { Component } from 'react';
import './ShortProfile.scss';
import { timeConverter } from '../../../../../utils/convertTime';
import { connect } from 'react-redux';
import { REDUX } from '../../../../../const/actions';
import { Avatar } from 'antd';
interface IProps {
    personalInfo?: any,
    setMapState?: any
}

class ShortProfile extends Component<IProps>  {
    componentDidMount() {
        let marker = { lat: this.props.personalInfo.lat, lng: this.props.personalInfo.lon}
        this.props.setMapState(marker, this.props.personalInfo.address)
    }
    render() {
        let {
            personalInfo
        } = this.props;

        return (
            <div className="wrapper">
                <div className='avatar'>
                    <Avatar
                        src={personalInfo.avatarUrl}
                        style={{
                            width: "100px",
                            height: "100px",
                            border: "solid #1890ff80 3px",
                            marginLeft: 10
                        }}
                    />
                    <ul style={{ marginLeft: 35 }}>
                        <li className='profile-info'>
                            <i className="fa fa-user " />
                            Họ và tên: <span>{personalInfo && (personalInfo.lastName + ' ' + personalInfo.firstName)}</span>
                        </li>
                        <li className='profile-info'>
                            <i className="fa fa-briefcase " />
                            Trạng thái: {personalInfo && personalInfo.lookingForJob === true ? 'Đang tìm việc' : 'Đã có công việc'}
                        </li>
                        <li className='profile-info'>
                            <i className="fa fa-calendar " />
                            Ngày sinh: {timeConverter(personalInfo && personalInfo.birthday, 1000)}
                        </li>
                        <li className='profile-info'>
                            <i className="fa fa-venus-mars " />
                            Giới tính: {personalInfo && personalInfo.gender === 'MALE' ? 'Nam' : 'Nữ'}
                        </li>
                    </ul>
                </div>
                <div className='short-profile'>
                    <ul>
                        <li>
                            <i className="fa fa-home " />
                            Địa chỉ: {personalInfo && personalInfo.address}
                        </li>
                        <li>
                            <i className="fa fa-envelope " />
                            Email: {personalInfo && personalInfo.email}
                        </li>
                        <li>
                            <i className="fa fa-phone " />
                            Điện thoại liên hệ:{personalInfo && personalInfo.phone}
                        </li>
                        <li>
                            <i className="fa fa-address-card " />
                            Số CMND:{personalInfo && personalInfo.identityCard}
                        </li>
                    </ul>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    personalInfo: state.PersonalInfo.personalInfo,
});
const mapDispatchToProps = (dispatch) => {
    return {
        setMapState: (marker, location) => dispatch({ type: REDUX.MAP.SET_MAP_STATE, marker: marker, location: location })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ShortProfile);