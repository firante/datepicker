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
       className = {(props.viewType === 'month' ? props.callData.isActive : toDateClass)}
       
       onClick = {props.handleTdClick}>
      {props.callData.value}
    </td>
  );
};




const Tr = props => {
  const { viewType, currentDate } = props;
  const tdList = props.rowData.map((value, index) => (
    <Td currentDate={currentDate} viewType={viewType} callData={value} key={index}  />
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
    <div className={props.visible ? 'widget-block visible':'widget-block hidden'} >
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
	    {props.viewType === 'age' && `${props.age[0][0].value} - ${props.age[4][4].value}`}
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
  	  <tbody onClick={props.handleSelectDate}>
  	    {trList}
  	  </tbody>
  	</table>
      </div>
    </div>
  );
};

export default CalendarTable;
