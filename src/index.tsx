import Datepicker from './nepali_datepicker/components/Datepicker';
import NepaliDate from './lib/nepali_date/nepali_date';
import Calendar from './nepali_datepicker/components/core/Calendar';
import { useTheme } from './nepali_datepicker/components/context/ThemeContext';
import {
  defaultThemes,
  resolveTheme,
} from './nepali_datepicker/components/utlis/colors';

export type {
  IHighlights,
  IEvent,
} from './nepali_datepicker/components/core/Day';

export type {
  CalendarTheme,
  CalendarThemeInput,
  ColorSchemeName,
  ThemePlatform,
} from './nepali_datepicker/components/utlis/colors';

export {
  Datepicker,
  Calendar,
  NepaliDate,
  useTheme,
  defaultThemes,
  resolveTheme,
};
