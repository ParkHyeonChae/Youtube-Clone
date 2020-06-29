import React, { useEffect, useState } from 'react'
import Axios from 'axios'


function Subscribe(props) {

    const [SubscribeNumber, setSubscribeNumber] = useState(0)
    const [Subscribed, setSubscribed] = useState(false)

    useEffect(() => {
    
        let variable = { userTo: props.userTo }
        
        Axios.post('/api/subscribe/subscribeNumber', variable) // 구독자 수 정보
            .then(response => {
                if(response.data.success) {
                    setSubscribeNumber(response.data.subscribeNumber)
                } else {
                    alert('Failed Get Subscribes...')
                }
            })
        
        let subscribedVariable = { userTo: props.userTo, userFrom: localStorage.getItem('userId') } // 영상 게시자를 내가 구독하는 확인, 클라 LocalStorage에서 가져옴
        
        Axios.post('/api/subscribe/subscribed', subscribedVariable)
            .then(response => {
                if(response.data.success) {
                    setSubscribed(response.data.subscribed)
                } else {
                    alert('Failed Get Data...')
                }
            })

    }, [])

    const onSubscribe = () => {
        
        let subscribeVariable = {
            userTo: props.userTo,
            userFrom: props.userFrom
        }

        // 이미 구독 중이면
        if(Subscribed) {
            Axios.post('/api/subscribe/unSubscribe', subscribeVariable)
                .then(response => {
                    if(response.data.success) {
                        setSubscribeNumber(SubscribeNumber - 1)
                        setSubscribed(!Subscribed)
                    } else {
                        alert('Failed Unsubscribe...')
                    }
                })
        
        // 구독중이 아니라면
        } else {
            Axios.post('/api/subscribe/subscribe', subscribeVariable)
                .then(response => {
                    if(response.data.success) {
                        setSubscribeNumber(SubscribeNumber + 1)
                        setSubscribed(!Subscribed)
                    } else {
                        alert('Failed Subscribe...')
                    }
                })
        }
    }

    return (
        <div>
            <button
                style={{
                    backgroundColor: `${Subscribed ? '#AAAAAA' : '#CC0000'}`,
                    borderRadius: '4px', border: 'none',
                    color: 'white', padding: '10px 16px',
                    fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
                }}
                onClick={onSubscribe}
            >
                {SubscribeNumber} {Subscribed ? 'Subscribed' : 'Subscribe'}
            </button>
        </div>
    )
}

export default Subscribe
