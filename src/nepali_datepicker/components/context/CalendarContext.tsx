import { type PropsWithChildren, createContext, useReducer } from 'react';
import NepaliDate from '../../../lib/nepali_date/nepali_date';
import { type CalendarActions, reducer } from './CalendarReducer';

export type IntialStateType = {
  today: NepaliDate;
  view: 'day' | 'year';
  activeMonth: number;
  activeYear: number;
};

type ContextType = {
  state: IntialStateType;
  dispatch: React.Dispatch<CalendarActions>;
  onDateSelect: (date: NepaliDate) => any;
  selectedDate: NepaliDate | null;
  maxDate?: NepaliDate;
  minDate?: NepaliDate;
};

export const CalendarContext = createContext<ContextType>({
  state: {
    activeMonth: 1,
    activeYear: 1975,
    today: new NepaliDate(),
    view: 'day',
  },
  onDateSelect: (date: NepaliDate) => {
    console.log(date);
  },
  selectedDate: null,
  dispatch: () => {},
});

const CalendarContextProvider = ({
  children,
  selectedDate,
  onDateSelect,
  minDate,
  maxDate,
}: PropsWithChildren<{
  selectedDate: NepaliDate;
  onDateSelect: (date: NepaliDate) => any;
  minDate?: NepaliDate;
  maxDate?: NepaliDate;
}>) => {
  const [state, dispatch] = useReducer(reducer, {
    activeMonth: selectedDate.getMonth(),
    activeYear: selectedDate.getYear(),
    today: new NepaliDate(),
    view: 'day',
  });

  return (
    <CalendarContext.Provider
      value={{ state, dispatch, onDateSelect, selectedDate, minDate, maxDate }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export default CalendarContextProvider;
