import React from 'react';
import './ChatBoard.scss';
import { Input, Icon, Popover, Avatar } from 'antd';
import { limitString } from '../../../../utils/limitString';
// import { msgConvertTime } from '../../../components/utils/convertTimeMsg';
import Message from './message/Message';
import { IRoomSelect } from '../../../../models/chat-page';
import { IptLetter } from '../../layout/common/Common';
import { Picker } from 'emoji-mart';

const { TextArea } = Input;
export const myId = localStorage.getItem("userID");

interface IChatBoardProps {
    messages: any;
    roomSelect: IRoomSelect;
    isMobile: boolean;
    _handleScroll: Function;
    _handleShowChat: Function;
    _sendMessage: Function;
}

interface IChatBoardState {
    user: {
        id: string;
        avatarUrl: string;
        name: string;
    };

    load_more: '';
    roomSelect: IRoomSelect;
    messages: any;
    msg: string;
    height: 0;
    is_loading: boolean;
    message: string;
    is_load_history: boolean;
    send_confirm: boolean;
    loading_msg: boolean;
}

const MessageRender = (props) => {
    return <Message {...props} />
}


class ChatBoard extends React.Component<IChatBoardProps, IChatBoardState>{
    constructor(props) {
        super(props);
        this.state = {
            user: {
                id: '',
                avatarUrl: '',
                name: ""
            },

            load_more: '',
            roomSelect: {
                key: '',
                candidate: null,
                employer: null,
                doc: null,
                lastMessage: null
            },
            messages: [],
            msg: '',
            height: 0,
            is_loading: false,
            message: "",
            is_load_history: false,
            send_confirm: false,
            loading_msg: true,
        };
    }

    _isMounted = false;

    componentDidMount() {
        this.setState({ is_loading: false });
        this._isMounted = true;
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.roomSelect.key !== prevState.roomSelect.key) {
            return {
                messages: nextProps.messages,
                roomSelect: nextProps.roomSelect,
                loading_msg: true
            }
        }

        return null;
    }

    _sendMessage = (event) => {
        event.preventDefault();
        let { message } = this.state;
        let { roomSelect } = this.state;
        if (roomSelect && roomSelect.key && roomSelect.key !== "") {
            if (message.trim() !== "" && message !== null) {
                document.querySelector("div#m-c").scrollTop = 1000;
                this.props._sendMessage(message, roomSelect.key);
                this.setState({ message: '' });
            }
        }
    }

    _choseIcon = (event) => {
        let { message } = this.state;
        message = message + event.icon;
        this.setState({ message });
    }

    _handleMsg = (event) => {
        this.setState({ message: event.target.value });
    }

    _handleScroll = (event) => {
        this.setState({ loading_msg: false });
        let element = event.target;
        if (element.scrollTop === 0) {
            this.setState({ is_load_history: true });
            this.props._handleScroll();
            setTimeout(() => {
                this.setState({ is_load_history: false });
                element.scrollTop = 700;
            }, 2000);

        }
    }

    _choseEmoij = (event) => {
        let { message } = this.state;
        this.setState({ message: message += event.native });
    }

    componentDidUpdate() {
        let { loading_msg } = this.state;
        if (loading_msg) {
            document.querySelector("div#m-c").scrollTop = 1000;
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
        document.querySelector("div#m-c").removeEventListener("scroll", () => { });
    }

    render() {
        let { message, is_loading, is_load_history, } = this.state;
        let { messages, roomSelect, isMobile } = this.props;
        let thisMessage = null;
        let listAllMessage = [];
        let readonly = roomSelect.key === "" || !roomSelect.key

        if (messages) {
            for (let i = 0; i < messages.length; i++) {
                let name_of_p = 'sender';

                if (messages[i]) {
                    thisMessage = messages[i];
                }

                if (messages[i].ownerID !== myId) {
                    name_of_p = 'receiver';
                }

                listAllMessage.push(
                    <MessageRender
                        name_of_p={name_of_p}
                        key={i}
                        thisMessage={thisMessage}
                    />)
            }
        }

        return (
            <div className='chat-board test'>
                <header>
                    <div className='header-content'>
                        <span className='label-chat-board' style={{ display: isMobile ? "block" : "none" }} >
                            <Icon type='arrow-left' onClick={() => { this.props._handleShowChat(false) }} />
                        </span>
                        <div style={{ padding: "5px" }}>
                            <Avatar
                                src={roomSelect && roomSelect.employer ? roomSelect.employer.logoUrl : ''}
                                icon="user"
                                style={{ width: "40px", height: "40px" }}
                                alt='' ></Avatar>
                        </div>
                        <IptLetter value={roomSelect && roomSelect.employer ? limitString(roomSelect.employer.name.toLowerCase(), 40) : ""} />
                    </div>
                </header>

                <div className='msg-input' >
                    {!is_loading ? (<div className='msg-properties b_t' id='m-c' onScroll={this._handleScroll} >
                        {/* list Msg */}
                        <div className='load-history-chat' style={{ display: is_load_history ? 'block' : "none" }} >
                            <span>
                                <Icon type="loading-3-quarters" spin />
                            </span>
                        </div>
                        <div className='list-msg' >
                            {listAllMessage}
                        </div>
                    </div>) : (<div className='loading'><Icon type="loading-3-quarters" spin /></div>)}

                    {/* Input Msg */}
                    <div className='input-msg test' id='input-typing'>
                        <div className='more-state'>
                            <Popover
                                placement="topLeft"
                                title={"Chọn biểu cảm"}
                                content={<Picker set='emojione' onClick={this._choseEmoij} />}
                                trigger="click"
                            >
                                <Icon type="plus-circle" />
                            </Popover>
                        </div>
                        <div className='input-content'>
                            <TextArea
                                id="send-msg-box"
                                onChange={this._handleMsg}
                                onPressEnter={this._sendMessage}
                                value={message}
                                placeholder='Nhập tin nhắn ...'
                                autosize={{ minRows: 2, maxRows: 6 }}
                                readOnly={readonly}
                            />
                        </div>
                        <div className='send-button' onClick={message => this._sendMessage(message)}>
                            <i className="fa fa-paper-plane" aria-hidden="true"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChatBoard;