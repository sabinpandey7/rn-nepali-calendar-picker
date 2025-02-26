import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../utlis/colors';

export interface IDay {
  day: number;
  isSelected: boolean;
  isToday: boolean;
  isDisabled: boolean;
  isBetween: boolean;
  isStartDate: boolean;
  isEndDate: boolean;
}

const Day = ({
  day,
  isSelected,
  isToday,
  onSelect,
  isDisabled,
  isBetween,
  isStartDate,
  isEndDate,
}: IDay & {
  onSelect: (day: number) => void;
}) => {
  const OS = Platform.OS === 'ios' ? 'ios' : 'android';

  console.log(theme[OS].rangeBackground);
  return (
    <Pressable
      disabled={isDisabled}
      onPress={() => onSelect(day)}
      style={{
        width: '14.28%',
        backgroundColor: isBetween ? theme[OS].rangeBackground : undefined,
        marginVertical: 2,
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
          {day ? day : ''}
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
  );
};

export default Day;

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
