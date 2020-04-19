import React, { PureComponent } from 'react';
import './BottomPhone.scss';
import { Icon } from 'antd';
import { moveScroll } from '../../../../utils/moveScroll';
import { connect } from 'react-redux';
import { REDUX } from '../../../../const/actions';

class BottomPhone extends PureComponent {
    _toHead = () => {
        moveScroll(0, 0, true)
    }

    render() {
        let { show, disableBottomPhone } = this.props;
        return (
            <div className='bottom_phone show-only-phone' style={{ display: disableBottomPhone ? "none" : "visible" }}>
                <span className='link-to'>
                    <a href='/profile'>
                        <li><Icon type="user" /></li>
                        <li>Hồ sơ</li>
                    </a>
                </span>
                <span className='link-to'>
                    <a href='/'>
                        <li><Icon type="search" /></li>
                        <li>Tìm việc</li>
                    </a>
                </span>
                <span className='link-to'>
                    <a href='/'>
                        <li><Icon type="phone" /></li>
                        <li>Liên hệ</li>
                    </a>
                </span>
                <span className='link-to' onClick={this._toHead}>
                    <span>
                        <li><Icon type="up" /></li>
                        <li>Đầu trang</li>
                    </span>
                </span>
                <span className='link-to' onClick={() => { !show ? this.props.openSideBar() : this.props.closeSideBar() }}>
                    <span>
                        <li><Icon type="menu-unfold" /></li>
                        <li>Menu</li>
                    </span>
                </span>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    show: state.SideBarState.show,
})

const mapDispatchToProps = (dispatch) => ({
    openSideBar: () => dispatch({ type: REDUX.SIDE_BAR.OPEN_SIDE_BAR }),
    closeSideBar: () => dispatch({ type: REDUX.SIDE_BAR.CLOSE_SIDE_BAR }),
});

export default connect(mapStateToProps, mapDispatchToProps)(BottomPhone)

