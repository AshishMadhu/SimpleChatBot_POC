import React, { Component } from 'react';
import CreateMessage from './components/CreateMessage';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Create your chatBot</h1>
        <hr/>
        <CreateMessage />
      </div>
    );
  }
}

export default App;
