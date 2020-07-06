/** @format */

import React from 'react'
import { Button, TextField } from '@material-ui/core'
import './Input.css'

const Input = ({ setMessage, sendMessage, message }) => (
    <form className='form'>
        <TextField
            className='input'
            type='text'
            placeholder='Type a message...'
            value={message}
            onChange={({ target: { value } }) => setMessage(value)}
            onKeyPress={(event) =>
                event.key === 'Enter' ? sendMessage(event) : null
            }
        />
        <Button variant='contained' onClick={(e) => sendMessage(e)}>
            Send
        </Button>
    </form>
)

export default Input
