import React, { PureComponent } from 'react';
import './ChatSearch.scss';
import { Input, Icon, Avatar, List, Skeleton } from 'antd';
// import { limitString } from '../../../../utils/limitString';
import { IRoomSelect } from '../../../../models/chat-page';

interface IChatSeachProps {
    list_chat_room: IRoomSelect[];
    _choseChatRoom: Function;
}

interface IChatSeachState {
    textSearch?: string;
    list_chat_invalid?: IListChatItem[];
    number_of_result: number;
    is_searching: boolean;
    list_chat_filter: IListChatItem[];
    initLoading: boolean;
}

interface IListChatItem {
    key?: string;
    avatar: string;
    name: string;
    employer: any;
    candidate: any;
    isLoading?: boolean;
}

class ChatSeach extends PureComponent<IChatSeachProps, IChatSeachState> {
    state: IChatSeachState = {
        textSearch: '',
        list_chat_invalid: [],
        number_of_result: 0,
        is_searching: false,
        list_chat_filter: [],
        initLoading: true,
    }


    static getDerivedStateFromProps(props, state) {
        if (props.list_chat_room !== state.list_chat_room) {
            let list_chat_filter = props.list_chat_room
                && props.list_chat_room.length > 0
                && props.list_chat_room.map(item => ({
                    key: item.key,
                    candidate: item.candidate,
                    employer: item.employer,
                    avatar: item.employer.logoUrl,
                    isLoading: false
                }));

            return {
                list_chat_filter,
            }
        }
        return null
    }

    _handleFindInvalid = event => {
        let textSearch = event.target.value;
        let keyWord = textSearch.toLowerCase();
        let { list_chat_filter } = this.state;
        let list_chat_invalid = [];

        if (list_chat_filter.length > 0) {
            list_chat_filter.forEach(item => {
                let name_employer = item.employer.name.toLowerCase();
                let invalid = name_employer.indexOf(keyWord);
                item.isLoading = true;
                if (!invalid) {
                    list_chat_invalid.push(item);
                }
            });
        }

        this.setState({ textSearch, list_chat_invalid })

        setTimeout(() => {
            this._completeLoading()
        }, 1000);
    }

    _completeLoading = () => {
        let { list_chat_invalid } = this.state;
        list_chat_invalid.forEach(item => item.isLoading = false);
        this.setState({ list_chat_invalid });
    }

    _handleClearTextSearch() {
        this.setState({ textSearch: "" });
    }

    _handleChoseChatRoom(key) {
        this._handleClearTextSearch();
        this.props._choseChatRoom(key);
    }

    render() {
        let { textSearch, list_chat_invalid } = this.state;

        return (
            <div className='chat-search'>
                <Input
                    prefix={<Icon type='search' />}
                    suffix={
                        <Icon
                            type='close'
                            style={{
                                display: textSearch && textSearch.length > 0 ? 'block' : 'none'
                            }}
                            onClick={() => {
                                this._handleClearTextSearch();
                            }}
                        />
                    }
                    placeholder="Tìm kiếm trong liên hệ"
                    value={textSearch}
                    onClick={() => this.setState({ is_searching: true })}
                    onChange={this._handleFindInvalid}
                />

                <div className='list-chat-invalid' style={{ display: textSearch && textSearch.length > 0 ? 'block' : 'none' }}>
                    <p className='list-chat-filter'>
                        {list_chat_invalid && list_chat_invalid.length > 0 ? (
                            <label>Người liên hệ <Icon type="smile" theme="twoTone" /></label>
                        ) : (<label>Không tìm thấy liên hệ phù hợp<Icon type="meh" theme="twoTone" /> </label>)}
                    </p>
                    <List
                        className="demo-loadmore-list"
                        itemLayout="horizontal"
                        dataSource={list_chat_invalid}
                        renderItem={item => (
                            <List.Item
                                onClick={() => {
                                    this._handleChoseChatRoom(item.key);
                                }}
                            >
                                <Skeleton
                                    avatar title={false}
                                    loading={item.isLoading}
                                    paragraph={{ rows: 1 }}
                                    active
                                >
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar src={item.employer.logoUrl} />
                                        }
                                        title={<label>{item.employer.name}</label>}
                                        description=""
                                    />
                                </Skeleton>
                            </List.Item>
                        )}
                    />
                </div>
            </div >
        );
    }
}

export default ChatSeach;