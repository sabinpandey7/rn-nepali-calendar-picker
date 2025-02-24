import {
  type DateObjectType,
  format,
  fromJsDateHelper,
  parse,
  toJsDate,
} from './helper';

class NepaliDate {
  private year: number;
  private month: number;
  private date: number;

  constructor(value?: string);
  constructor(year: number, monthIndex: number, date: number);
  constructor() {
    if (arguments.length === 3) {
      this.year = arguments[0];
      this.month = arguments[1];
      this.date = arguments[2];
    } else if (arguments.length === 1 && typeof arguments[0] === 'string') {
      const [year, month, date] = parse(arguments[0]) as [
        number,
        number,
        number,
      ];
      this.year = year;
      this.month = month;
      this.date = date;
    } else {
      const { year, month, date } = fromJsDateHelper(new Date());
      this.year = year;
      this.month = month;
      this.date = date;
    }
  }

  getDay() {
    return new Date(this.ad_date).getDay();
  }

  getDateObject() {
    return {
      year: this.year,
      month: this.month,
      date: this.date,
    };
  }

  get ad_date() {
    return toJsDate(this.getDateObject());
  }

  getYear() {
    return this.year;
  }

  setYear(year: number) {
    return (this.year = year);
  }

  getMonth() {
    return this.month;
  }
  setMonth(month: number) {
    return (this.month = month);
  }
  getDate() {
    return this.date;
  }

  setDate(date: number) {
    return (this.date = date);
  }

  toString() {
    return format(this, 'YYYY-MM-DD', 'en');
  }
  toAdString() {
    return this.ad_date.toISOString().split('T')[0];
  }

  toFormat(pattern: string = 'YYYY-MM-DD', lang: 'en' | 'np' = 'en') {
    return format(this, pattern, lang);
  }

  isEqual(date: NepaliDate) {
    return (
      date.getDate() === this.getDate() &&
      date.getMonth() === this.getMonth() &&
      date.getYear() === this.getYear()
    );
  }
  isGreater(compareDate: NepaliDate) {
    const { year, month, date } = compareDate.getDateObject();

    if (year === this.year) {
      if (month === this.month) {
        return this.date < date;
      }
      return this.month < month;
    }

    return this.year < year;
  }

  isSmaller(compareDate: NepaliDate) {
    const { year, month, date } = compareDate.getDateObject();

    if (year === this.year) {
      if (month === this.month) {
        return this.date > date;
      }
      return this.month > month;
    }

    return this.year > year;
  }

  difference(compareDate: NepaliDate) {
    return compareDate.ad_date.getTime() - this.ad_date.getTime();
  }

  //   factory methods
  static fromJSDate(date: Date) {
    let bs_date: DateObjectType = fromJsDateHelper(date);
    return new this(bs_date.year, bs_date.month, bs_date.date);
  }
}

export default NepaliDate;
