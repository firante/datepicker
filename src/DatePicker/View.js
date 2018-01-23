import React from "react";

const thead = (styles={}) => (
  <thead
     style={styles['days-head']}
     >
    <tr style={styles['days-head-tr']}>
      <td style={styles['days-head-td']}>SU</td>
      <td style={styles['days-head-td']}>MO</td>
      <td style={styles['days-head-td']}>TU</td>
      <td style={styles['days-head-td']}>WE</td>
      <td style={styles['days-head-td']}>TH</td>
      <td style={styles['days-head-td']}>FR</td>
      <td style={styles['days-head-td']}>SA</td>
    </tr>
  </thead>
);


const Td = props => {
  let toDateClass = '';
  let customStyle = '';
  switch (props.viewType) {
  case 'month':
    toDateClass = props.callData.isActive === 'this-month'
      ? props.callData.value === props.currentDate.day
      ? `${props.callData.isActive} selected-date`
      : props.callData.isActive
    :  props.callData.isActive;
    customStyle = props.callData.isActive === 'this-month'
      ? props.callData.value === props.currentDate.day
      ? { ...props.styles['this-month'], ...props.styles['selected-date'] }
      : { ...props.styles['this-month'] }
    :  { ...props.styles['other-month']};
    
    break;

  case 'year':
    toDateClass = props.currentDate.monthText.startsWith(props.callData.value) ? 'selected-date' : '';
    customStyle = props.currentDate.monthText.startsWith(props.callData.value) ? { ...props.styles['selected-date'] } : {};
    break;

  case 'age':
    toDateClass = props.callData.value === props.currentDate.year ? 'selected-date' : '';
    customStyle = props.callData.value === props.currentDate.year ? { ...props.styles['selected-date'] } : {};
    break;

  default:
    break;
    
  }
  return (
    <td
       onMouseOver={(e) => { props.styles['td-hover-background'].color && (e.currentTarget.style.background = props.styles['td-hover-background'].color); }}
       onMouseOut={(e) => { props.styles['td-hover-background'].color && (e.currentTarget.style.background = 'unset'); }}
       className={toDateClass}
       style={{...props.styles['base-td'], ...customStyle}}
       onClick = {props.handleTdClick}>
      {props.callData.value}
    </td>
  );
};




const Tr = props => {
  const { viewType, currentDate } = props;
  const tdList = props.rowData.map((value, index) => (
    <Td styles={props.styles} currentDate={currentDate} viewType={viewType} callData={value} key={index}  />
  ));

  return <tr>{tdList}</tr>;
};

const CalendarTable = props => {
  const styles = props.styles || {};
  const actualView = props.viewType === 'month'
	  ? props.month
	  : props.viewType === 'year'
	  ? props.year
	  : props.age;
  const trList = actualView.map(function(value, index) {
    return (<Tr styles={props.styles} currentDate={props.currentDate} viewType={props.viewType} rowData={value} key={index} />);
  });
  return (
    <div
       className={props.visible ? 'widget-block visible':'widget-block hidden'}
       style={props.styles['widget-block']}>
      <div style={styles['date-picker-header']} className="date-picker-header">
  	<div
	   style={styles['change-arrow']}
  	   className='change-arrow arrow-left'
  	   onClick={props.handlePrevious}>
  	  <span
  	     className="glyphicon glyphicon-menu-left"
  	     aria-hidden='true'>
  	  </span>
  	</div>
  	<div
	   style={styles['change-range']}
  	   className='change-range'
  	   onClick={props.handleChangeViewType}>
  	  <span>
  	    {props.viewType === 'month' && `${props.currentDate.monthText} , ${props.currentDate.year}`}
	    {props.viewType === 'year' && `${props.currentDate.year}`}
	    {props.viewType === 'age' && `${props.age[0][0].value} - ${props.age[4][4].value}`}
  	  </span>
  	</div>
  	<div
	   style={styles['change-arrow']}
  	   className='change-arrow arrow-right'
  	   onClick={props.handleNext}
  	   >
  	  <span
  	     className="glyphicon glyphicon-menu-right"
  	     aria-hidden='true'>
  	  </span>
  	</div>
      </div>
      <div
	 style={styles['main-content']}
	 className='div-content'>
  	<table
	   style={styles['content-table']}
	   className='content-table'>
  	  {props.viewType === 'month' && thead(styles)}
  	  <tbody onClick={props.handleSelectDate}>
  	    {trList}
  	  </tbody>
  	</table>
      </div>
    </div>
  );
};

export default CalendarTable;
