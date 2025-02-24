import {
  FlatList,
  type ListRenderItemInfo,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useCallback, useContext, useMemo } from 'react';
import Day, { type IDay } from './Day';
import { calendarData } from '../../../lib/nepali_date/data/calendar';
import { CalendarContext } from '../context/CalendarContext';
import NepaliDate from '../../../lib/nepali_date/nepali_date';
import { theme } from '../utlis/colors';

const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const DaySelector = ({ activeMonth }: { activeMonth: number }) => {
  const {
    state: { activeYear, today },
    onDateSelect,
    selectedDate,
    minDate,
    maxDate,
  } = useContext(CalendarContext);

  const OS = Platform.OS === 'ios' ? 'ios' : 'android';

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
      };
      array.push(item);
    }

    for (i = 1; i <= numofdays; i++) {
      const item = {
        day: i,
        isSelected: false,
        isToday: false,
        isDisabled: false,
      };

      if (
        selectedDate?.getYear() === activeYear &&
        selectedDate?.getMonth() === activeMonth &&
        i === selectedDate?.getDate()
      ) {
        item.isSelected = true;
      }
      if (
        activeYear === today.getYear() &&
        activeMonth === today.getMonth() &&
        i === today.getDate()
      ) {
        item.isToday = true;
      }

      if (
        minDate &&
        new NepaliDate(activeYear, activeMonth, i).isGreater(minDate)
      ) {
        item.isDisabled = true;
      }
      if (
        maxDate &&
        new NepaliDate(activeYear, activeMonth, i).isSmaller(maxDate)
      ) {
        item.isDisabled = true;
      }

      array.push(item);
    }
    return array;
  }, [activeYear, activeMonth, selectedDate, today, maxDate, minDate]);

  const onDayClick = useCallback(
    (day: number) => {
      onDateSelect(new NepaliDate(activeYear, activeMonth, day));
    },
    [onDateSelect, activeYear, activeMonth]
  );

  const renderDay = useCallback(
    ({ item }: ListRenderItemInfo<IDay>) => {
      return (
        <Day
          onSelect={onDayClick}
          day={item.day}
          isSelected={item.isSelected}
          isToday={item.isToday}
          isDisabled={item.isDisabled}
        />
      );
    },
    [onDayClick]
  );

  return (
    <FlatList
      ListHeaderComponent={
        <View style={styles.week}>
          {weekDays.map((l, i) => {
            return (
              <Text
                key={i}
                style={{
                  ...styles.btn,
                  color: OS === 'ios' ? 'darkgrey' : theme[OS].textColor,
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
