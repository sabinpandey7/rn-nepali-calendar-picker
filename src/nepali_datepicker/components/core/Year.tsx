import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { memo, useCallback, useContext } from 'react';
import { CalendarContext } from '../context/CalendarContext';
import { ActionTypes } from '../context/CalendarReducer';
import { theme } from '../utlis/colors';
import { format_numeral } from '../../../lib/nepali_date/helper';

const Year = ({ year, isSelected }: { isSelected: boolean; year: number }) => {
  const { dispatch } = useContext(CalendarContext);
  const onYearSelect = useCallback(() => {
    dispatch({ type: ActionTypes.switchView, payload: 'day' });
    dispatch({ type: ActionTypes.setYear, payload: year });
  }, [dispatch, year]);

  const os = Platform.OS === 'ios' ? 'ios' : 'android';

  return (
    <View style={styles.yearCellWrapper}>
      <Pressable
        onPress={onYearSelect}
        style={[
          styles.yearCell,
          {
            backgroundColor: isSelected ? theme[os]?.primary : 'transparent',
          },
        ]}
      >
        <Text
          style={[
            styles.label,
            { color: isSelected ? 'white' : theme[os]?.textColor },
          ]}
        >
          {format_numeral(year.toString(), 'np')}
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
