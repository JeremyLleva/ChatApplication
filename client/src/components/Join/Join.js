/** @format */

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, TextField } from '@material-ui/core'
import './Join.css'

export default function SignIn() {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')

    return (
        <Container maxWidth='sm'>
            <h1 className='heading'>Join a Chat Room</h1>
            <div>
                <TextField
                    placeholder='Name'
                    type='text'
                    onChange={(event) => setName(event.target.value)}
                />
            </div>
            <div>
                <TextField
                    placeholder='Room'
                    type='text'
                    onChange={(event) => setRoom(event.target.value)}
                />
            </div>
            <Link
                onClick={(e) => (!name || !room ? e.preventDefault() : null)}
                to={`/chat?name=${name}&room=${room}`}
            >
                <Button variant='contained' type='submit'>
                    Sign In
                </Button>
            </Link>
        </Container>
    )
}
