import moment from 'moment-timezone';
import { dates as dateUtils } from './dates';

const { convertMomentToMyDate } = dateUtils;

function convertAmPmTimeTo24hr(timeToConvert) {
  // Note: now keeping `amPm` value when time is changed to 24hr so it can be used when switching back to AM/PM if amPm value is not determined by 24hr hour input value
  const { is24hr, amPm, hour } = timeToConvert;
  if (is24hr) return timeToConvert;
  if (isNaN(parseInt(hour)) || hour <= 0 || hour > 12) {
    return {
      ...timeToConvert,
      is24hr: true
    };
  }
  return {
    ...timeToConvert,
    is24hr: true,
    hour: (hour % 12) + (amPm === 'pm' ? 12 : 0)
  };
}

function convert24hrTimeToAmPm(timeToConvert) {
  const { hour, is24hr } = timeToConvert
  if (!is24hr) return timeToConvert;
  if (isNaN(parseInt(hour)) || hour < 0 || hour >= 24) {
    return {
      ...timeToConvert,
      is24hr: false
    };
  }
  return {
    ...timeToConvert,
    is24hr: false,
    amPm: hour >= 12 ? 'pm' : 'am',
    hour: (hour % 12) || 12
  };
}

function getTimestampFromDateAndTime(date, time, timezone) {
  const _time = time.is24hr ? time : convertAmPmTimeTo24hr(time);
  let dateTimeInfo = {
    ...date,
    hour: _time.hour,
    minute: _time.minute
  };
  return moment.tz(dateTimeInfo, timezone).valueOf();
}

function getTimeInfoFromUtcTime(utcTime, primaryTimezone, altTimezones = {}) {
  const timeMoment = moment.tz(utcTime, primaryTimezone);
  let timeInfo = {
    time: {
      hour: timeMoment.hour(),
      minute: timeMoment.minute(),
      second: timeMoment.second(),
      is24hr: true
    },
    date: convertMomentToMyDate(timeMoment),
    timezone: primaryTimezone,
    utcTime
  };
  for (const tzRoleName in altTimezones) {
    if (!timeInfo.altTimezones) timeInfo.altTimezones = {};
    timeInfo.altTimezones[tzRoleName] = getTimeInfoFromUtcTime(utcTime, altTimezones[tzRoleName]);
  }
  return timeInfo;
}

export {
  getTimestampFromDateAndTime,
  convertAmPmTimeTo24hr,
  convert24hrTimeToAmPm,
  getTimeInfoFromUtcTime
};
