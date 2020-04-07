import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import {Card, Avatar, Typography, Row, Col} from 'antd';
import moment from 'moment';

const {Title} = Typography;
const {Meta} = Card;

function LandingPage() {

    const [Videos,
        setVideos] = useState([])

    useEffect(() => {
        Axios
            .get('/api/video/getVideos')
            .then(response => {
                if (response.data.success) {
                    setVideos(response.data.videos)
                } else {
                    alert('비디오 가져오기를 실패했습니다')
                }
            })
    }, []) //뒤에가 비어있으면 한번만 돈다

    const renderCards = Videos.map((video, index) => {

        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor(video.duration - minutes * 60);

        return <Col lg={6} md={8} xs={24}>
            <div style={{
                position: 'relative'
            }}>
                <a href={`/video/${video._id}`}>

                    <img
                        style={{
                        width: '100%'
                    }}
                        alt="thumbnail"
                        src={`http://localhost:5000/${video.thumbnail}`}/>
                    <div
                        className="duration">
                        <span>{minutes}
                            : {seconds}</span>
                    </div>
                </a>
            </div><br/>
            <Meta
                avatar={
                < Avatar src = {
                video.writer.image
            } />}
                title={video.title}/>
            <span>{video.writer.name}
            </span><br/>
            <span style={{
                marginLeft: '3rem'
            }}>
                {video.views}</span>
            -
            <span>
                {moment(video.createdAt).format("MMM Do YY")}
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
                Recommended
            </Title>
            <hr/>

            <Row gutter={16}>
                {renderCards}
            </Row>
        </div>
    )
}

export default LandingPage;