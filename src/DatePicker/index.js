import React from "react";
import CalendarTable from "./View";

export default class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    
    this.handlePrevious = this.handlePrevious.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleChangeViewType = this.handleChangeViewType.bind(this);
    
    const currentDate = this.getNewDate();
    const month = this.getMonthView(currentDate);

    this.state = {
      month,
      age: null,
      currentDate,
      viewType: 'month'
    };
  }

 // --- dates ---
  getNewDate(date = new Date()) {
    const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
		       'September','October', 'November', 'December'];
    return {
      day: parseInt(date.getDate()),
      month: parseInt(date.getMonth()),
      monthText: monthList[date.getMonth()],
      year: parseInt(date.getFullYear())
    };
  }

  setNewDate(date) {
    this.setState({
      currentDate: this.getNewDate(date)
    });
  }
  
// --- month view --- 
  getMonthView(currentDate) {
    const month = [[],[],[],[],[],[]];
    let date = new Date(currentDate.year, currentDate.month, 1);
    if(parseInt(date.getDay()) === 0) {
      date = new Date(currentDate.year, currentDate.month, parseInt(date.getDate())-7);
    } else {
      date = new Date(currentDate.year, currentDate.month, date.getDate() - date.getDay());
    }
    for(var i = 0; i < 6; i += 1) {
      for(var j = 0; j < 7; j += 1) {
  	month[i].push({
  	  value: parseInt(date.getDate()),
  	  isActive: (parseInt(currentDate.month) === parseInt(date.getMonth()) ? 'thisDate' : 'otherDate')
  	});
  	date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
      }
    }
    return month;
  }

  setMonthView() {
    this.setState(prevState => ({
      month: this.getMonthView(prevState.currentDate)
    }));
  }

// --- view types ---
  setViewType(viewType = 'month') {
    this.setState({
      viewType
    });
  }

  
// --- handlers ---
  handlePrevious() {
    const viewType = this.state.viewType;
    const currentDate = this.state.currentDate;
    if(viewType === 'month') {
      const month = (12 + (currentDate.month - 1)) % 12;
      const year = month === 11 ? currentDate.year - 1 : currentDate.year;
      this.setNewDate(new Date(year, month, currentDate.day));
      this.setMonthView();
    } else if (viewType === 'year') {
      const currentDate = this.state.currentDate;
      this.setNewDate(new Date(currentDate.year-1, currentDate.month, currentDate.day));
    }
  }

  handleNext() {
    const viewType = this.state.viewType;
    const currentDate = this.state.currentDate;
    if(viewType === 'month') {
      const month = (12 + (currentDate.month + 1)) % 12;
      const year = month === 0 ? currentDate.year + 1 : currentDate.year;
      this.setNewDate(new Date(year, month, currentDate.day));
      this.setMonthView();
    } else if(viewType === 'year') {
      const currentDate = this.state.currentDate;
      this.setNewDate(new Date(currentDate.year+1, currentDate.month, currentDate.day));
    }
  }

  handleChangeViewType() {
    const viewType = this.state.viewType;
    viewType === 'month' && this.setViewType('year');
    viewType === 'year' && this.setViewType('age');
  }
  
  render() {
    const year = [
      [{value:'Jan', isActive:'otherDate'}, {value:'Feb', isActive:'otherDate'}, {value:'Mar', isActive:'otherDate'}] ,
      [{value:'Apr', isActive:'otherDate'}, {value:'May', isActive:'otherDate'}, {value:'Jun', isActive:'otherDate'}] ,
      [{value:'Jul', isActive:'otherDate'}, {value:'Aug', isActive:'otherDate'}, {value:'Sep', isActive:'otherDate'}] ,
      [{value:'Oct', isActive:'otherDate'}, {value:'Nov', isActive:'otherDate'}, {value:'Dec', isActive:'otherDate'}]
    ];
    return (
      <CalendarTable
         year={year}
         {...this.state}
	 handlePrevious={this.handlePrevious}
	 handleNext={this.handleNext}
	 handleChangeViewType={this.handleChangeViewType}
	 />
    );
  }
}
