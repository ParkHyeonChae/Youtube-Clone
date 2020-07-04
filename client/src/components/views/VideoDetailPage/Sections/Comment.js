import React, { useState } from 'react'

function Comment() {

    const [commentValue, setcommentValue] = useState("")

    const handleClick = (event) => {
        setcommentValue(event.currentTarget.value)
    }


    return (
        <div>
            <br />
            <p>Replies</p>
            <hr />

            {/* Comment Lists */}

            {/* Root Comment Form */}

            <form style={{ display: 'flex' }} onSubmit>
                <textarea
                    style={{ width: '100%', borderRadius:' 5px' }}
                    onChange={handleClick}
                    value={commentValue}
                    placeholder="Please Write Comments..."
                />
                <br />

                <button style={{ width: '20%', height: '52px' }} onClick>Submit</button>
            </form>

        </div>
    )
}

export default Comment