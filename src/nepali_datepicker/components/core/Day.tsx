import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
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
  /** Per-date text color from the `highlights` prop, overrides `theme.textColor`. */
  highlightColor?: string;
}

/** Map of `'YYYY-MM-DD'` to text color, accepted by the `highlights` prop. */
export type IHighlights = Record<string, string>;

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
  highlightColor,
}: IDay & {
  onSelect: (day: number) => void;
}) => {
  const colors = useTheme();
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
          backgroundColor: isBetween ? colors.rangeBackground : undefined,
        }}
      >
        <View
          style={[
            styles.dayCell,
            {
              borderRadius: isToday || isSelected ? 1000 : 0,
              borderColor: colors.primary,
              borderWidth: isToday ? 1 : 0,
              backgroundColor:
                isToday && !isSelected
                  ? colors.todayBackground
                  : isSelected
                    ? colors.primary
                    : isBetween
                      ? colors.rangeBackground
                      : 'transparent',
            },
          ]}
        >
          <Text
            style={[
              styles.label,
              {
                color: isDisabled
                  ? colors.disabledTextColor
                  : isSelected
                    ? colors.onPrimary
                    : (highlightColor ?? colors.textColor),
              },
            ]}
          >
            {day ? nomenclature[lang].number[day] : ''}
          </Text>
        </View>
        {(isStartDate || isEndDate) && (
          <View
            style={{
              backgroundColor: colors.rangeBackground,
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
