const http = require('http')
const cors = require('cors')
const express = require('express')
const socketIO = require('socket.io')

const app = express()
const server = http.Server(app)
const io = socketIO(server)
const clientDir = __dirname.replace('/server', '/client')

const allPlayers = []
const queue = []

server.listen(process.env.PORT || 9000)
app.use(cors())
app.use(express.static(`${clientDir}/build`))

app.get('*', (req, res) => {
  res.sendFile(`${clientDir}/build/index.html`)
})

io.on('connection', newPlayer => {
  allPlayers.push(newPlayer)

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

    const index = allPlayers.indexOf(newPlayer)
    allPlayers.splice(index, 1)
  })
})
