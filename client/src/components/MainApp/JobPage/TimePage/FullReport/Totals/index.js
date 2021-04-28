import React from 'react';
import getStyle from './style';
import { getTotalsRowGroups } from '../utilities';
import TableAreaHeader from '../TableAreaHeader';
import Table from '../Table';

function Totals({
  totals,
  areaLabel = "Totals",
  reportHasPaidTime,
  reportHasMultipleTimezones,
  registerColWidthsGetter,
  unregisterColWidthsGetter,
  tableColWidths: colWidths,
  isReportTotals,
  tableRef
}) {

  const style = getStyle(isReportTotals);
  
  return (
    <Container {...{ isReportTotals }}>
      <TableAreaHeader
        label={areaLabel}
        style={style.areaHeader}
        {...{ isReportTotals }}
        isTotals
      />
      <Table
        hasTimes={false}
        hasSecondTzCol={reportHasMultipleTimezones}
        hasSecondaryTzTimes={false}
        hasEarningCols={reportHasPaidTime}
        rowGroups={getTotalsRowGroups({ totals, reportHasPaidTime })}
        style={style.table}
        {...{
          colWidths,
          registerColWidthsGetter,
          unregisterColWidthsGetter,
          tableRef
        }}
      />
    </Container>
  ); 
}

export default Totals;


function Container({
  isReportTotals,
  ...props
}) {
  return isReportTotals ? (
    <section {...props} />
  ) : (
    props.children
  );
}
