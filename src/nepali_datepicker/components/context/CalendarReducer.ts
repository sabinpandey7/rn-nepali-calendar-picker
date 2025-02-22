import { type IntialStateType } from './CalendarContext';

const MAX_YEAR = 2100;
const MIN_YEAR = 1975;

export enum ActionTypes {
  switchView = 'SWITCH_VIEW',
  setMonth = 'SET_MONTH',
  setYear = 'SET_YEAR',
  changeMonth = 'CHANGE_MONTH',
}

export type ChangeMonthAction = {
  type: ActionTypes.changeMonth;
  payload: 'increment' | 'decrement';
};

export type SetMonthAction = {
  type: ActionTypes.setMonth;
  payload: number;
};
export type SetYearAction = {
  type: ActionTypes.setYear;
  payload: number;
};

export type SwitchViewAction = {
  type: ActionTypes.switchView;
  payload: 'day' | 'year';
};

export type CalendarActions =
  | SwitchViewAction
  | ChangeMonthAction
  | SetMonthAction
  | SetYearAction;

export const reducer = (state: IntialStateType, action: CalendarActions) => {
  switch (action.type) {
    case ActionTypes.switchView:
      return { ...state, view: action.payload };

    case ActionTypes.setMonth:
      return { ...state, activeMonth: action.payload };

    case ActionTypes.changeMonth:
      const currentMonth = state.activeMonth;
      const currentYear = state.activeYear;
      if (action.payload === 'increment') {
        if (currentMonth < 12) {
          return { ...state, activeMonth: currentMonth + 1 };
        }
        if (currentYear < MAX_YEAR) {
          return { ...state, activeMonth: 1, activeYear: currentYear + 1 };
        }
        return state;
      }
      if (currentMonth > 1) {
        return { ...state, activeMonth: currentMonth - 1 };
      }
      if (currentYear > MIN_YEAR) {
        return { ...state, activeMonth: 12, activeYear: currentYear - 1 };
      }
      return state;

    case ActionTypes.setYear:
      return { ...state, activeYear: action.payload };

    default:
      return state;
  }
};
