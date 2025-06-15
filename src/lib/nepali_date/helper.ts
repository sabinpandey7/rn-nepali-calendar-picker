// @ts-ignore

import { calendarData, nomenclature } from './data/calendar';
import NepaliDate from './nepali_date';

export type DateObjectType = {
  year: number;
  month: number;
  date: number;
};

const REFERENCE_DATE_AD = '1918-04-13';
const MINDATE = { year: 1975, month: 1, date: 1 };
// const MAXDATE = { year: 2100, month: 12, date: 30 }
const NEPALI_NUMERAL = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];

function isValidBsRange({ year, month, date }: DateObjectType) {
  try {
    if (
      calendarData[year] &&
      calendarData[year] &&
      (calendarData[year][0][month - 1] as number) >= date
    ) {
      return true;
    }
  } catch (error) {
    return false;
  }
  return false;
}

export function date_difference_nepali(
  from: DateObjectType,
  to: DateObjectType
) {
  const from_from_reference = datesFromReference(from);
  const to_from_reference = datesFromReference(to);

  return to_from_reference - from_from_reference;
}

export function datesFromReference(date: DateObjectType) {
  let sum = 0;

  if (!isValidBsRange(date)) {
    throw Error('Invalid Date');
  }

  // sum till previous year
  for (let year = MINDATE.year; year < date.year; year++) {
    sum += calendarData[year][1];
  }

  //   sum from previous year
  for (let mon = 0; mon < date.month - 1; mon++) {
    sum += calendarData[date.year][0][mon];
  }

  return sum + date.date - 1;
}

export function add_dates_to_nepali(
  nepali_date: DateObjectType,
  days: number
): DateObjectType {
  if (!isValidBsRange(nepali_date)) {
    throw Error('Invalid Date');
  }

  let { year, month, date } = nepali_date;
  while (days > 0) {
    if (days > calendarData[year][1]) {
      days -= calendarData[year][1];
      year += 1;
    } else if (days > calendarData[year][0][month - 1]) {
      days -= calendarData[year][0][month - 1];
      month += 1;
    } else {
      date += days;
      days = 0;
      if (date > calendarData[year][0][month - 1]) {
        date = date - calendarData[year][0][month - 1];
        month += 1;
      }
    }
    if (month > 12) {
      month = 1;
      year += 1;
    }
  }

  // while (days > 0) {
  //   if (year > MAXDATE.year) {
  //     throw Error("Bs Year Must be less than 2100")
  //   }

  //   if (days > calendarData[year][0][month - 1]) {
  //     days -= calendarData[year][0][month - 1]
  //     month += 1
  //   } else {
  //     date += days
  //     days = 0
  //     if (date > calendarData[year][0][month - 1]) {
  //       date = date - calendarData[year][0][month - 1]
  //       month += 1
  //     }
  //   }
  //   if (month > 12) {
  //     month = 1
  //     year += 1
  //   }
  // }

  return { year, month, date };
}

export function fromJsDateHelper(date: Date) {
  date.setUTCHours(0, 0, 0, 0);

  const differenceIndates =
    (date.getTime() - Date.parse(REFERENCE_DATE_AD)) / (1000 * 60 * 60 * 24);
  return add_dates_to_nepali(MINDATE, differenceIndates);
}
export function toJsDate(date: DateObjectType) {
  const differenceIndates = datesFromReference(date);

  const new_timestamp =
    Date.parse(REFERENCE_DATE_AD) + differenceIndates * 1000 * 60 * 60 * 24;

  return new Date(new_timestamp);
}

export function format(date: NepaliDate, pattern: string, lang: 'en' | 'np') {
  return pattern
    .replace(/(Y{2,4}|M{2,4}|D{1,2})|([a-zA-Z]+)/g, (match, _) => {
      switch (match) {
        case 'YYYY':
          return format_numeral(date.getYear().toString(), lang);
        case 'YY':
          return format_numeral(date.getYear().toString().substring(2), lang);
        case 'MM':
          return nomenclature[lang].number[date.getMonth()].padStart(2, '0');
        case 'MMM':
          return nomenclature[lang].month.short[date.getMonth() - 1];
        case 'MMMM':
          return nomenclature[lang].month.long[date.getMonth() - 1];
        case 'DD':
          return nomenclature[lang].number[date.getDate()].padStart(
            2,
            lang == 'en' ? '0' : '०'
          );
        case 'W':
          return nomenclature[lang].day.short[date.getDay()];
        case 'WW':
          return nomenclature[lang].day.long[date.getDay()];
        default:
          return '**';
      }
    })
    .replace(/\*+/g, '');
}

export function format_numeral(date: string, lang?: 'en' | 'np') {
  if (lang === 'np')
    return date
      .split('')
      .map((num) => NEPALI_NUMERAL[parseInt(num)])
      .join('');
  return date;
}

export function parse(value: string) {
  const dateRegex = /^(\d{4})-(\d{2})-(\d{2})$/; // Matches dates like '2081-10-25'

  const match = value.match(dateRegex) as [string, string, string, string];
  if (match) {
    return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
  }
  throw new Error('Invalid Format: Accept format YYYY-MM-DD');
}
