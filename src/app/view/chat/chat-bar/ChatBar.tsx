import React, { PureComponent } from 'react';
import './ChatBar.scss';
import { limitString } from '../../../../utils/limitString';
import { timeConverter } from '../../../../utils/convertTime';
import ChatSearch from './chat-search/ChatSearch';
import { Icon, Avatar, Badge } from 'antd';
import { myId } from '../chat-board/ChatBoard';
import { IRoomSelect } from '../../../../models/chat-page';


interface IChatBarProps {
    roomSelect?: IRoomSelect;
    roomSelectID?: string;
    list_chat_room: IRoomSelect[];
    lastMessage: any;
    _choseChatRoom: Function;
    _handleShowChat: Function;
}

interface IChatBarState {
    textSearch: string;
    list_chat_invalid?: Array<any>;
    is_searching?: boolean;
    number_of_result?: number;
    lastMessage: any;
}

class ChatBar extends PureComponent<IChatBarProps, IChatBarState> {
    state: IChatBarState = {
        textSearch: '',
        list_chat_invalid: [],
        number_of_result: 0,
        is_searching: false,
        lastMessage: null,
    };

    static getDerivedStateFromProps(props, state) {
        if (props.roomSelect !== state.roomSelect) {
            return {
                list_chat_invalid: props.list_chat_room,
                isSearch: false,
                roomSelect: props.roomSelect,
            }
        }

        if (props.list_chat_room) {
            return {
                list_chat_room: props.list_chat_room
            }
        }

        return null
    }

    _choseChatRoom = (key) => {
        let { list_chat_room } = this.props;
        let roomSelect;
        list_chat_room && list_chat_room.forEach(item => {
            if (item.key === key) {
                roomSelect = item
            }
        });

        this.props._choseChatRoom(roomSelect);
    }

    render() {
        let { list_chat_room, roomSelectID } = this.props;
        let all_chat_show = list_chat_room;

        return (
            <div className='chat-bar test'>
                <header>
                    <h4>
                        <label>Chat</label>
                    </h4>
                </header>
                <div className='chat-bar-all-room'>
                    {/* Chat Search */}
                    <div className='search-chat-bar'>
                        <ChatSearch
                            list_chat_room={list_chat_room}
                            _choseChatRoom={this._choseChatRoom}
                        />
                    </div>

                    {/* All Chat */}
                    <div className='content-chat-bar'>
                        <div className='list-chat-room'>
                            {all_chat_show && all_chat_show.length > 0 ? (
                                <ul>
                                    {all_chat_show.map((item, index) => {
                                        let ownerID = item.lastMessage.ownerID;
                                        let candidateID = item.candidate.id;
                                        let name = item.employer.name;
                                        let sender = ownerID === candidateID ? "Bạn: " : "";
                                        let content = limitString(item.lastMessage.message ? item.lastMessage.message : "Hãy gửi lời chào tới NTD", 40);
                                        let time = timeConverter(item.lastMessage.createdDate.seconds);

                                        return (
                                            <li key={index} id={item.key} onClick={() => { this.props._choseChatRoom(item) }}>
                                                <div
                                                    className='item-chat-user wteam-container'
                                                    style={{ backgroundColor: roomSelectID === item.key ? 'whitesmoke' : null }}
                                                    onClick={() => { this.props._handleShowChat(true) }}
                                                >
                                                    <div className='img-content '>
                                                        <Badge color="green" dot={true} style={{ backgroundColor: "greenyellow" }} >
                                                            <Avatar
                                                                src={item.employer.logoUrl}
                                                                style={{
                                                                    width: "40px",
                                                                    height: "40px",
                                                                    margin: "5px"
                                                                }}
                                                                icon="user" />
                                                        </Badge>
                                                    </div>
                                                    <ul className='msg-content '>
                                                        <span className='check-seen' style={{ display: item.lastMessage && !item.lastMessage.seen && item.lastMessage.ownerID !== myId ? "block" : "none" }}>
                                                        </span>
                                                        <li className='msg-name-receiver'>
                                                            <p>{limitString(name.toLowerCase(), 25)}</p>
                                                        </li>
                                                        <li className='msg-msg-receiver'>
                                                            <label style={{ paddingRight: ownerID === candidateID ? '5px' : '0px' }}>{sender}</label>
                                                            <label> {content ? content + '.' : 'Hãy gửi lời chào'}</label>
                                                            <span></span>
                                                            <span style={{ fontSize: " 0.5rem" }}>
                                                                {time}
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            ) : <div className='none-data-chat'>
                                    <label className='text-icon'>
                                        Không có liên hệ nào gần đây
                                    </label>
                                    <Icon type="contacts" />
                                </div>}

                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default ChatBar;