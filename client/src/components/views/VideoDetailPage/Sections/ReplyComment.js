import React, { useEffect, useState } from 'react'
import SingleComment from './SingleComment';


function ReplyComment(props) {

    const [ChildCommentNumber, setChildCommentNumber] = useState(0)
    useEffect(() => {

        let commentNumber = 0;

        props.commentLists.map((comment) => {

            if (comment.responseTo === props.parentCommentId) {
                commentNumber ++
            }
        })

        setChildCommentNumber(commentNumber)
        
    }, [])

    const renderReplyComment = (parentCommentId) => {
        props.commentLists.map((comment, index) => (
            <React.Fragment>
                {
                    comment.responseTo === parentCommentId &&
                    <div>
                        <SingleComment refreshFunction={props.refreshFunction} comment={comment} postId={props.videoId} />
                        <ReplyComment parentCommentId={comment._id} commentLists={props.commentLists}  postId={props.videoId} />
                    </div>
                }
            </React.Fragment>
        ))
    }

    return (
        <div>
            {ChildCommentNumber > 0 &&
                <p style={{ fontSize: '14px', margin: 0, color: 'gray' }} onClick>
                    View 1 more comment(s)
                </p>
            }

            {renderReplyComment(props.parentCommentId)}

        </div>
    )
}

export default ReplyComment
