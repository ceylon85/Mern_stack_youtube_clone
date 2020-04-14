import React, {useState} from 'react';
import {Comment, Avatar, Button, Input} from 'antd';
import Axios from 'axios';
import {useSelector} from 'react-redux';

const {TextArea} = Input;

function SingleComment(props) {
    const user = useSelector(state => state.user);

    const [OpenReply,
        setOpenReply] = useState(false)

    const [CommentValue, setCommentValue] = useState("")

    const openReply = () => {
        setOpenReply(!OpenReply)
    }

    const onHandleChange = (e) =>{
        setCommentValue(e.currentTarget.value)
    }

    const onSubmit =(e)=>{
        e.preventDefault();//refresh 안되게 걸어놓는다

        const variables ={
            content: CommentValue,
            //Redux hook 사용해서 가져와보기
            //state에 있는 user의 userData의 id 값을 가져온다.
            writer: user.userData._id,
            postId: props.postId,
            responseTo: props.comment._id
        }

        Axios.post('/api/comment/saveComment',variables)
        .then(response => {
            if(response.data.success){
                console.log(response.data.result)
                setCommentValue("")
                setOpenReply(!OpenReply)
                props.refreshFunction(response.data.result)
            }else{
                alert('comment를 저장하지 못했습니다')
            }
        })
    }

    const actions = [ < span onClick = {openReply}
    key = "comment-basic-reply-to" > Reply to 
    </span>
    ]

    return (
        <div>
            <Comment 
            actions={actions} 
            author={props.comment.writer.name} 
            avatar={<Avatar src={props.comment.writer.image} alt="image" />}
            content={<p>{props.comment.content} </p>}/>
            
        {OpenReply &&
            <form 
            style={{ display: 'flex'}} 
            onSubmit={onSubmit} >
        <TextArea
            style={{
            width: '100%',
            borderRadius: '5px'
        }}
            onChange={onHandleChange}
            value={CommentValue}
            placeholder="코멘트를 작성해주세요"/>
        <br/>
        <Button
            style={{
            width: '20%',
            height: '52px'
        }}
            onClick={onSubmit}>Submit</Button>
    </form> 
            }
            
    </div>
    )
}

export default SingleComment