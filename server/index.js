/** @format */

const express = require('express')
const socketio = require('socket.io')
const http = require('http')

const { addUser, getUser } = require('./users')

const PORT = process.env.PORT || 5000

const router = require('./router')
const { callbackify, isError } = require('util')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(router)

io.on('connection', (socket) => {
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room })

        if (error) return callback(error)

        socket.emit('message', {
            user: 'Server',
            text: `Hi ${user.name}, welcome to the room ${user.room}.`,
        })

        socket.broadcast.to(user.room).emit('message', {
            user: 'Server',
            text: `${user.name}, has joined.`,
        })
        socket.join(user.room)

        callback()
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)
        const room = user.room
        io.to(room).emit('message', { user: user.name, text: message })

        callback()
    })

    socket.on('disconnect', () => {
        console.log('User has left!!!!')
    })
})

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`))
