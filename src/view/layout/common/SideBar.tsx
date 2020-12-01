import React, { Component } from 'react';
import './index.scss';
import { List, Avatar, Affix, Tooltip, Collapse } from 'antd';
import Search from 'antd/lib/input/Search';
import { _post } from '../../../services/base-api';
import { EMPLOYER } from './../../../services/api/public.api';
import { noInfoHeader } from '../../../services/auth';
import { PUBLIC_HOST } from '../../../environment/development';
import { Link } from 'react-router-dom';
import { ITopEmDetail } from '../../../models/employer-detail';
import { timeConverter } from '../../../utils/convertTime';
import { limitString } from '../../../utils/limitString';
import { Icon } from 'antd';

const { Panel } = Collapse;

interface IProps { }
interface IState { loading: boolean, data?: Array<ITopEmDetail>, chose?: number }

export default class LeftBar extends Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            chose: 0,
        }
    }

    onSearch = async (name?: string) => {
        name = name.trim();
        if (!name) {
            this.setState({ data: [] })
        } else {
            name.toLowerCase();
            await this.setState({ loading: true })
            await _post({ name }, EMPLOYER + '/priority/query', PUBLIC_HOST, noInfoHeader, { pageIndex: 0, pageSize: 10 })
                .then((res) => {
                    if (res) {
                        let data = res.data.items.filter(item => item.employerName.toLowerCase().includes(name));
                        this.setState({ data })
                    }
                }).finally(() => this.setState({ loading: false }))
        }
    }

    setChosen = (event?: number) => {
        let { chose, data } = this.state;
        console.log(event)
        switch (event) {
            case 38:
                if (chose >= 0) {
                    chose -= 1;
                }
                this.setState({ chose })
                break;
            case 40:
                if (data && data.length > 0 && chose < data.length - 1) {
                    chose += 1
                }
                this.setState({ chose })
                break;
            case 13:
                if (chose) {

                }
                break;
            default:
                break;
        }
    }

    componentWillUnmount() {
        window.removeEventListener("input", () => { console.log("out") });
        window.removeEventListener("scroll", () => { console.log("out") });
        window.removeEventListener("onKeyDown", () => { console.log("out") });
        window.removeEventListener("onPressEnter", () => { console.log("out") });
    }

    render() {
        let { data, loading, chose } = this.state;
        return (
            <div id='left-bar' className='hidden-mobile'>
                {/* <div className="box-block fixed">
                    <Search
                        onKeyDown={(event?: any) => this.setChosen(event.keyCode)}
                        placeholder="Tìm kiếm nhà tuyển dụng"
                        onChange={(event?: any) => this.onSearch(event.target.value)}
                        onPressEnter={() => window.location.assign(`/employer/${btoa(data[chose].employerID)}`)}
                    />
                    <List
                        style={{
                            height: 'auto',
                            overflowY: "auto",
                            backgroundColor: "white",
                            margin: '10px -10px',
                        }}
                        dataSource={data}
                        loading={loading}
                        renderItem={(item?: ITopEmDetail, i?: number) => (
                            <List.Item
                                key={item.employerID}
                                style={{
                                    backgroundColor: i === this.state.chose ? "whitesmoke" : "",
                                    padding: 10
                                }}
                            >
                                <Tooltip title={item.employerName} placement="right" style={{ zIndex: 2 }} >
                                    <List.Item.Meta
                                        avatar={
                                            <Link to={`/employer/${btoa(item.employerID)}`}>
                                                <Avatar src={item.employerLogoUrl} alt={item.employerName} />
                                            </Link>
                                        }
                                        title={<Link to={`/employer/${btoa(item.employerID)}`}>{limitString(item.employerName)}</Link>}
                                        description={timeConverter(item.createdDate)}
                                    />
                                </Tooltip>
                            </List.Item>
                        )}
                    />
                </div> */}
                <Affix offsetTop={10}>
                    <div className="box-block fixed">
                        <Collapse bordered={false} defaultActiveKey={['1']} style={{ margin: "0 -10px" }}>
                            <Panel header="Mục khác" key="1" style={{ borderColor: 'rgba(0,0,0,0)' }}>
                                <p>
                                    <Link to='/cong-viec-da-luu'>
                                        <Icon type={"save"} /> Công việc đã lưu
                                </Link>
                                </p>
                                <p>
                                    <Link to='/lich-su-ung-tuyen'>
                                        <Icon type={"tag"} /> Lịch sử ứng tuyển
                                 </Link>
                                </p>
                            </Panel>
                        </Collapse >
                    </div>
                </Affix>
            </div>
        );
    }
}