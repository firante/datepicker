import React from "react";
import CalendarTable from "./View";

export default class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    
    this.handlePrevious = this.handlePrevious.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleChangeViewType = this.handleChangeViewType.bind(this);
    this.handleSelectDate = this.handleSelectDate.bind(this);
    this.handleOpenDatePicker = this.handleOpenDatePicker.bind(this);
    
    const currentDate = this.getNewDate();
    const month = this.getMonthView(currentDate);

    this.state = {
      selectedDate: currentDate,
      month,
      age: null,
      currentDate,
      viewType: 'month',
      visible: false
    };
  }

  setNewDate(date, shouldBeChanged) {
    this.setState({
      currentDate: this.getNewDate(date)
    }, () => {
      shouldBeChanged && this.setState({
	selectedDate: this.state.currentDate
      });
    });
    this.state.viewType === 'month' && this.setMonthView();
    return true;
  }

  setSelectedDate() {
    this.setState({
      selectedDate: this.state.currentDate
    });
  }

  setMonthView() {
    this.setState(prevState => ({
      month: this.getMonthView(prevState.currentDate)
    }));
    return true;
  }

  // --- set age view ---
  
  setAgeView(age) {
    this.setState({ age });
  }

  // --- view types ---
  setViewType(viewType = 'month') {
    viewType === 'age' && this.actualizeAge();
    this.setState({
      viewType
    });
    return true;
  }

  setVisible(visible) {
    this.setState({ visible });
  }

   // --- dates ---
  getNewDate(date = new Date()) {

    return {
      day: parseInt(date.getDate()),
      month: parseInt(date.getMonth()),
      monthText: this.getMonthList()[date.getMonth()],
      year: parseInt(date.getFullYear())
    };
  }
  
  getMonthList() {
    const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
		       'September','October', 'November', 'December'];
    return monthList;
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
  	  isActive: (parseInt(currentDate.month) === parseInt(date.getMonth()) ? 'this-month' : 'other-month')
  	});
  	date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
      }
    }
    return month;
  }

  // actualize age
  actualizeAge(year = this.state.currentDate.year - 12) {
    const age = [Array(5).fill(), Array(5).fill(), Array(5).fill(), Array(5).fill(), Array(5).fill()];
    const filledAge = age.map((row, i) => row.map((_, j) => ({ value: year + (i * 5 + j), isActive: 'other-month' })));
    this.setAgeView(filledAge);
  }

  getSelectedDate() {
    return `${this.state.selectedDate.day}/${this.state.selectedDate.month + 1}/${this.state.selectedDate.year}`;
  }

  
// --- handlers ---
  handlePrevious() {
    const viewType = this.state.viewType;
    const currentDate = this.state.currentDate;
    if(viewType === 'month') {
      const month = (12 + (currentDate.month - 1)) % 12;
      const year = month === 11 ? currentDate.year - 1 : currentDate.year;
      this.setNewDate(new Date(year, month, currentDate.day), false);
      this.setMonthView();
    } else if (viewType === 'year') {
      const currentDate = this.state.currentDate;
      this.setNewDate(new Date(currentDate.year-1, currentDate.month, currentDate.day), false);
    } else if (viewType === 'age') {
      const year = this.state.age[0][0].value - 24;
      this.actualizeAge(year);
    }
  }

  handleNext() {
    const viewType = this.state.viewType;
    const currentDate = this.state.currentDate;
    if(viewType === 'month') {
      const month = (12 + (currentDate.month + 1)) % 12;
      const year = month === 0 ? currentDate.year + 1 : currentDate.year;
      this.setNewDate(new Date(year, month, currentDate.day), false);
      this.setMonthView();
    } else if(viewType === 'year') {
      const currentDate = this.state.currentDate;
      this.setNewDate(new Date(currentDate.year+1, currentDate.month, currentDate.day), false);
    } if(viewType === 'age') {
      const year = this.state.age[4][4].value;
      this.actualizeAge(year);
    }
  }

  handleChangeViewType() {
    const viewType = this.state.viewType;
    viewType === 'month' && this.setViewType('year');
    viewType === 'year' && this.setViewType('age');
    
  }

  handleSelectDate(e) {
    this.state.viewType === 'age'
      && this.setViewType('year')
      && this.setNewDate(new Date(e.target.textContent, this.state.currentDate.month, this.state.currentDate.day), true);

    this.state.viewType === 'year'
      && this.setViewType('month')
      && this.setNewDate(new Date(
	this.state.currentDate.year,
	this.getMonthList().findIndex((val) => new RegExp(`^${e.target.textContent}`, 'i').test(val)),
	this.state.currentDate.day
      ), true)
      && this.setMonthView();

    if(this.state.viewType === 'month') {
      const isCurrentMonth = e.target.classList.contains('this-month');
      isCurrentMonth && this.setNewDate(new Date(
	this.state.currentDate.year,
	this.state.currentDate.month,
	e.target.textContent), true) && this.setMonthView();
      !isCurrentMonth && this.setNewDate(new Date(
	this.state.currentDate.year,
	parseInt(e.target.textContent) < 15
	  ? parseInt(this.state.currentDate.month) + 1
	  : parseInt(this.state.currentDate.month) - 1,
	e.target.textContent
      ), true) && this.setMonthView();
      this.setVisible(false);
    }
  }

  handleOpenDatePicker() {
    this.setVisible(true);
  }
  
  render() {
    const year = [
      [{value:'Jan', isActive:'other-month'}, {value:'Feb', isActive:'other-month'}, {value:'Mar', isActive:'other-month'}] ,
      [{value:'Apr', isActive:'other-month'}, {value:'May', isActive:'other-month'}, {value:'Jun', isActive:'other-month'}] ,
      [{value:'Jul', isActive:'other-month'}, {value:'Aug', isActive:'other-month'}, {value:'Sep', isActive:'other-month'}] ,
      [{value:'Oct', isActive:'other-month'}, {value:'Nov', isActive:'other-month'}, {value:'Dec', isActive:'other-month'}]
    ];
    return (
      <div className="date-picker">
	<input style={this.props.styles['date-input']} tupe="text" value={this.getSelectedDate()} onClick={this.handleOpenDatePicker} />
	<CalendarTable
	   {...this.props}
           year={year}
           {...this.state}
	   handlePrevious={this.handlePrevious}
	   handleNext={this.handleNext}
	   handleChangeViewType={this.handleChangeViewType}
	   handleSelectDate={this.handleSelectDate}
	   />

      </div>
    );
  }
}
