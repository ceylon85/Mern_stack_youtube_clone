import React, {useState} from 'react'
import Axios from 'axios'
import {useSelector} from 'react-redux';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment'
import {Button, Input} from 'antd';

const TextArea = Input;

function Comments(props) {
    //useSelector 를 통해 state에서 user 정보를 가져온다
    const user = useSelector(state => state.user);

    const videoId = props.postId

    const [Comment,
        setComment] = useState("")

    const handleChange = (e) => {
        setComment(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault(); //refresh 안되게 걸어놓는다

        const variables = {
            content: Comment,
            //Redux hook 사용해서 가져와보기 state에 있는 user의 userData의 id 값을 가져온다.
            writer: user.userData._id,
            postId: videoId
        }

        Axios
            .post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    setComment("")
                    props.refreshFunction(response.data.result)

                } else {
                    alert('comment를 저장하지 못했습니다')
                }
            })
    }

    return (
        <div>
            <br/>
            <p> Replies</p>
            <hr/> 
            {/* Comment Lists */}
            {props.CommentLists && props.CommentLists.map((comment, index) => (
                //deps 추가
                (!comment.responseTo &&
                    <React.Fragment key={index}>
                        <SingleComment comment={comment} postId={videoId} refreshFunction={props.refreshFunction} />
                        <ReplyComment CommentLists={props.CommentLists} postId={props.postId} parentCommentId={comment._id} refreshFunction={props.refreshFunction} />
                    </React.Fragment>)))}

            {/* Root Comment form */}
            <form
                style={{
                display: 'flex'
            }}
                onSubmit={onSubmit}>

                <TextArea
                    style={{
                    width: '100%',
                    borderRadius: '5px'
                }}
                    onChange={handleChange}
                    value={Comment}
                    placeholder="코멘트를 작성해주세요"/>
                <br/>
                <Button
                    style={{
                    width: '20%',
                    height: '52px'
                }}
                    onClick={onSubmit}>Submit</Button>
            </form>
        </div>
    )
}

export default Comments
