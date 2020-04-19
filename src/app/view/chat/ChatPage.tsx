import React from 'react';
import { Icon } from 'antd';
import ChatBar from './chat-bar/ChatBar';
import ChatBoard from './chat-board/ChatBoard';
import firebase from './FireBase';
import './ChatPage.scss';
import { IRoomSelect } from './../../../models/chat-page';
import Layout from '../layout/Layout';
import { connect } from 'react-redux';
const myId = localStorage.getItem("userID");

interface IChatPageState {
    mobileOpen: boolean;
    list_chat_room: Array<any>;
    list_messages: Array<any>;
    messages: Array<any>;
    heightHeaderAndTextBox: number;
    lastHeight: number;
    roomSelect?: IRoomSelect;
    firstTime: boolean;
    checkpointMess: any;
    loadMore: boolean;
    is_loading: boolean;
    show_chat: boolean;
    isMobile: boolean;
    lastMessage?: any;
}

interface IChatPageProps extends StateProps, DispatchProps {
}

class ChatPage extends React.PureComponent<IChatPageProps, IChatPageState> {
    constructor(props) {
        super(props);
        this.state = {
            mobileOpen: false,
            list_chat_room: [],
            list_messages: [],
            messages: [],
            heightHeaderAndTextBox: 0,
            lastHeight: 0,
            roomSelect: {
                key: '',
                employer: null,
                candidate: null,
                doc: null,
                lastMessage: null
            },
            firstTime: true,
            checkpointMess: null,
            loadMore: false,
            is_loading: true,
            show_chat: false,
            isMobile: false,
        };
    }

    ref = firebase.firestore()
        .collection('chat_rooms')
        .where("candidate.id", "==", myId)
        .orderBy("lastMessage.createdDate", "desc");
    ref2: any = null;

