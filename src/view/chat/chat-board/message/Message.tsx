import React from 'react';
import './Message.scss';
import { msgConvertTime } from '../../../../../utils/convertTimeMsg';
import { Tooltip } from 'antd';

interface IMsgState {
    show_option: boolean;
}

interface IMsgEntity {
    createdDate: {
        nanoseconds?: number;
        seconds?: number;
    };

    message?: string;
    ownerID: string;
    seen: boolean;
    type: string;
}

interface IMsgProps {
    thisMessage: IMsgEntity;
    name_of_p: string;
}

export default class Message extends React.PureComponent<IMsgProps, IMsgState>{
    state: IMsgState = {
        show_option: false,
    }

    render() {
        let { thisMessage, name_of_p } = this.props;
        let { show_option } = this.state;

        return (

            <li className='content-msg-inside' >
                <div className={name_of_p} >
                    <div className='time-info' style={{ display: show_option ? 'block' : 'none' }}>
                        <span>
                            {msgConvertTime(thisMessage.createdDate.seconds)}
                        </span>
                    </div>
                    <div className='msg-content'>
                        <Tooltip placement={name_of_p === 'sender' ? 'left' : 'right'} title={msgConvertTime(thisMessage.createdDate.seconds)}>
                            <label className={'msg '}>
                                {thisMessage.message}
                            </label>
                        </Tooltip>
                    </div>
                </div>
            </li >
        )
    }
}
