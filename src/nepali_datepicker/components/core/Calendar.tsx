import { Modal, View } from 'react-native';
import { memo, useCallback, useContext, useEffect } from 'react';
import DaySelector from './DaySelector';
import YearSelector from './YearSelector';
import CalendarContextProvider, {
  CalendarContext,
} from '../context/CalendarContext';
import { ActionTypes } from '../context/CalendarReducer';
import Controller from './Controller';
import NepaliDate from '../../../lib/nepali_date/nepali_date';
import type { IEvent, IHighlights } from './Day';
import ThemeProvider, {
  type ThemeProps,
  useTheme,
} from '../context/ThemeContext';

export type ModeType = 'single' | 'multi' | 'range';
export type LangType = 'en' | 'np';
export interface ICalendarProps extends ThemeProps {
  date?: NepaliDate;
  minDate?: NepaliDate;
  maxDate?: NepaliDate;
  mode?: ModeType;
  lang?: LangType;
  dates?: Array<NepaliDate>;
  events?: Array<IEvent>;
  /**
   * Per-date text colors keyed by `'YYYY-MM-DD'`. Takes precedence over
   * `theme.textColor` for those day cells.
   */
  highlights?: IHighlights;
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
  const colors = useTheme();

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
                backgroundColor: colors.backgroundColor,
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
  highlights,
  theme,
  colorScheme,
}: ICalendarProps) => {
  return (
    <ThemeProvider theme={theme} colorScheme={colorScheme}>
      <CalendarContextProvider
        minDate={minDate}
        maxDate={maxDate}
        date={date}
        mode={mode}
        dates={dates}
        lang={lang}
        events={events}
        highlights={highlights}
        onDateSelect={onDateSelect}
        onDisplayMonthChange={onDisplayMonthChange}
        disableYearSelector
      >
        <CalendarContainer
          type="calendar"
          disableYearSelector={disableYearSelector}
        />
      </CalendarContextProvider>
    </ThemeProvider>
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
    highlights,
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
        highlights={highlights}
        onDateSelect={onDateSelect}
      >
        <CalendarContainer type="picker" />
      </CalendarContextProvider>
    );
  }
);

PickerCalendar.displayName = 'PickerCalendar';

export default memo(Calendar);
