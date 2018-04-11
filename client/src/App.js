import React, { Component } from 'react'
import client from 'socket.io-client'
import Game from './Game'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      game: null,
      inQueue: true,
      isPlaying: false,
    }
  }

  componentDidMount() {
    const io = client()

    io.on('MATCH_FOUND', players => {
      this.setState({
        game: new Game(players),
        inQueue: false,
        isPlaying: true,
      })
    })
  }

  render() {
    const { inQueue, isPlaying } = this.state

    return (
      <div style={{ textAlign: 'center', width: '100%' }}>
        <h1>{inQueue ? 'in queue...' : isPlaying ? 'match found!' : 'welcome'}</h1>
      </div>
    )
  }
}

export default App
