import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../utlis/colors';
import { nomenclature } from '../../../lib/nepali_date/data/calendar';
import NepaliDate from '../../../lib/nepali_date/nepali_date';
import { memo } from 'react';

export interface IDay {
  day: number;
  isSelected: boolean;
  isToday: boolean;
  isDisabled: boolean;
  isBetween: boolean;
  isStartDate: boolean;
  isEndDate: boolean;
  lang: 'en' | 'np';
  events: Array<any>;
}

export interface IEvent {
  name: string;
  date: NepaliDate;
  color: string;
  endDate?: NepaliDate;
}

const Day = ({
  day,
  isSelected,
  isToday,
  onSelect,
  isDisabled,
  isBetween,
  isStartDate,
  lang,
  isEndDate,
  events,
}: IDay & {
  onSelect: (day: number) => void;
}) => {
  const OS = Platform.OS === 'ios' ? 'ios' : 'android';
  return (
    <View
      style={{
        width: '14.28%',
        marginVertical: 2,
      }}
    >
      <Pressable
        disabled={isDisabled}
        onPress={() => onSelect(day)}
        style={{
          backgroundColor: isBetween ? theme[OS].rangeBackground : undefined,
        }}
      >
        <View
          style={[
            styles.dayCell,
            {
              borderRadius: isToday || isSelected ? 1000 : 0,
              borderColor: theme[OS].primary,
              borderWidth: isToday ? 1 : 0,
              backgroundColor:
                isToday && !isSelected
                  ? 'white'
                  : isSelected
                    ? theme[OS].primary
                    : isBetween
                      ? theme[OS].rangeBackground
                      : 'transparent',
            },
          ]}
        >
          <Text
            style={[
              styles.label,
              {
                color: isDisabled
                  ? 'grey'
                  : isSelected
                    ? 'white'
                    : theme[OS].textColor,
              },
            ]}
          >
            {day ? nomenclature[lang].number[day] : ''}
          </Text>
        </View>
        {(isStartDate || isEndDate) && (
          <View
            style={{
              backgroundColor: theme[OS].rangeBackground,
              width: '50%',
              height: '100%',
              position: 'absolute',
              zIndex: -1,
              right: isStartDate ? 0 : undefined,
            }}
          />
        )}
      </Pressable>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'wrap',
          maxHeight: 8,
          overflow: 'hidden',
        }}
      >
        {events?.map((value, index) => (
          <View
            key={index}
            style={{
              backgroundColor: value.color,
              width: 8,
              height: 8,
              borderRadius: 5,
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default memo(Day);

const styles = StyleSheet.create({
  dayCell: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    aspectRatio: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: 500,
  },
  selectedCell: {},
});
