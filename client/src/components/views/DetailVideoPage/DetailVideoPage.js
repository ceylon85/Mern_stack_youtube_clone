import React, {useEffect, useState} from 'react';
import {Row, Col, List, Avatar} from 'antd';
import Axios from 'axios';
import SideVideo from "./Sections/SideVideo";
import Subscribe from "./Sections/Subscribe";
import Comments from "./Sections/Comments";
import LikeDislikes from "./Sections/LikeDislikes";

function DetailVideoPage(props) {

    const videoId = props.match.params.videoId
    const [Video,
        setVideo] = useState([])
    const [CommentLists,
        setCommentLists] = useState([])
    const videoVariable = {
        videoId: videoId
    }

    useEffect(() => {

        Axios
            .post('/api/video/getVideoDetail', videoVariable)
            .then(response => {
                if (response.data.success) {
                    setVideo(response.data.video)
                } else {
                    alert('비디오 정보를 가져으는데 실패했습니다.');
                }
            })
        //모든 comments 정보를 받는다.
        Axios
            .post('/api/comment/getComments', videoVariable)
            .then(response => {
                if (response.data.success) {
                    setCommentLists(response.data.comments)
                } else {
                    alert('코멘트 정보 가져오기에 실패했습니다.')
                }
            })
    }, []);

    const updateComment = (newComment) => {
        setCommentLists(CommentLists.concat(newComment))
    }

    if (Video.writer) {
        //userTo와 userFrom 이 같으면  구독버튼이 안보이게!
        const subscribeButton = Video.writer._id !== localStorage.getItem('userId') && <Subscribe
            userTo={Video.writer._id}
            userFrom
            ={localStorage.getItem('userId')}/>

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
                        <List.Item
                            actions={[ < LikeDislikes video userId = {
                                localStorage.getItem('userId')
                            }
                            videoId = {
                                videoId
                            } />,
                            subscribeButton
                        ]}>
                            <List.Item.Meta
                                avatar={< Avatar src = {
                                Video.writer && Video.writer.image
                            } />}
                                title={Video.writer.name}
                                description={Video.description}/>

                        </List.Item>
                        {/* Comments */}
                        <Comments
                            CommentLists={CommentLists}
                            postId={Video._id}
                            refreshFunction={updateComment}/>
                    </div>

                </Col>
                <Col lg={6} xs={24}>

                    <SideVideo/>

                </Col>
            </Row>

        )
    } else {
        return (
            <div>Loading...</div>
        )
    }

}

export default DetailVideoPage
