import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../utlis/colors';

export interface IDay {
  day: number;
  isSelected: boolean;
  isToday: boolean;
  isDisabled: boolean;
}

const Day = ({
  day,
  isSelected,
  isToday,
  onSelect,
  isDisabled,
}: IDay & {
  onSelect: (day: number) => void;
}) => {
  const OS = Platform.OS === 'ios' ? 'ios' : 'android';

  return (
    <Pressable
      disabled={isDisabled}
      onPress={() => onSelect(day)}
      style={{ width: '14.28%', padding: 4 }}
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
