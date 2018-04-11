const rowCount = 15
const columnCount = 15

class Game {
  constructor(canvas, io, playerCount = 2) {
    this.io = io
    this.canvas = canvas
    this.context = this.canvas.getContext('2d')
    this.tileDimensions = [(this.canvas.width / rowCount), (this.canvas.height / columnCount)]
    this.playerCount = playerCount
    this.matchId = Math.random()

    this.startTicking()
  }

  renderContainer() {
    this.context.strokeStyle = '#eeeeee'
    this.context.strokeRect(0, 0, this.canvas.width, this.canvas.height)
  }

  renderMap() {
    const rowTemplate = []

    for (let i = 0; i < rowCount; i++) {
      rowTemplate.push(0)
    }

    const tileMap = []

    for (let i = 0; i < columnCount; i++) {
      tileMap.push(rowTemplate.slice())
    }

    tileMap.forEach((row, y) => {
      row.forEach((tile, x) => {
        this.context.rect(
          x * this.tileDimensions[0], y * this.tileDimensions[1],
          this.tileDimensions[0], this.tileDimensions[1]
        )
      })
    })
  }

  renderPlayers() {
    const middleRow = Math.ceil(rowCount / 2)

    const firstPlayer = {
      row: 3,
      column: middleRow,
      color: '#0000b2',
    }

    const secondPlayer = {
      row: (rowCount - 2),
      column: middleRow,
      color: '#cc0000',
    }

    const players = [firstPlayer, secondPlayer]

    players.forEach(player => {
      const x = (player.row * this.tileDimensions[0]) - (this.tileDimensions[0] / 2)
      const y = Math.ceil(player.column * this.tileDimensions[1]) - (this.tileDimensions[1] / 2)
      this.context.fillStyle = player.color
      this.context.lineWidth = 1
      this.context.beginPath()
      this.context.arc(x, y, (this.tileDimensions[1] / 2), 0, (2 * Math.PI))
      this.context.fill()
    })
  }

  startTicking() {
    let i = 1
    this._interval = window.setInterval(() => {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.renderMap()
      this.renderPlayers(i)
      this.renderContainer()
      i++
    }, 20)
  }
}

export default Game
