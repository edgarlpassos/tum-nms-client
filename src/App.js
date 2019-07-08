import React, { Component } from 'react';
import Routes from './Routes';

import Navbar from './components/Navbar';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Navbar />
        <Routes />
      </div>
    );
  }
}

export default App;
