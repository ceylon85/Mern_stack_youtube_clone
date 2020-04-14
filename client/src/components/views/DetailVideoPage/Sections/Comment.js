import React, {useState} from 'react'
import Axios from 'axios'
import {useSelector} from 'react-redux';

function Comment(props) {
    //useSelector 를 통해 state에서 user 정보를 가져온다
    const user = useSelector(state => state.user);

    const videoId = props.postId

    const [commentValue, setcommentValue] = useState("")

    const handleClick = (e) => {
        setcommentValue(e.currentTarget.value)
    }

    const onSubmit =(e)=>{
        e.preventDefault();//refresh 안되게 걸어놓는다

        const variables ={
            content: commentValue,
            //Redux hook 사용해서 가져와보기
            //state에 있는 user의 userData의 id 값을 가져온다.
            writer: user.userData._id,
            postId: videoId
        }

        Axios.post('/api/comment/saveComment',variables)
        .then(response => {
            if(response.data.success){
                console.log(response.data.result)
            }else{
                alert('comment를 저장하지 못했습니다')
            }
        })
    }


    return (
        <div>
            <br/>
            <p>
                Replies</p>
            <br/> {/* Comment Lists */}

            {/* Root Comment form */}
            <form style={{
                display: 'flex'
            }} onSubmit={onSubmit}>
                <textarea
                    style={{
                    width: '100%',
                    borderRadius: '5px'
                }}
                    onChange={handleClick}
                    value={commentValue}
                    placeholder="코멘트를 작성해주세요"/>
                <br/>
                <button
                    style={{
                    width: '20%',
                    height: '52px'
                }}
                    onClick={onSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default Comment
