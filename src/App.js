import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './stylesheet/style.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import DatePicker from './DatePicker';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <div className="col-xs-12 col-sm-3 col-md-2 col-lg-2">
	    <DatePicker />
	  </div>
	</p>
      </div>
    );
  }
}

export default App;
