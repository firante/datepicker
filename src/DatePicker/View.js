import React from "react";

const thead = () => (
  <thead>
    <tr>
      <td>SU</td>
      <td>MO</td>
      <td>TU</td>
      <td>WE</td>
      <td>TH</td>
      <td>FR</td>
      <td>SA</td>
    </tr>
  </thead>
);


const Td = props => {
  let toDateClass = '';
  switch (props.viewType) {
  case 'month':
    if(props.callData.isActive == 'thisDate') {
      toDateClass = props.callData.value == props.currentDate.day ? 'toDate' : '';
    }
    break;

  case 'year':
    if(props.callData.value === props.currentDate.monthText) {
      toDateClass = 'toDate';
    }

    break;

  case 'year-range':
    toDateClass = props.callData.value == props.currentDate.year ? 'toDate' : '';
    break;

  default:
    break;
  }

  return (
    <td
       className = {(props.viewType === 'month' ? props.callData.isActive +" "+toDateClass : toDateClass)}
       
       onClick = {props.handleTdClick}>
      {props.callData.value}
    </td>
  );
};




const Tr = props => {
  const { viewType, currentDate } = props;
  const tdList = props.rowData.map((value, index) => (
    <Td currentDate={currentDate} viewType={viewType} callData={value} key={index} />
  ));

  return <tr>{tdList}</tr>;
};

const CalendarTable = props => {
  const actualView = props.viewType === 'month'
	  ? props.month
	  : props.viewType === 'year'
	    ? props.year
	    : props.age;
  const trList = actualView.map(function(value, index) {
    return (<Tr currentDate={props.currentDate} viewType={props.viewType} rowData={value} key={index} />);
  });

  return (
    <div className='widget-block'>
      <div className='div-navbar'>
  	<div
  	   className='div-gliphicon'
  	   onClick={props.handlePrevious}>
  	  <span
  	     className="glyphicon glyphicon-menu-left"
  	     aria-hidden='true'>
  	  </span>
  	</div>
  	<div
  	   className='div-range'
  	   onClick={props.handleChangeViewType}>
  	  <span>
  	    {props.viewType === 'month' && `${props.currentDate.monthText} , ${props.currentDate.year}`}
	    {props.viewType === 'year' && `${props.currentDate.year}`}
  	  </span>
  	</div>
  	<div
  	   className='div-gliphicon'
  	   onClick={props.handleNext}
  	   >
  	  <span
  	     className="glyphicon glyphicon-menu-right"
  	     aria-hidden='true'>
  	  </span>
  	</div>
      </div>
      <div className='div-content'>
  	<table className='content-table'>
  	  {props.viewType === 'month' && thead()}
  	  <tbody>
  	    {trList}
  	  </tbody>
  	</table>
      </div>
      {/* <div
  	       className = 'footerCalendar'>
  	  <button
  	       type='button'
  	       className='btn-calendar'
  	       onClick={this.handleToDayButton}>
  	      Today
  	    </button>
      </div> */}
    </div>
  );
}

export default CalendarTable;
