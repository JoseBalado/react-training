import moment, { Moment, isMoment } from 'moment';

export const DATE_FORMAT = 'DD-MMM-YYYY';
export const DATE_TIME_FORMAT = 'DD-MMM-YYYY HH:mm';
export const DATE_TIMEZONE_FORMAT = 'YYYY-MM-DD HH:mm ZZ';

export const formatDate = (value: Moment | string) =>
  isMoment(value)
    ? value.format(DATE_FORMAT)
    : moment(value).format(DATE_FORMAT);

export const formatDateTime = (value: Moment | string) =>
  isMoment(value)
    ? value.format(DATE_TIME_FORMAT)
    : moment(value).format(DATE_TIME_FORMAT);

export const formatFilterString = (value: string) => {
  return value ? value.replace(/\s+/g, '').toUpperCase() : value;
};
