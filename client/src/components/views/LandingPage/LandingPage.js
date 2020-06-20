import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { Card, Icon, Avatar, Col, Typography, Row } from 'antd';
import Axios from 'axios';
const { Title } = Typography
const { Meta } = Card;
import moment from 'moment';

function LandingPage() {

    const [Video, setVideo] = useState([])

    useEffect(() => {

        Axios.get('/api/video/getVideos')
            .then(response => {
                if(response.data.success) {
                    console.log(response.data)
                    setVideo(response.data.videos)
                } else {
                    alert('Get Video Failed...')
                }
            })
        
    }, [])


    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={2} > Recommended </Title>
            <hr />

            <Row gutter={[32,16]}>
                {/* {renderCards} */}
            </Row>
        </div>
    )
}

export default LandingPage
