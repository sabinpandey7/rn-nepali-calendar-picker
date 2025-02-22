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
}: PropsWithChildren<{
  selectedDate: NepaliDate;
  onDateSelect: (date: NepaliDate) => any;
}>) => {
  const [state, dispatch] = useReducer(reducer, {
    activeMonth: selectedDate.getMonth(),
    activeYear: selectedDate.getYear(),
    today: new NepaliDate(),
    view: 'day',
  });

  return (
    <CalendarContext.Provider
      value={{ state, dispatch, onDateSelect, selectedDate }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export default CalendarContextProvider;
