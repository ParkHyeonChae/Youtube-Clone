import React, { useEffect, useState } from 'react'
import Axios from 'axios'


function Subscribe(props) {

    const [SubscribeNumber, setSubscribeNumber] = useState(0)
    const [Subscribed, setSubscribed] = useState(false)

    useEffect(() => {
    
        let variable = { userTo: props.userTo }
        
        Axios.post('/api/subscribe/subscriberNumber', variable) // 구독자 수 정보
            .then(response => {
                if(response.data.success) {
                    setSubscribeNumber(response.data.SubscribeNumber)
                } else {
                    alert('Failed Get Subscribes...')
                }
            })
        
        let subscribedVariable = { userTo: props.userTo, useFrom: localStorage.getItem('userId') } // 영상 게시자를 내가 구독하는 확인, 클라 LocalStorage에서 가져옴
        

        Axios.post('/api/subscribe/subscribed', subscribedVariable)
            .then(response => {
                if(response.data.success) {
                    setSubscribed(response.data.subscribed)
                } else {
                    alert('Failed Get Data...')
                }
            })

    }, [])

    return (
        <div>
            <button
                style={{
                    backgroundColor: `${Subscribe ? '#CC0000' : '#AAAAAA'}`, borderRadius: '4px',
                    color: 'white', padding: '10px 16px',
                    fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
                }}
                onClick
            >
                {SubscribeNumber} {Subscribed ? 'Subscribed' : 'Subscribe'}
            </button>
        </div>
    )
}

export default Subscribe
