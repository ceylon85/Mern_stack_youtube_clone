import React, {useEffect, useState} from 'react';
import {Row, Col, List, Avatar} from 'antd';
import Axios from 'axios';
import SideVideo from "./Sections/SideVideo";

function VideoDetailPage(props) {

    const videoId = props.match.params.videoId
    const [Video,
        setVideo] = useState([])
        
    const videoVariable = {
        videoId: videoId
    }


    useEffect(() => {

        Axios
            .post('/api/video/getVideoDetail', videoVariable)
            .then(response => {
                if (response.data.success) {
                    setVideo(response.data.Video)
                } else {
                    alert('비디오 정보를 가져으는데 실패했습니다.');
                }
            })
    }, []);

    if (Video.writer) {
        return (
            <Row gutter={[16, 16]}>
                <Col lg={18} xs={24}>
                    <div
                        style={{
                        width: '100%',
                        padding: '3rem 4rem'
                    }}>
                        <video
                            style={{
                            width: '100%'
                        }}
                            src={`http://localhost:5000/${Video.filePath}`}
                            controls/>
                        <List.Item actions>
                            <List.Item.Meta
                                avatar={< Avatar style = {{ color: '#f56a00', backgroundColor: '#fde3cf' }}>SJ</Avatar>}
                                title={Video.writer.name}
                                description={Video.description} />
    
                        </List.Item>
                        {/* Comments */}
                    </div>
    
                </Col>
                <Col lg={6} xs={24}>

                    <SideVideo />

                </Col>
            </Row>
        )
    } else {
        return (
            <div>... Loading...</div>
        )
    }
}

export default VideoDetailPage
