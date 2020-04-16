/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, {useEffect, useState} from 'react'
import {Tooltip, Icon} from 'antd';
import Axios from 'axios';

function LikeDislikes(props ) {

    const [Likes, setLikes] = useState(0)
    const [Dislikes, setDislikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    const [DislikeAction, setDislikeAction] = useState(null)
    let variable = {};

    if (props.video) {
        variable = {
            videoId: props.videoId,
            userId: props.userId
        }
    } else {
        variable = {
            commentId: props.commentId,
            userId: props.userId
        }
    }


useEffect(() => {
    Axios.post('/api/like/getLikes', variable)
    .then(response=>{
        if(response.data.success){
            // 얼마나 많은 좋아요를 받았느니
            setLikes(response.data.likes.length)

            // 내가 그 좋아요를 이미 눌렀는지
            response.data.likes.map(like => {
                if(like.userId === props.userId){
                    setLikeAction('liked')
                }
            })
        }else{
            alert('Like 정보를 가져오는데 실패했습니다.')
        }
    })

    Axios.post('/api/like/getDislikes', variable)
    .then(response=>{
        if(response.data.success){
            // 얼마나 많은 싫어요를 받았느니
            setDislikes(response.data.dislikes.length)

            // 내가 그 싫어요를 이미 눌렀는지
            response.data.dislikes.map(dislike => {
                if(dislike.userId === props.userId){
                    setDislikeAction('disliked')
                }
            })
        }else{
            alert('Dislike 정보를 가져오는데 실패했습니다.')
        }
    })
}, [])

return (
    <React.Fragment>
        <span key="comment-basic-like">
            <Tooltip title="Like">
                <Icon type="like" theme={LikeAction === 'liked' ? 'filled' : 'outlined'} onClick/>
            </Tooltip>
            <span
                style={{
                paddingLeft: '8px',
                cursor: 'auto'
            }}>
                {Likes}
            </span>
        </span>
        <span key="comment-basic-dislike">
            <Tooltip title="Dislike">
                <Icon type="dislike" theme={DislikeAction === 'disliked' ? 'filled' : 'outlined'} onClick/>
            </Tooltip>
            <span
                style={{
                paddingLeft: '8px',
                cursor: 'auto'
            }}>
                {Dislikes}
            </span>
        </span>
    </React.Fragment>
)
}

export default LikeDislikes
