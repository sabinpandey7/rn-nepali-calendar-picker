import { describe, expect, test } from '@jest/globals';
import NepaliDate from '../nepali_date';

describe('Testing Nepali Date', () => {
  test('test constructors', () => {
    const now = new Date();
    expect(new NepaliDate().toAdString()).toEqual(
      now.toISOString().split('T')[0]
    );
    expect(new NepaliDate(2081, 10, 19).toAdString()).toEqual('2025-02-01');

    expect(new NepaliDate(2081, 10, 30).toFormat()).toEqual('2081-10-30');

    expect(new NepaliDate('2081-10-19').toAdString()).toEqual('2025-02-01');
    expect(new NepaliDate('2058-08-13').toAdString()).toEqual('2001-11-28');

    expect(() => new NepaliDate('12-12-12312')).toThrow(
      'Invalid Format: Accept format YYYY-MM-DD'
    );
  });

  test('Test Date from Js Date', () => {
    expect(NepaliDate.fromJSDate(new Date('2025-02-28')).toFormat()).toEqual(
      '2081-11-16'
    );

    expect(NepaliDate.fromJSDate(new Date('2024-04-13')).toFormat()).toEqual(
      '2081-01-01'
    );

    expect(NepaliDate.fromJSDate(new Date('2001-11-28')).toFormat()).toEqual(
      '2058-08-13'
    );

    expect(NepaliDate.fromJSDate(new Date('2005-10-22')).toFormat()).toEqual(
      '2062-07-05'
    );
  });

  test('attrs testing', () => {
    const nepali_date = new NepaliDate(2081, 10, 19);
    expect(nepali_date.getDate()).toEqual(19);
    expect(nepali_date.getDay()).toEqual(6);
    expect(nepali_date.getMonth()).toEqual(10);
    expect(nepali_date.getYear()).toEqual(2081);
    expect(nepali_date.toAdString()).toEqual('2025-02-01');
    expect(nepali_date.toFormat()).toEqual('2081-10-19');
    const nepali_date2 = new NepaliDate(2058, 8, 13);
    expect(nepali_date2.getDate()).toEqual(13);
    expect(nepali_date2.getDay()).toEqual(3);
    expect(nepali_date2.getMonth()).toEqual(8);
    expect(nepali_date2.getYear()).toEqual(2058);
    expect(nepali_date2.toAdString()).toEqual('2001-11-28');
    expect(nepali_date2.toFormat()).toEqual('2058-08-13');
  });

  test('format testing', () => {
    const nepali_date = new NepaliDate(2081, 10, 19);
    expect(nepali_date.toFormat()).toEqual('2081-10-19');
    expect(nepali_date.toFormat('YY-MM-DD')).toEqual('81-10-19');
    expect(nepali_date.toFormat('YYYY-MMM-DD')).toEqual('2081-Mag-19');
    expect(nepali_date.toFormat('YYYY-MMMM-DD')).toEqual('2081-Magh-19');
    expect(nepali_date.toFormat('DD:MMMM:YYYY')).toEqual('19:Magh:2081');
    expect(nepali_date.toFormat('MMM DD YYYY')).toEqual('Mag 19 2081');
    expect(nepali_date.toFormat('W, DD MMMM YYYY')).toEqual(
      'Sat, 19 Magh 2081'
    );
    expect(nepali_date.toFormat('WW,DD/MMMM/YYYY')).toEqual(
      'Saturday,19/Magh/2081'
    );
  });

  test('test comparison methods', () => {
    const nepali_date = new NepaliDate(2081, 10, 20);
    expect(nepali_date.isEqual(nepali_date)).toBeTruthy();
    expect(nepali_date.isEqual(new NepaliDate(2081, 10, 20))).toBeTruthy();
    expect(nepali_date.isEqual(new NepaliDate(2058, 10, 20))).toBeFalsy();
    expect(nepali_date.isEqual(new NepaliDate(2081, 10, 21))).toBeFalsy();
    expect(nepali_date.isEqual(new NepaliDate(2081, 11, 20))).toBeFalsy();
    expect(nepali_date.isEqual(new NepaliDate(2080, 10, 20))).toBeFalsy();

    expect(nepali_date.isGreater(new NepaliDate(2081, 10, 21))).toBeTruthy();
    expect(nepali_date.isGreater(new NepaliDate(2081, 11, 20))).toBeTruthy();
    expect(nepali_date.isGreater(new NepaliDate(2082, 1, 20))).toBeTruthy();
    expect(nepali_date.isGreater(new NepaliDate(2080, 11, 21))).toBeFalsy();
    expect(nepali_date.isGreater(new NepaliDate(2080, 8, 22))).toBeFalsy();
    expect(nepali_date.isGreater(nepali_date)).toBeFalsy();

    expect(nepali_date.isSmaller(new NepaliDate(2081, 10, 21))).toBeFalsy();
    expect(nepali_date.isSmaller(new NepaliDate(2081, 11, 20))).toBeFalsy();
    expect(nepali_date.isSmaller(new NepaliDate(2082, 1, 20))).toBeFalsy();
    expect(nepali_date.isSmaller(new NepaliDate(2080, 11, 21))).toBeTruthy();
    expect(nepali_date.isSmaller(new NepaliDate(2080, 8, 22))).toBeTruthy();
    expect(nepali_date.isSmaller(nepali_date)).toBeFalsy();

    expect(nepali_date.difference(new NepaliDate(2081, 11, 12))).toEqual(
      1900800000
    );
    expect(nepali_date.difference(new NepaliDate(2081, 10, 22))).toEqual(
      172800000
    );
    expect(nepali_date.difference(new NepaliDate(2081, 10, 21))).toEqual(
      86400000
    );
    expect(nepali_date.difference(new NepaliDate(2081, 10, 18))).toEqual(
      -172800000
    );
    expect(nepali_date.difference(new NepaliDate(2081, 10, 19))).toEqual(
      -86400000
    );
  });
});
