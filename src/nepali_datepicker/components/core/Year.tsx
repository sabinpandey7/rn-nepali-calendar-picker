import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { memo, useCallback, useContext } from 'react';
import { CalendarContext } from '../context/CalendarContext';
import { ActionTypes } from '../context/CalendarReducer';
import { theme } from '../utlis/colors';

const Year = ({ year, isSelected }: { isSelected: boolean; year: number }) => {
  const { dispatch } = useContext(CalendarContext);
  const onYearSelect = useCallback(() => {
    dispatch({ type: ActionTypes.switchView, payload: 'day' });
    dispatch({ type: ActionTypes.setYear, payload: year });
  }, [dispatch, year]);

  return (
    <View style={styles.yearCellWrapper}>
      <Pressable
        onPress={onYearSelect}
        style={[
          styles.yearCell,
          {
            backgroundColor: isSelected
              ? theme[Platform.OS]?.primary
              : 'transparent',
          },
        ]}
      >
        <Text
          style={[
            styles.label,
            { color: isSelected ? 'white' : theme[Platform.OS]?.textColor },
          ]}
        >
          {year}
        </Text>
      </Pressable>
    </View>
  );
};

export default memo(Year);

const styles = StyleSheet.create({
  yearCellWrapper: {
    width: '33%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 52,
  },
  yearCell: {
    borderRadius: 12,
    padding: 8,
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: 500,
  },
});
