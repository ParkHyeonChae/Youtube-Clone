import React, { useEffect, useState } from 'react'
import { Tooltip, Icon } from 'antd';
import Axios from 'axios';


function LikeDislikes(props) {

    const [Likes, setLikes] = useState(0)
    const [Dislikes, setDislikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    const [DislikeAction, setDislikeAction] = useState(null)

    let variable = { }

    if(props.video) {
        variable = { videoId: props.videoId, userId: props.userId } // 영상의 추천/비추천
    } else {
        variable = { commentId: props.commentId, userId: props.userId } // 댓글의 추천/비추천
    }

    useEffect(() => {
        Axios.post('/api/like/getLikes', variable)
            .then(response => {
                if(response.data.success) {

                    // 얼마나 많은 추천 받았는지
                    setLikes(response.data.likes.length)

                    // 내가 이미 그 추천 눌렀는지
                    response.data.likes.map(like => {
                        if(like.userId === props.userId) {
                            setLikeAction('liked')
                        }
                    })

                } else {
                    alert('Failed Get Likes...')
                }
            })

        Axios.post('/api/like/getDislikes', variable)
            .then(response => {
                if(response.data.success) {

                    // 얼마나 많은 비추천 받았는지
                    setDislikes(response.data.dislikes.length)

                    // 내가 이미 그 비추천 눌렀는지
                    response.data.dislikes.map(dislike => {
                        if(dislike.userId === props.userId) {
                            setDislikeAction('disliked')
                        }
                    })

                } else {
                    alert('Failed Get Dislikes...')
                }
            })
    }, [])

    const onLike = () => {

        if(LikeAction === null) { // like 버튼이 클릭이 안 되있을 때
            Axios.post('/api/like/upLike', variable)
                .then(response => {
                    if(response.data.success) {

                        setLikes(Likes + 1)
                        setLikeAction('liked')
                        
                        if(DislikeAction !== null) {
                            setDislikeAction(null)
                            setDislikes(Dislikes - 1)
                        }

                    } else {
                        alert('Failed Up Like...')
                    }
                })
        } else {
            Axios.post('/api/like/unLike', variable)
                .then(response => {
                    if(response.data.success) {

                        setLikes(Likes - 1)
                        setLikeAction(null)

                    } else {
                        alert('Failed Down Like...')
                    }
                })
        }

    }

    const onDislike = () => {

        if(DislikeAction !== null) { // dislike 버튼이 클릭이 안 되있을 때
            Axios.post('/api/like/unDisLike', variable)
                .then(response => {
                    if(response.data.success) {

                        setDislikes(Dislikes - 1)
                        setDislikeAction(null)

                    } else {
                        alert('Failed Dislike...')
                    }
                })
        } else {
            Axios.post('/api/like/upDislike', variable)
                .then(response => {
                    if(response.data.success) {

                        setDislikes(Dislikes + 1)
                        setDislikeAction('disliked')
                        
                        if(LikeAction !== null) {
                            setLikeAction(null)
                            setLikes(Likes - 1)
                        }

                    } else {
                        alert('Failed Up Like...')
                    }
                })
        }

    }

    return (
        <div>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon type="like"
                        theme={LikeAction === 'liked' ? 'filled' : 'outlined'}
                        onClick={onLike}
                    />
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor:'auto' }}> {Likes} </span>
            </span>

            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    <Icon type="dislike"
                        theme={DislikeAction === 'disliked' ? 'filled' : 'outlined'}
                        onClick={onDislike}
                    />
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor:'auto' }}> {Dislikes} </span>
            </span>
        </div>
    )
}

export default LikeDislikes
