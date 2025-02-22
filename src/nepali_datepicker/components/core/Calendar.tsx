import { View } from 'react-native';
import { memo, useCallback, useContext } from 'react';
import DaySelector from './DaySelector';
import YearSelector from './YearSelector';
import CalendarContextProvider, {
  CalendarContext,
} from '../context/CalendarContext';
import { ActionTypes } from '../context/CalendarReducer';
import Controller from './Controller';
import NepaliDate from '../../../lib/nepali_date/nepali_date';

const CalendarContainer = () => {
  const {
    state: { activeMonth, activeYear, view },
    dispatch,
  } = useContext(CalendarContext);

  const onPressPrev = useCallback(() => {
    dispatch({ type: ActionTypes.changeMonth, payload: 'decrement' });
  }, [dispatch]);

  const onPressNext = useCallback(() => {
    dispatch({ type: ActionTypes.changeMonth, payload: 'increment' });
  }, [dispatch]);

  return (
    <View style={{ flex: 1 }}>
      <Controller
        activeMonth={activeMonth}
        onPressNext={onPressNext}
        onPressPrev={onPressPrev}
      />
      {view === 'day' ? (
        <DaySelector activeMonth={activeMonth} />
      ) : (
        <YearSelector selectedYear={activeYear} />
      )}
    </View>
  );
};

const Calendar = ({
  date,
  onDateSelect,
}: {
  date: NepaliDate;
  onDateSelect: (date: NepaliDate) => any;
}) => {
  return (
    <CalendarContextProvider selectedDate={date} onDateSelect={onDateSelect}>
      <CalendarContainer />
    </CalendarContextProvider>
  );
};

export default memo(Calendar);
