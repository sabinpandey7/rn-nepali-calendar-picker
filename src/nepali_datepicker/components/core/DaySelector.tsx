import {
  FlatList,
  type ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useCallback, useContext, useMemo } from 'react';
import Day, { type IDay, type IEvent } from './Day';
import { calendarData } from '../../../lib/nepali_date/data/calendar';
import { CalendarContext } from '../context/CalendarContext';
import NepaliDate from '../../../lib/nepali_date/nepali_date';
import { useTheme } from '../context/ThemeContext';

const weekDays = {
  en: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  np: ['आ', 'सो', 'मं', 'बु', 'बि', 'शु', 'श'],
};

/**
 * Turns a highlight key into the padded `YYYY-MM-DD` form `NepaliDate.toString()`
 * produces, so `2081-5-3` and `2081-05-03` both match. Returns null when the
 * value isn't a date at all — a bad entry is skipped rather than crashing render.
 */
const normalizeDateKey = (value: string) => {
  const match = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(value.trim());
  if (!match) {
    return null;
  }
  const [, year, month, date] = match as unknown as [
    string,
    string,
    string,
    string,
  ];
  return `${year}-${month.padStart(2, '0')}-${date.padStart(2, '0')}`;
};

const DaySelector = ({
  activeMonth,
  type,
}: {
  activeMonth: number;
  type: 'picker' | 'calendar';
}) => {
  const {
    state: { activeYear, today },
    onDateSelect,
    date,
    minDate,
    maxDate,
    dates,
    lang,
    mode,
    events,
    highlights,
  } = useContext(CalendarContext);

  const colors = useTheme();

  const highlightMap = useMemo(() => {
    const map = new Map<string, string>();
    Object.entries(highlights ?? {}).forEach(([highlightDate, color]) => {
      const key = normalizeDateKey(highlightDate);
      if (key) {
        map.set(key, color);
      } else if (__DEV__) {
        console.warn(
          `[rn-nepali-calendar-picker] Ignoring highlight "${highlightDate}": expected format YYYY-MM-DD.`
        );
      }
    });
    return map;
  }, [highlights]);

  const dayGrids = useMemo(() => {
    const numofdays = calendarData[activeYear][0][activeMonth - 1];

    const firstDayofWeek = new NepaliDate(activeYear, activeMonth, 1).getDay();

    const array = [];

    let i = 0;
    for (; i < firstDayofWeek; i++) {
      const item = {
        day: 0,
        isSelected: false,
        isToday: false,
        isDisabled: false,
        isBetween: false,
        isStartDate: false,
        isEndDate: false,
        events: [] as Array<IEvent>,
        highlightColor: undefined as string | undefined,
      };
      array.push(item);
    }

    for (i = 1; i <= numofdays; i++) {
      const item = {
        day: i,
        isSelected: false,
        isToday: false,
        isDisabled: false,
        isBetween: false,
        isStartDate: false,
        isEndDate: false,
        events: [] as Array<IEvent>,
        highlightColor: undefined as string | undefined,
      };

      const nepali_date_item = new NepaliDate(activeYear, activeMonth, i);
      item.highlightColor = highlightMap.get(nepali_date_item.toString());
      if (mode === 'range') {
        const firstElement = dates?.[0];
        const lastElement = dates?.[dates.length - 1];
        if (firstElement && nepali_date_item.isEqual(firstElement)) {
          item.isStartDate = true;
          item.isSelected = true;
        }
        if (lastElement && nepali_date_item.isEqual(lastElement)) {
          item.isEndDate = true;
          item.isSelected = true;
        }

        if (dates && dates.length > 1) {
          if (firstElement && lastElement) {
            if (
              nepali_date_item.isSmaller(firstElement) &&
              nepali_date_item.isGreater(lastElement)
            ) {
              item.isBetween = true;
            }
          }
        }
      } else if (mode === 'multi') {
        dates?.forEach((element) => {
          if (nepali_date_item.isEqual(element)) {
            item.isSelected = true;
          }
        });
      } else {
        if (date && nepali_date_item.isEqual(date)) {
          item.isSelected = true;
        }
      }

      if (nepali_date_item.isEqual(today)) {
        item.isToday = true;
      }

      if (minDate && nepali_date_item.isGreater(minDate)) {
        item.isDisabled = true;
      }
      if (maxDate && nepali_date_item.isSmaller(maxDate)) {
        item.isDisabled = true;
      }
      if (events) {
        item.events = events?.filter((value) => {
          if (nepali_date_item?.isEqual(value.date)) {
            return true;
          }

          if (value.endDate) {
            if (
              nepali_date_item.isEqual(value.endDate) ||
              (nepali_date_item.isSmaller(value.date) &&
                nepali_date_item.isGreater(value.endDate))
            )
              return true;
          }
          return false;
        });
      }

      array.push(item);
    }
    return array;
  }, [
    activeYear,
    activeMonth,
    dates,
    date,
    today,
    maxDate,
    events,
    minDate,
    mode,
    highlightMap,
  ]);

  const onDayClick = useCallback(
    (day: number) => {
      if (onDateSelect) {
        onDateSelect(new NepaliDate(activeYear, activeMonth, day));
      }
    },
    [onDateSelect, activeYear, activeMonth]
  );

  const renderDay = useCallback(
    ({ item }: ListRenderItemInfo<Omit<IDay, 'lang'>>) => {
      return (
        <Day
          onSelect={onDayClick}
          day={item.day}
          isSelected={item.isSelected}
          isToday={item.isToday}
          isDisabled={item.isDisabled}
          isBetween={item.isBetween}
          isStartDate={item.isStartDate}
          isEndDate={item.isEndDate}
          lang={lang || 'en'}
          events={item.events || []}
          highlightColor={item.highlightColor}
        />
      );
    },
    [onDayClick, lang]
  );

  return (
    <FlatList
      scrollEnabled={type === 'picker'}
      ListHeaderComponent={
        <View style={styles.week}>
          {weekDays[lang || 'en'].map((l, i) => {
            return (
              <Text
                key={i}
                style={{
                  ...styles.btn,
                  color: colors.weekdayTextColor,
                }}
              >
                {l}
              </Text>
            );
          })}
        </View>
      }
      data={dayGrids}
      renderItem={renderDay}
      numColumns={7}
      keyExtractor={(item) => item.day.toString()}
    />
  );
};

export default DaySelector;

const styles = StyleSheet.create({
  calendar: {
    padding: 16,
  },
  week: {
    flexDirection: 'row',
  },
  dates: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // flexWrap: "wrap",
  },
  btn: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 24,
    width: '14.28%',
    paddingVertical: 8,
  },
});
