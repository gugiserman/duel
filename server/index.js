const http = require('http')
const cors = require('cors')
const express = require('express')
const socketIO = require('socket.io')

const app = express()
const server = http.Server(app)
const io = socketIO(server)

const clientDir = __dirname.replace('/server', '/client')
const queue = []

server.listen(process.env.SERVER_PORT)
app.use(cors())
app.use(express.static(`${clientDir}/build`))

io.on('connection', newPlayer => {
  if (!queue.length) {
    newPlayer.inQueue = true
    newPlayer.positionInQueue = queue.length
    queue.push(newPlayer)
    newPlayer.emit('IN_QUEUE')
  }
  else {
    const players = [queue[0], newPlayer]

    players.forEach(player =>
      player.emit('MATCH_FOUND')
    )

    queue.splice(0, 1)
  }

  newPlayer.on('disconnect', () => {
    if (newPlayer.inQueue) {
      queue.splice(newPlayer.positionInQueue, 1)
      newPlayer.inQueue = false
      newPlayer.positionInQueue = -1
    }
  })
})
