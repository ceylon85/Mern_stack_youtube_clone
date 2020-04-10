import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import {Card, Avatar, Typography, Row, Col} from 'antd';
import moment from 'moment';

const {Title} = Typography;
const {Meta} = Card;

function SubscriptionPage() {

    const [Videos,
        setVideos] = useState([])

    const subscriptionVariables = {
        userFrom: localStorage.getItem('userId')
    }
    useEffect(() => {
        //본인이 구독하는 모든 사람의 비디오를 가져오기에 로그인된 본인의 아이디가 필요)

        Axios
            .post('/api/video/getSubscriptionVideos', subscriptionVariables)
            .then(response => {
                if (response.data.success) {
                    setVideos(response.data.videos)
                } else {
                    alert('비디오 가져오기를 실패했습니다')
                }
            })
    }, [subscriptionVariables]) //뒤에가 비어있으면 한번만 돈다

    const renderCards = Videos.map((video, index) => {
        // duration을 받아올 때 모두 초로 되어있기에 따로 계산
        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor(video.duration - minutes * 60);

        return <Col key={index} lg={6} md={8} xs={24}>
            <div style={{
                position: 'relative'
            }}>
                {/* 영상에 해당하는 페이지를 가기 위해 링크  */}
                <a href={`/video/${video._id}`}>
                    {/* 썸네일 이미지 */}
                    <img
                        style={{
                        width: '100%'
                    }}
                        alt="thumbnail"
                        src={`http://localhost:5000/${video.thumbnail}`}/> {/* 비디오 duration */}
                    <div
                        className=" duration"
                        style={{
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        margin: '4px',
                        color: '#fff',
                        backgroundColor: 'rgba(17, 17, 17, 0.8)',
                        opacity: 0.8,
                        padding: '2px 4px',
                        borderRadius: '2px',
                        letterSpacing: '0.5px',
                        fontSize: '12px',
                        fontWeight: '500',
                        lineHeight: '12px'
                    }}>
                        <span>{minutes}
                            : {seconds}</span>
                    </div>
                </a>
            </div><br/>
            <Meta avatar={// 유저 이미지 
            <Avatar src={video.writer.image} />} 
            //영상 타이틀
                title={video.title}/> 
                {/* writer_name */}
            <span>
                {video.writer.name}
            </span><br/> {/* 비디오 views */}
            <span style={{
                marginLeft: '3rem'
            }}>
                {video.views}
            </span>
            views - {/* 업데이트 날짜 */}
            <span>
                {moment(video.createdAt).format(" MMM Do YY")}
            </span>
        </Col>

    })

    return (
        <div
            style={{
            width: '85%',
            margin: '3rem auto'
        }}>
            <Title level={2}>
                구독중인 비디오
            </Title>
            <hr/>

            <Row gutter={16}>
                {renderCards}
            </Row>
        </div>
    )
}

export default SubscriptionPage;