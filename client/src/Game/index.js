class Game {
  constructor(players = []) {
    this.matchId = Math.random()
    this.players = players

    this.welcomePlayers()
  }

  welcomePlayers() {
    this.players.forEach(player =>
      player.emit('GAME_STARTED')
    )
  }
}

export default Game
