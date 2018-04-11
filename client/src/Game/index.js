class Game {
  constructor(canvas, io, playerCount) {
    this.io = io
    this.canvas = canvas
    this.context = this.canvas.getContext('2d')
    this.playerCount = playerCount
    this.matchId = Math.random()

    this.renderMap()
    this.renderContainer()
  }

  renderContainer() {
    this.context.strokeStyle = '#eeeeee'
    this.context.strokeRect(0, 0, this.canvas.width, this.canvas.height)
  }

  renderMap() {
    const tileDimensions = [(this.canvas.width / 20), (this.canvas.height / 15)]
    const rowTemplate = []

    for (let i = 0; i < 20; i++) {
      rowTemplate.push(0)
    }

    const tileMap = []

    for (let i = 0; i < 15; i++) {
      tileMap.push(rowTemplate.slice())
    }

    tileMap.forEach((row, y) => {
      row.forEach((tile, x) => {
        this.context.rect(
          x * tileDimensions[0], y * tileDimensions[1],
          tileDimensions[0], tileDimensions[1]
        )
      })
    })
  }
}

export default Game
