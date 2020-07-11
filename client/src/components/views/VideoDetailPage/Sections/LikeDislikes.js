import React, { useEffect } from 'react'
import { Tooltip, Icon } from 'antd';
import Axios from 'axios';


function LikeDislikes(props) {

    let variable = { }

    if(props.video) {
        variable = { videoId: props.videoId, userId: props.userId }
    } else {
        variable = { commentId: props.commentId, userId: props.userId }
    }

    useEffect(() => {
        Axios.post('/api/like/getLikes', variable)
            .then(response => {
                if(response.data.success) {

                } else {
                    alert('Failed Get Likes...')
                }
            })
    }, [])

    return (
        <div>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon type="like"
                        thema="filled"
                        onClick
                    />
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor:'auto' }}> 1 </span>
            </span>

            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    <Icon type="dislike"
                        thema="outlined"
                        onClick
                    />
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor:'auto' }}> 1 </span>
            </span>
        </div>
    )
}

export default LikeDislikes
