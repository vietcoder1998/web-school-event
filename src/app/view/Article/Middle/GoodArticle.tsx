import React, { PureComponent } from "react";
import { Row, Col, Divider, Skeleton, Carousel } from "antd";
import { _requestToServer } from "../../../../services/exec";
import { POST } from "../../../../const/method";
import { ANNOUNCEMENTS } from "../../../../services/api/public.api";
import { PUBLIC_HOST } from "../../../../environment/development";

import Title from "../Component/Title";
import Card3 from "../Component/Card3";
interface IProps {
    idType?: any;
}
interface IState {
    listArticleRender?: any;
    body?: any;
    loading?: boolean;
    pageIndex?: any;
    pageSize?: any;
}

class GoodArticle extends PureComponent<IProps, IState> {
    constructor(props) {
        super(props);
        this.state = {
            listArticleRender: [],
            pageIndex: 0,
            pageSize: 10,
            loading: true,
        };
    }
    componentDidMount() {
        this.getListArticle(0, 5);
    }

    async getListArticle(pageIndex, pageSize = 5) {
        let body = {
            adminID: null,
            hidden: null,
            createdDate: null,
            announcementTypeID: null,
        };
        this.props.idType === 'all' ? body.announcementTypeID = null : body.announcementTypeID = this.props.idType;
        let res = await _requestToServer(
            POST,
            body,
            ANNOUNCEMENTS.LIST + `?pageIndex=${pageIndex}&pageSize=${pageSize}`,
            PUBLIC_HOST,
            {
                pageIndex: pageIndex,
                pageSize: pageSize,
            },
            false
        );
        try {
            this.setState({
                listArticleRender: res.data.items,
                loading: false,
            });
        }
        catch (e) {
            console.log(e)
        }
    }
    render() {
        let { listArticleRender } = this.state;
        const props = {
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
        };
        if (this.state.loading) return <div>loading .....</div>;
        else {
            return (
                <div>
                    <Title title={"Nhiều người đọc"} />
                    {listArticleRender.map((item, index) => (
                        <div key={index} style={{ display: index === 0 ? "none" : "" }}>
                            <Card3
                                id={item.id}
                                title={item.title}
                                imageUrl={item.imageUrl}
                                summary={item.previewContent}
                                rating={item.averageRating}
                                date={item.createdDate}
                            />
                        </div>
                    ))}
                </div>

            );
        }
    }
}



export default GoodArticle;
