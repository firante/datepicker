import React, { Component } from 'react';
import logo from './logo.svg';
//import './App.css';
import './stylesheet/style.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import DatePicker from './DatePicker';

class App extends Component {
  render() {
    const styles = {
      'date-input': {},
      'date-picker-header': {},
      'change-arrow': {},
      'change-range': {},
      'main-content': {},
      'content-table': {},
      'days-head': {},
      'days-head-tr': {},
      'days-head-td': {},
      'this-month': {},
      'other-month': {},
      'selected-date': {},
      'base-td': {},
      'td-hover-background': {},
      'widget-block': {}
    };

    return (
      <div className="col-xs-12 col-sm-3 col-md-2 col-lg-2">
	<DatePicker styles={styles || {}} />
      </div>
    );
  }
}

export default App;
