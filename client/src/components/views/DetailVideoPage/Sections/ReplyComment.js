import React, {useEffect, useState} from 'react'
import SingleComment from './SingleComment';

function ReplyComment(props) {
    const [ChildCommentNumber, setChildCommentNumber] = useState()

    useEffect(() => {
         let commentNumber = 0;

         props.CommentLists.map((comment)=> {

            if(comment.responseTo === props.parentCommentId){
                commentNumber ++
            }
         })
         setChildCommentNumber(commentNumber)
    }, [])


    const renderReplyComment = (parentCommentId) => {
        props
            .CommentLists
            .map((comment, index) => (
                <React.Fragment>
                    {comment.responseTo === parentCommentId && <div>

                        <SingleComment
                            comment={comment}
                            postId={props.videoId}
                            refreshFunction={props.refreshFunction}/>
                        <ReplyComment commentLists={props.CommentLists}postId={props.videoId} parentCommentId={comment._id}/>
                    </div>
}
                </React.Fragment>

            ))
    }

    return (
        <div>
            {ChildCommentNumber > 0 &&
            <p
                style={{
                fontSize: '14px',
                margin: 0,
                color: 'gray'
            }}
                onClick>
                View {ChildCommentNumber} more comment(s)

            </p>
}
            {renderReplyComment(props.parentCommentId)}
        </div>

    )
}

export default ReplyComment
