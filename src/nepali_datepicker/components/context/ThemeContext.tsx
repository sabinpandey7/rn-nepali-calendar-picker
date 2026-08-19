import {
  type PropsWithChildren,
  createContext,
  useContext,
  useMemo,
} from 'react';
import { useColorScheme } from 'react-native';
import {
  type CalendarTheme,
  type CalendarThemeInput,
  type ColorSchemeName,
  resolveTheme,
} from '../utlis/colors';

export interface ThemeProps {
  /**
   * Color overrides for the calendar. Top level keys apply to both schemes,
   * `light` / `dark` sub-objects override a single scheme.
   */
  theme?: CalendarThemeInput;
  /**
   * Forces a color scheme. Omit to follow the OS appearance setting.
   */
  colorScheme?: ColorSchemeName;
}

const ThemeContext = createContext<CalendarTheme>(resolveTheme('light'));

const ThemeProvider = ({
  children,
  theme,
  colorScheme,
}: PropsWithChildren<ThemeProps>) => {
  const systemScheme = useColorScheme();
  const scheme: ColorSchemeName =
    colorScheme ?? (systemScheme === 'dark' ? 'dark' : 'light');

  const value = useMemo(() => resolveTheme(scheme, theme), [scheme, theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

/** Resolved palette for the nearest `ThemeProvider` (platform defaults if none). */
export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider;
