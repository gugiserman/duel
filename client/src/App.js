import React, { Component } from 'react'
import socketIO from 'socket.io-client'

class App extends Component {
  render() {
    return (
      <div>
        <h1>Duel</h1>
        <canvas height="800" width="600" />
      </div>
    )
  }
}

export default App
