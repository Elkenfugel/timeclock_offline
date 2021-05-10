import React, { Component } from 'react';
import getStyle, { tableAreaStyleVars } from './style';
import { currentJobTimeService, windowWidthService } from '../../../../../data';
import { getNumTablesInReport, getWidthOfEl, processTimeForReport } from './utilities';
import { numWidthLevels } from './Table';
import Week from './Week';
import Totals from './Totals';

const { pxWidthUnavailableToTables } = tableAreaStyleVars;

function getTimeDataState() {
  return { processedTimeData: processTimeForReport(currentJobTimeService.getValue()) };
};

class FullReport extends Component {
  constructor(props) {
    super(props);
    this.registerColWidthsGetter = this.registerColWidthsGetter.bind(this);
    this.unregisterColWidthsGetter = this.unregisterColWidthsGetter.bind(this);
    this.handleTimeDataChange = this.handleTimeDataChange.bind(this);
    this.setWidths = this.setWidths.bind(this);
    this.setTableColWidths = this.setTableColWidths.bind(this);
    this.ensureTableFits = this.ensureTableFits.bind(this);
    this.resetWidths = this.resetWidths.bind(this);
    this.tableRef = React.createRef();
    this.wholeReportRef = React.createRef();
    this.state = {
      ...getTimeDataState(),
      colWidthsGetters: [],
      isSettingWidths: false,
      colWidths: undefined,
      tableWidth: undefined,
      tableWidthLevel: 0,
      setWidthsTries: 0
    };
  };

  registerColWidthsGetter(getColWidthsForTable) {
    this.setState(({ colWidthsGetters }) => ({
      colWidthsGetters: [...colWidthsGetters, getColWidthsForTable]
    }));
  };

  unregisterColWidthsGetter(getColWidthsForTable) {
    this.setState(({ colWidthsGetters }) => ({
      colWidthsGetters: colWidthsGetters.filter(fxn => fxn !== getColWidthsForTable)
    }));
  };

  handleTimeDataChange() {
    this.setState(getTimeDataState(), this.setWidths);
  };

  setWidths() {
    const { state } = this;
    let { setWidthsTries } = state;
    if (++setWidthsTries > 6) {
      return this.setState({ isSettingWidths: false, setWidthsTries: 0 });
    }
    const hasGetters = state.colWidthsGetters.length === getNumTablesInReport(state.processedTimeData);
    if (state.colWidths || state.tableWidth || !state.isSettingWidths || !hasGetters) {
      const stateUpdates = {
        colWidths: undefined, tableWidth: undefined, isSettingWidths: true, setWidthsTries
      };
      return this.setState(stateUpdates, this.setWidths);
    }
    this.setTableColWidths().then(this.ensureTableFits);
  };

  setTableColWidths() { // (col width is set to the largest width needed by any table so all tables can have same widths)
    let colWidths = {};
    this.state.colWidthsGetters.forEach(getTableColWidths => {
      for (const [colName, colWidth] of Object.entries(getTableColWidths())) {
        colWidths[colName] = Math.max(colWidths[colName] || 0, colWidth);
      }
    });
    return new Promise(resolve => this.setState({ colWidths }, resolve));
  };

  ensureTableFits() {
    const availableWidth = getWidthOfEl(this.wholeReportRef) - pxWidthUnavailableToTables - 3;
    let { tableWidthLevel } = this.state;
    const tableWidth = getWidthOfEl(this.tableRef);
    if (tableWidth > availableWidth && ++tableWidthLevel < numWidthLevels) {
      return this.setState({ tableWidthLevel, setWidthsTries: 0 }, this.setWidths);
    }
    this.setState({ tableWidth, isSettingWidths: false, setWidthsTries: 0 });
  };

  resetWidths() {
    this.setState({ tableWidthLevel: 0 }, this.setWidths);
  };

  componentDidMount() {
    this.setWidths();
    windowWidthService.subscribe(this.resetWidths);
    currentJobTimeService.subscribe(this.handleTimeDataChange);
  };

  componentWillUnmount() {
    windowWidthService.unsub(this.resetWidths);
    currentJobTimeService.unsub(this.handleTimeDataChange);
  };

  render() {
    const {
      registerColWidthsGetter, unregisterColWidthsGetter, wholeReportRef, tableRef
    } = this;
    const {
      dateRange, style: styleProp
    } = this.props;
    const {
      colWidths,
      tableWidth,
      isSettingWidths,
      tableWidthLevel,
      processedTimeData
    } = this.state;

    if (!processedTimeData) {
      return (<></>);
    }
  
    const {
      weeks,
      totals,
      hasPaidTime: reportHasPaidTime,
      hasMultipleTimezones: reportHasMultipleTimezones,
      ...otherTimeData
    } = processedTimeData;

    const commonTablesAttrs = {
      ...otherTimeData,
      reportHasMultipleTimezones,
      reportHasPaidTime,
      tableColWidths: colWidths, 
      registerColWidthsGetter,
      unregisterColWidthsGetter,
      tableWidthLevel,
      tableWidth
    };
  
    const style = getStyle(styleProp, isSettingWidths, tableWidth);
  
    return (
      <article style={style.wholeReport} ref={wholeReportRef}>
        <h1 style={style.reportTitle} className="title is-size-4">
          Full Report of All Time
        </h1>
        {weeks.map(week => (
          <Week
            key={week.weekDocId}
            {...commonTablesAttrs}
            {...{ week }}
          />
        ))}
        <Totals
          {...commonTablesAttrs}
          {...{
            totals,
            tableRef
          }}
          isReportTotals
          areaLabel={!dateRange && 'Job Totals'}
        />
      </article>
    );
  };
}
  
export default FullReport;
