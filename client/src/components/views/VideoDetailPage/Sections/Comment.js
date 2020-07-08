import React, { useState } from 'react'
import Axios from 'axios';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment'


function Comment(props) {

    const videoId = props.postId // 부모컴퍼넌트(VideoDetailPage)에서 넘겨받음
    const user = useSelector(state => state.user); // Redux안에 있는 State에서 가져온 user를 user변수에 넣음
    const [commentValue, setcommentValue] = useState("")

    const handleClick = (event) => {
        setcommentValue(event.currentTarget.value)
    }

    const onSubmit = (event) => {
        event.preventDefault(); // 새로고침 방지

        const variables = {
            content: commentValue,
            writer: user.userData._id, // 이 부분은 LocalStorage가 아닌 Redux에서 가져옴
            postId: videoId
        }

        Axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if(response.data.success) {
                    console.log(response.data.result)
                    setcommentValue("") // submit 후 textarea 비우기
                    props.refreshFunction(response.data.result)
                } else {
                    alert('Failed Comment Save...')
                }
            })

    }

    return (
        <div>
            <br />
            <p>Replies</p>
            <hr />

            {/* Comment Lists */}

            {props.commentLists && props.commentLists.map((comment, index) => (
                (!comment.responseTo && 
                    // 답글은 responseTo 가 없는것만 출력
                    <React.Fragment>
                        <SingleComment refreshFunction={props.refreshFunction} comment={comment} postId={videoId}/>
                        <ReplyComment parentCommentId={comment._id} commentLists={props.commentLists} postId={videoId}/>
                    </React.Fragment>
                    )
            ))}

            {/* Root Comment Form */}

            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <textarea
                    style={{ width: '100%', borderRadius:' 5px' }}
                    onChange={handleClick}
                    value={commentValue}
                    placeholder="Please Write Comments..."
                />
                <br />

                <button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</button>
            </form>

        </div>
    )
}

export default Comment