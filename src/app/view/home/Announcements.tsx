import React, { useState } from 'react';
import { Row, Col, Carousel, Card, Icon } from 'antd';
import { connect } from 'react-redux';
import { REDUX_SAGA } from '../../../const/actions';
import { IAppState } from '../../../redux/store/reducer';
import { IAnnouncement } from '../../../models/announcements';
import Meta from 'antd/lib/card/Meta';
import { limitString } from '../../../utils/limitString';
import { POST } from '../../../const/method';
import { _requestToServer } from '../../../services/exec';
import { ANNOUNCEMENTS } from '../../../services/api/public.api';
import { PUBLIC_HOST } from '../../../environment/development';
import LinkToolTip from '../layout/common/LinkToolTip';

interface IProps {
    inday_data?: any;
    regions: Array<any>,
    jobNames: Array<any>,
    history?: any,
    isMobile: boolean;
}

function Announcements(props?: IProps) {

    React.useEffect(() => { getListArticle(0, 3) }, []);
    const [announcements, setAnnouncements] = useState([]);

    function getListArticle(pageIndex, pageSize = 5) {
        let body = {
            adminID: null,
            hidden: null,
            createdDate: null,
            announcementTypeID: null,
        };

        _requestToServer(
            POST,
            body,
            ANNOUNCEMENTS.LIST + `?sortBy=a.viewNumber&sortType=desc&pageIndex=${pageIndex}&pageSize=${pageSize}`,
            PUBLIC_HOST,
            {
                pageIndex: pageIndex,
                pageSize: pageSize,
            },
            false
        ).then(res => {
            console.log(res);
            setAnnouncements(res.data.items)
        })
            .catch(e => {
                console.log(e)
            })
    }
    let { isMobile } = props;
    return (
        <div className='announcements'>
            <h5>BÀI VIẾT CHO BẠN</h5>
            {
                isMobile ?
                    (announcements.length > 0 ? <Carousel effect="fade" style={{ height: 500 }} autoplay>
                        {
                            announcements.map((item?: IAnnouncement, i?: number) => (
                                <div key={i} style={{ height: 400 }}>
                                    <a key={i} href={`/announcementDetail/${window.btoa(item.id)}`}>
                                        <Card
                                            hoverable
                                            cover={
                                                <div style={{ height: 300, overflow: "hidden" }}>
                                                    <img
                                                        width={'100%'}
                                                        style={{
                                                            minHeight: '100%',
                                                            backgroundSize: 'cover'
                                                        }}
                                                        alt={item.title}
                                                        src={item.imageUrl} />
                                                </div>
                                            }
                                            actions={
                                                [
                                                    <div>
                                                        <Icon type="star" key="edit" />
                                                        {item.averageRating}
                                                    </div>
                                                    ,
                                                    <div>
                                                        <Icon type="eye" key="edit" />
                                                        {item.viewNumber}
                                                    </div>
                                                    ,
                                                    <div>
                                                        <Icon type="message" key="msg" />
                                                        {item.totalComments}
                                                    </div>
                                                ]
                                            }
                                        >
                                            <Meta
                                                title={item.title}
                                                description={
                                                    <>
                                                        {limitString(item.previewContent, 30)}
                                                        Xem thêm &gt; &gt;
                                                    </>
                                                } />
                                        </Card>
                                    </a>
                                </div>

                            ))
                        }
                    </Carousel> : '') :
                    (announcements.length > 0 ?
                        <Row>
                            {
                                announcements.map((item?: IAnnouncement, i?: number) => (
                                    <a key={i} href={`/announcementDetail/${window.btoa(item.id)}`}>
                                        <Col key={i} span={8} style={{ padding: 10 }} >
                                            <Card
                                                hoverable
                                                cover={
                                                    <div style={{ height: 300, overflow: "hidden" }}>
                                                        <img width={'100%'} style={{ minHeight: '100%' }} alt="example" src={item.imageUrl} />
                                                    </div>
                                                }
                                                // actions={
                                                //     [
                                                //         <div>
                                                //             <Icon type="star" key="edit" />
                                                //             {item.averageRating}
                                                //         </div>,
                                                //         <div>
                                                //             <Icon type="eye" key="edit" />
                                                //             {item.viewNumber}
                                                //         </div>
                                                //         ,
                                                //         <div>
                                                //             <Icon type="message" key="msg" />
                                                //             {item.totalComments}
                                                //         </div>
                                                //     ]
                                                // }
                                            >
                                                <Meta description={
                                                    <div>
                                                        <div 
                                                        className="title_card" 
                                                             style={{ 
                                                            fontWeight: 600, 
                                                            color: "black", 
                                                            fontSize: "1.1em", 
                                                            marginBottom: "5px", 
                                                            textTransform: 'uppercase' 
                                                        }}> 
                                                        <LinkToolTip  name={limitString(item.title, 30)} title={item.title}/>
                                                        </div>
                                                        <div className="data_card" style={{ color: '#3a3a3a' }}>{limitString(item.previewContent, 50)} </div>
                                                        <div style={{ fontStyle: 'italic', fontSize: '0.9em', marginTop: 5, textDecoration: 'underline', color: 'rgb(99, 99, 99)' }}>Xem thêm&gt;&gt;</div>
                                                    </div>
                                                } />
                                            </Card>
                                        </Col>
                                    </a>

                                ))
                            }
                        </Row> : '')
            }
        </div>
    );
};

const mapStateToProps = (state?: IAppState) => ({
    jobNames: state.JobNames.items,
    announcements: state.Announcements.items,
    isMobile: state.MobileState.isMobile
})

const mapDispatchToProps = dispatch => ({
    getAnnouncements: (pageIndex?: number, pageSize?: number, body?: any) =>
        dispatch({ type: REDUX_SAGA.ANNOUNCEMENTS.GET_ANNOUNCEMENTS, pageIndex, pageSize, body })
})

export default connect(mapStateToProps, mapDispatchToProps)(Announcements);