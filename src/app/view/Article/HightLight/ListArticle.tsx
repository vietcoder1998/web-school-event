import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { Row, Col, Divider, Skeleton } from 'antd';
import Card from './Card';
import FirstCard from './FirstCard'
import { REDUX_SAGA } from '../../../../const/actions';
import { _requestToServer } from '../../../../services/exec';
import { POST } from '../../../../const/method';
import { ANNOUNCEMENTS } from '../../../../services/api/public.api';
import { PUBLIC_HOST } from '../../../../environment/development';

interface IProps {
    type?: string,
    getListArticle?: Function,
    listArticle?: Array<any>,

}
interface IState {
    listArticleRender?: any,
    body?: any,
    loading?: boolean
    pageIndex?: any,
    pageSize?: any,
}

class HightLight extends PureComponent<IProps, IState> {
    constructor(props) {
        super(props)
        this.state = {
            listArticleRender: [],
            body: {
                adminID: null,
                hidden: null,
                createdDate: null,
                announcementTypeID: null
            },
            loading: true,
            pageIndex: 0,
            pageSize: 10,
        };
    }

    componentDidMount() {
        let { type } = this.props;
        this.getListArticle(type)
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.type === this.props.type) return 0;
        else {
            let { type } = nextProps;
            let { body, listArticleRender } = this.state;
            console.log(type)
            type === 'ALL' ? body.announcementTypeID = null : body.announcementTypeID = type;
            this.setState({
                listArticleRender,
                body
            });
            this.getListArticle(type)
        }
    }
    async getListArticle(type) {
        let { body, listArticleRender } = this.state;
        
        let res = await _requestToServer(
            POST,
            body,
            ANNOUNCEMENTS.LIST + `?pageIndex=${this.state.pageIndex}&pageSize=${this.state.pageSize}`,
            PUBLIC_HOST, {
            pageIndex: this.state.pageIndex,
            pageSize: this.state.pageSize
        }, false)
        try {
            listArticleRender = listArticleRender.concat(res.data.items);
            this.setState({
                body,
                listArticleRender,
                loading: false
            })
        }
        catch (e) {
            console.log(e)
        }
    }
    getMoreArticle = () => {
        let { pageIndex, pageSize, body } = this.state;
        pageIndex++;
        this.props.getListArticle(pageIndex, pageSize, body);
        this.setState({
            pageIndex
        })
    }
    render() {

        if (this.state.loading) {
            return (
                <Skeleton active />
            )
        }
        else {
            return (
                <div>
                    <Row>
                        <Col sm={0} md={1} lg={3} xl={3} xxl={4}></Col>
                        <Col sm={24} md={22} lg={18} xl={18} xxl={16}>
                            <div>
                                <Row>
                                    <Col sm={24} md={24} lg={24} xl={14} xxl={14}>
                                        <FirstCard item={this.state.listArticleRender[0]} />
                                    </Col>
                                    <Col sm={24} md={24} lg={24} xl={10} xxl={10}>
                                        <Divider children='Bài viết hay' orientation="left" />
                                        <div>
                                            <Card item={this.state.listArticleRender[1]} />
                                            <Card item={this.state.listArticleRender[2]} />
                                            <Card item={this.state.listArticleRender[3]} />
                                            <Card item={this.state.listArticleRender[4]} />
                                        </div>

                                    </Col>
                                    <Col sm={15} md={15} lg={15} xl={15} xxl={15}>
                                        <Divider orientation="left" children="Danh sách" />
                                        {this.state.listArticleRender && (this.state.listArticleRender.length > 5) && this.state.listArticleRender.map((item, index) => (
                                            <div>
                                                <Card item={item} key={index} />
                                            </div>
                                        ))}
                                        <a onClick={this.getMoreArticle}>
                                            Xem thêm...
                                        </a>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col sm={0} md={1} lg={3} xl={3} xxl={4}></Col>
                    </Row>
                </div>
            )
        }

    }
}

const mapStateToProps = (state) => ({
    listArticle: state.AnnounList.listAnnoun,
});

const mapDispatchToProps = (dispatch) => ({
    getListArticle: (pageIndex?: number, pageSize?: number, body?: any) =>
        dispatch({ type: REDUX_SAGA.ANNOUNCEMENTS.GET_LIST, pageIndex, pageSize, body }),
});

export default connect(mapStateToProps, mapDispatchToProps)(HightLight)