    unsubscribe2: any = null;
    unsubscribe3: any = null;
    unsubscribe: any = null
    messUnseen: any = null;
    checkpointMess: any = null;

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot((querySnapshot) => this._onCollectionUpdate(querySnapshot));
        this.setState({ is_loading: false });
    };

    _onCheckOnlineEmployer = (querySnapShot) => {
        // console.log(querySnapShot)
    }

    _onCollectionUpdate = (querySnapshot) => {
        let list_chat_room = [];
        let { roomSelect, firstTime } = this.state;
        // Add employer, lastMessage and candidate
        querySnapshot.forEach((doc) => {
            let { employer, lastMessage, candidate } = doc.data();
            doc.ref.collection("visitStates")
                .doc("employer")
                .onSnapshot((doc2) => {
                    // stateEmployer && stateEmployer.set(doc.id, doc2.data().state);
                    // this.setState({ stateEmployer })
                });

            let isOnline = firebase.firestore()
                .collection('employers')
                .doc(employer.id)
                .onSnapshot(querySnapshot => this._onCheckOnlineEmployer(querySnapshot));

            list_chat_room.push({
                key: doc.id,
                doc,
                employer,
                candidate,
                lastMessage,
                isOnline
            });

            // this._setLastMessage(messages[0]);
            if (list_chat_room[0]) {
                roomSelect = list_chat_room[0];
            }
        })

        //  
        if (firstTime) {
            if (roomSelect && roomSelect.key) {
                // Get refenrence by roomSelect
                this.ref2 = firebase
                    .firestore()
                    .collection('chat_rooms')
                    .doc(roomSelect.key)
                    .collection("messages");

                // Get message
                this.unsubscribe2 = this.ref2
                    .orderBy("createdDate", "desc")
                    .limit(10)
                    .onSnapshot((querySnapshot) => { this._onCollectionMessage(querySnapshot) });

                // Message seen
                this.messUnseen = this.ref2
                    .where('ownerID', '==', roomSelect.employer.id)
                    .where('seen', '==', false)
                    .onSnapshot((querySnapshot) => {
                        let batch = firebase.firestore().batch();
                        querySnapshot.forEach(doc => {
                            batch.update(this.ref2.doc(doc.id), { seen: true });
                        })
                        batch.commit();
                    })
            }
        }

        this.setState({
            firstTime: false,
            list_chat_room,
            roomSelect,
        });

        this._Messages(list_chat_room[0]);
    };

    // Push message into chatboard
    _onCollectionMessage = (querySnapshot) => {
        let messages = [];
        querySnapshot.forEach((doc2) => {
            messages.unshift(doc2.data());
            this.checkpointMess = doc2;
        });

        this.setState({ messages });
    };

    // Chose room chat
    _choseChatRoom = (roomSelect) => {
        this.setState({ roomSelect });
        this._Messages(roomSelect);
        this._setSeen(roomSelect);
    };

    // Querry message in roomchat
    _Messages = (roomSelect) => {
        if (roomSelect && roomSelect.key) {

            // Querry to msgs in Chat room
            this.ref2 = firebase
                .firestore()
                .collection('chat_rooms')
                .doc(roomSelect.key)
                .collection("messages");

            // Get 35 Lastest Msg
            this.unsubscribe2 = this.ref2
                .orderBy("createdDate", "desc")
                .limit(35)
                .onSnapshot((querySnapshot) => { this._onCollectionMessage(querySnapshot) });
        }

    };

    // Get more message by Scroll
    _handleScroll = () => {
        this.unsubscribe3 = null;
        let { loadMore } = this.state;
        loadMore = true;

        if (loadMore === true) {
            this.unsubscribe3 = this.ref2
                .orderBy("createdDate", "desc")
                .limit(20)
                .startAfter(this.checkpointMess)
                .onSnapshot((querySnapshot) => { this._addMoreMessage(querySnapshot) })
        }
    };

    // Add message from scroll
    _addMoreMessage = (querySnapshot) => {
        let { messages } = this.state;
        querySnapshot.forEach((doc2) => {
            this.checkpointMess = doc2;
            messages.unshift(doc2.data());
            this.checkpointMess = doc2;
        });

        this.setState({ messages });
    };

    // Send message
    _sendMessage = (message, key) => {
        let newMessage = {
            createdDate: new Date(),
            message,
            ownerID: myId,
            seen: false,
            type: 'text'
        }

        this.ref2.add(newMessage);
        this._setLastMessage(newMessage, key);
    };

    // setSeen
    _setSeen = (roomSelect) => {
        let lastMessage = roomSelect.lastMessage;
        firebase
            .firestore()
            .collection('chat_rooms')
            .doc(roomSelect.key)
            .update({
                lastMessage: { ...lastMessage, seen: true }
            });
    };

    // Set last message
    _setLastMessage = (lastMessage, key) => {
        if (key) {
            // Set lastMessage for roomSelect
            firebase
                .firestore()
                .collection('chat_rooms')
                .doc(key)
                .update({
                    lastMessage: lastMessage
                });
        }
    };

    _handleShowChat = (show_chat) => {
        this.setState({ show_chat })
    };

    componentWillUnmount() {
        this.ref = null;
        this.ref2 = null;
        this.unsubscribe2 = null;
        this.unsubscribe3 = null;
        this.unsubscribe = null;
    }

    render() {
        let {
            roomSelect,
            list_chat_room,
            messages,
            is_loading,
            show_chat,
            lastMessage
        } = this.state;

        let { isMobile } = this.props;
        return (
            <Layout disableFooterData={true} disableBottomPhone={true}>
                <>
                    {is_loading ? (<div className='loading'>
                        <Icon type="loading-3-quarters" spin />
                    </div>) : (
                            <>
                                <div className='chat-page for-phone '>
                                    <div className='chat-page-content ' style={{ marginLeft: show_chat && isMobile ? '-100vw' : '0vw' }}>
                                        <div className='content-chat-page'>
                                            <ChatBar
                                                roomSelect={roomSelect}
                                                lastMessage={lastMessage}
                                                list_chat_room={list_chat_room}
                                                roomSelectID={roomSelect ? roomSelect.key : ''}
                                                _choseChatRoom={this._choseChatRoom}
                                                _handleShowChat={this._handleShowChat}
                                            />
                                            {/* Chat InterFace */}
                                            <ChatBoard
                                                roomSelect={roomSelect}
                                                messages={messages}
                                                isMobile={isMobile}
                                                _sendMessage={this._sendMessage}
                                                _handleScroll={this._handleScroll}
                                                _handleShowChat={this._handleShowChat}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                </>
            </Layout>
        );
    }
}

const mapStateToProps = ({ handleMobileState }) => ({
    isMobile: handleMobileState.isMobile
})

const mapDispatchToProps = dispatch => ({
})

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);