import React, { Component } from 'react'
import client from 'socket.io-client'
import Game from './Game'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      game: null,
      canvas: null,
      inQueue: false,
      isPlaying: false,
    }
  }

  handleCanvasRef = el => {
    this.setState({
      canvas: el,
    })
  }

  connect = () => {
    this.setState({
      inQueue: true,
    })

    const { canvas } = this.state
    const io = client()

    io.on('MATCH_FOUND', () => {
      this.setState({
        game: new Game(canvas, io),
        inQueue: false,
        isPlaying: true,
      })
    })
  }

  componentDidUpdate() {
    const { canvas, inQueue, isPlaying } = this.state

    if (canvas && !inQueue && !isPlaying) {
      this.connect()
    }
  }

  componentDidMount() {
    if (!this.state.canvas) {
      return false
    }

    this.connect()
  }

  render() {
    const { inQueue } = this.state

    return (
      <div style={{ textAlign: 'center', width: '100%' }}>
        <h1>Duel</h1>
        <h3>{inQueue ? 'in queue...' : ''}</h3>
        <canvas id="game-container" width="640" height="400" ref={this.handleCanvasRef} />
      </div>
    )
  }
}

export default App
