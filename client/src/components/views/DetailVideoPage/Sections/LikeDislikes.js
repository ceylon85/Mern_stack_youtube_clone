/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, {useEffect, useState} from 'react'
import {Tooltip, Icon} from 'antd';
import Axios from 'axios';

function LikeDislikes(props ) {

    const [Likes, setLikes] = useState(0)
    const [Dislikes, setDislikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    const [DisLikeAction, setDisLikeAction] = useState(null)
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
                    setDisLikeAction('disliked')
                }
            })
        }else{
            alert('Dislike 정보를 가져오는데 실패했습니다.')
        }
    })
}, [])


const onLike=() =>{
    //Like이 클릭이 안 되어 있을 때
     if(LikeAction === null){

         Axios.post('/api/like/upLike', variable)
         .then(response => {
            if(response.data.success){
                //upLike 클릭시 likes가 1이 늘어난다
                setLikes(Likes + 1)
                //눌렀을시 클릭이 된 상태로(filled)
                setLikeAction('liked')

                //Dislike이 클릭되어 있을 시
                if(DisLikeAction !== null){
                    //DisLikes를 null로 바꾸고 -1한다.
                    setDisLikeAction(null)
                    setDislikes(Dislikes -1)
                }
            } else {
            alert('Like를 올리지 못했습니다.')
         }
        })
     }else{
         //Likes가 클릭이 되어 있다면
        Axios.post('/api/like/unLike', variable)
        .then(response => {
           if(response.data.success){
              //unLike 클릭시 likes 1을 낮춘다
              setLikes(Likes - 1)
              //상태는 null로
              setLikeAction(null)
               
           } else {
           alert('Like를 내리지 못했습니다.')
        }
       })
     }
}


const onDislike =() =>{
    //Like이 클릭이 안 되어 있을 때
    if(DisLikeAction === null){

        Axios.post('/api/like/upDislike', variable)
        .then(response => {
           if(response.data.success){
               //upDIsLike 클릭시 dislikes가 1이 늘어난다
               setDislikes(Dislikes + 1)
               //눌렀을시 클릭이 된 상태로(filled)
               setDisLikeAction('disliked')

               //Dislike이 클릭되어 있을 시
               if(LikeAction !== null){
                   //DisLikes를 null로 바꾸고 -1한다.
                   setLikeAction(null)
                   setLikes(Likes -1)
               }
           } else {
           alert('DisLike를 올리지 못했습니다.')
        }
       })
    }else{
        //DisLikes가 클릭이 되어 있다면
       Axios.post('/api/like/unDislike', variable)
       .then(response => {
          if(response.data.success){
             //unDisLike 클릭시 Dislikes 1을 낮춘다
             setDislikes(Dislikes - 1)
             //상태는 null로
             setDisLikeAction(null)
              
          } else {
          alert('DisLike를 내리지 못했습니다.')
       }
      })
    }
}


return (
    <React.Fragment>
        <span key="comment-basic-like">
            <Tooltip title="Like">
                <Icon type="like" theme={LikeAction === 'liked' ? 'filled' : 'outlined'} onClick={onLike}/>
            </Tooltip>
            <span
                style={{
                paddingLeft: '8px',
                cursor: 'auto'
            }}>
                {Likes}
            </span> &nbsp; 
        </span>
        <span key="comment-basic-dislike">
            <Tooltip title="Dislike">
                <Icon type="dislike" theme={DisLikeAction === 'disliked' ? 'filled' : 'outlined'} onClick={onDislike}/>
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
