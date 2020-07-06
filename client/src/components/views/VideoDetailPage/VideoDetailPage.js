import React, { useEffect, useState } from 'react'
import { Row, Col, List, Avatar } from 'antd'
import Axios from 'axios';
import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/Subscribe';
import Comment from './Sections/Comment';


function VideoDetailPage(props) {

    const videoId = props.match.params.videoId // url의 videoId 가져오기
    const variable = { videoId: videoId }

    const [VideoDetail, setVideoDetail] = useState([])
    const [Comments, setComments] = useState([])

    useEffect(() => {
        
        Axios.post('/api/video/getVideoDetail', variable)
            .then(response => {
                if(response.data.success) {
                    setVideoDetail(response.data.videoDetail)
                } else {
                    alert('Get Video Data Failed...')
                }
            })

        Axios.post('/api/comment/getComments', variable) // 모든 Comments Data
            .then(response => {
                if(response.data.success) {
                    setComments(response.data.comments)
                } else {
                    alert('Failed Comments Data...')
                }
            })

        
    }, [])

    const refreshFunction = (newComment) => {
        setComments(Comments.concat(newComment)) // props로 뿌려준 하위컴포넌트에서 comment를 계속 받아와서 state에 담음
    }

    if(VideoDetail.writer) {
        
        const subscribeButton = VideoDetail.writer._id !== localStorage.getItem('userId') && <Subscribe userTo={VideoDetail.writer._id} userFrom={localStorage.getItem('userId')} />

        return (
            <Row gutter={[16, 16]}>
                <Col lg={18} xs={24}>
    
                <div style={{ width: '100%', padding: '3rem 4rem' }}>
                    <video style={{ width: '100%' }} src={`http://localhost:5000/${VideoDetail.filePath}`} controls />
    
                    <List.Item
                        actions={[ subscribeButton ]}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={VideoDetail.writer.image} />}
                            title={VideoDetail.writer.name}
                            description={VideoDetail.description}
                        />
    
                    </List.Item>
    
                    {/* Comments */}
                    <Comment refreshFunction={refreshFunction} commentLists={Comments} postId={videoId}/>
    
                </div>
                
                </Col>
                <Col lg={6} xs={24}>
                    <SideVideo />
                </Col>
            </Row>
        )
    } else {
        return (
            <div>...Loading</div>
        )
    }

}

export default VideoDetailPage
