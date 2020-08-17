import {
  dates as dateUtils,
  formatMyDate,
  getDateRangeText,
  getSimpleJobSettingValueText
} from '../../utilities';

export * from '../../utilities';

const { getPrecedingDate, areDatesEquivalent } = dateUtils;

function preprocessScheduleForDisplay(schedule, settingName) {
  return schedule.map(
    (entry, index) => {
      const { startDate, value } = entry;
      const endDate = (
        index !== schedule.length - 1 ?
        getPrecedingDate(schedule[index + 1].startDate) :
        undefined
      );
      return {
        ...entry,
        endDate,
        startDateText: startDate && formatMyDate(startDate),
        startDateShortText: startDate && formatMyDate(startDate, 'MMM. D'),
        dateRangeText: getDateRangeText(startDate, endDate),
        dateRangeShortText: getDateRangeText(startDate, endDate, true),
        valueSimpleText: getSimpleJobSettingValueText(settingName, value)
      };
    }
  );
}

function findIndexOfSchedEntryWithDate(date, schedule) {
  if (!date || !schedule || schedule.length === 1) return null;
  for (let i = 1; i < schedule.length; i++) {
    if (areDatesEquivalent(schedule[i].startDate, date)) {
      return i;
    }
  }
  return null;
}

function doesEntryExistWithStartDate(date, schedule) {
  const indexOfEntryWithDate = findIndexOfSchedEntryWithDate(date, schedule);
  return !!(indexOfEntryWithDate || indexOfEntryWithDate === 0);
}

export {
  preprocessScheduleForDisplay,
  findIndexOfSchedEntryWithDate,
  doesEntryExistWithStartDate
};