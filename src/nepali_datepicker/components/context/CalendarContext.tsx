import { type PropsWithChildren, createContext, useReducer } from 'react';
import NepaliDate from '../../../lib/nepali_date/nepali_date';
import { type CalendarActions, reducer } from './CalendarReducer';
import type { ICalendarProps } from '../core/Calendar';

export type IntialStateType = {
  today: NepaliDate;
  view: 'day' | 'year';
  activeMonth: number;
  activeYear: number;
};

interface IContext extends ICalendarProps {
  state: IntialStateType;
  dispatch: React.Dispatch<CalendarActions>;
}

export const CalendarContext = createContext<IContext>({
  state: {
    activeMonth: 1,
    activeYear: 1975,
    today: new NepaliDate(),
    view: 'day',
  },
  mode: 'single',
  onDateSelect: (date: NepaliDate) => {
    console.log(date);
  },
  date: new NepaliDate(),
  dispatch: () => {},
});

const CalendarContextProvider = ({
  children,
  date = new NepaliDate(),
  onDateSelect,
  minDate,
  maxDate,
  mode = 'single',
  dates,
}: PropsWithChildren<ICalendarProps>) => {
  const [state, dispatch] = useReducer(reducer, {
    activeMonth: date?.getMonth(),
    activeYear: date?.getYear(),
    today: new NepaliDate(),
    view: 'day',
  });

  return (
    <CalendarContext.Provider
      value={{
        state,
        dispatch,
        onDateSelect,
        date,
        minDate,
        maxDate,
        mode,
        dates,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export default CalendarContextProvider;
