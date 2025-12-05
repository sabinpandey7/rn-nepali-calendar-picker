import { Modal, Platform, View } from 'react-native';
import { memo, useCallback, useContext, useEffect } from 'react';
import DaySelector from './DaySelector';
import YearSelector from './YearSelector';
import CalendarContextProvider, {
  CalendarContext,
} from '../context/CalendarContext';
import { ActionTypes } from '../context/CalendarReducer';
import Controller from './Controller';
import NepaliDate from '../../../lib/nepali_date/nepali_date';
import type { IEvent } from './Day';
import { theme } from '../utlis/colors';

export type ModeType = 'single' | 'multi' | 'range';
export type LangType = 'en' | 'np';
export interface ICalendarProps {
  date?: NepaliDate;
  minDate?: NepaliDate;
  maxDate?: NepaliDate;
  mode?: ModeType;
  lang?: LangType;
  dates?: Array<NepaliDate>;
  events?: Array<IEvent>;
  onDateSelect?: (date: NepaliDate) => any;
  onDisplayMonthChange?: (activeMonth: number, activeYear: number) => any;
  disableYearSelector?: boolean;
}

const CalendarContainer = ({
  type,
  disableYearSelector,
}: {
  type: 'picker' | 'calendar';
  disableYearSelector?: boolean;
}) => {
  const {
    state: { activeMonth, activeYear, view },
    dispatch,
    onDisplayMonthChange,
  } = useContext(CalendarContext);

  useEffect(() => {
    if (onDisplayMonthChange) {
      onDisplayMonthChange(activeMonth, activeYear);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeMonth, activeYear]);

  const onPressPrev = useCallback(() => {
    dispatch({ type: ActionTypes.changeMonth, payload: 'decrement' });
  }, [dispatch]);

  const onPressNext = useCallback(() => {
    dispatch({ type: ActionTypes.changeMonth, payload: 'increment' });
  }, [dispatch]);
  const OS = Platform.OS === 'ios' ? 'ios' : 'android';

  return (
    <View>
      <Controller
        activeMonth={activeMonth}
        onPressNext={onPressNext}
        onPressPrev={onPressPrev}
        disableYearSelector={disableYearSelector}
      />
      {(view === 'day' || type === 'calendar') && (
        <DaySelector type={type} activeMonth={activeMonth} />
      )}
      {type === 'picker' && view === 'year' && (
        <View style={{ maxHeight: '80%' }}>
          <YearSelector selectedYear={activeYear} />
        </View>
      )}
      {type === 'calendar' && (
        <Modal
          visible={view === 'year'}
          onRequestClose={() =>
            dispatch({ type: ActionTypes.switchView, payload: 'day' })
          }
          transparent
        >
          <View
            style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
          >
            <View
              style={{
                width: '90%',
                height: '40%',
                borderRadius: 16,
                backgroundColor: theme[OS].backgroundColor || 'white',
              }}
            >
              <YearSelector selectedYear={activeYear} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const Calendar = ({
  date,
  onDateSelect,
  maxDate,
  minDate,
  mode = 'single',
  dates = [],
  lang = 'en',
  events = [],
  onDisplayMonthChange,
  disableYearSelector,
}: ICalendarProps) => {
  return (
    <CalendarContextProvider
      minDate={minDate}
      maxDate={maxDate}
      date={date}
      mode={mode}
      dates={dates}
      lang={lang}
      events={events}
      onDateSelect={onDateSelect}
      onDisplayMonthChange={onDisplayMonthChange}
      disableYearSelector
    >
      <CalendarContainer
        type="calendar"
        disableYearSelector={disableYearSelector}
      />
    </CalendarContextProvider>
  );
};
export const PickerCalendar = memo(
  ({
    date,
    onDateSelect,
    maxDate,
    minDate,
    mode = 'single',
    dates = [],
    lang = 'en',
    events = [],
  }: ICalendarProps) => {
    return (
      <CalendarContextProvider
        minDate={minDate}
        maxDate={maxDate}
        date={date}
        mode={mode}
        dates={dates}
        lang={lang}
        events={events}
        onDateSelect={onDateSelect}
      >
        <CalendarContainer type="picker" />
      </CalendarContextProvider>
    );
  }
);

PickerCalendar.displayName = 'PickerCalendar';

export default memo(Calendar);
