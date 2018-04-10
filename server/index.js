const http = require('http')
const cors = require('cors')
const express = require('express')
const socketIO = require('socket.io')

const app = express()
const server = http.Server(app)
const io = socketIO(server)

const clientDir = __dirname.replace('/server', '/client')

server.listen(9000)
app.use(cors())
app.use(express.static(`${clientDir}/build`))

// io.on('connection', socket => {
// })
