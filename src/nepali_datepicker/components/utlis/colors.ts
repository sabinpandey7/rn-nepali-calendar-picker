import { Platform } from 'react-native';

export type ColorSchemeName = 'light' | 'dark';

export interface CalendarTheme {
  /** Surface the calendar / picker sheet sits on. */
  backgroundColor: string;
  /** Default text color for day numbers, month label and years. */
  textColor: string;
  /** Accent used for the selected day fill, selected year fill and footer actions. */
  primary: string;
  /** Text/icon color drawn on top of `primary`. */
  onPrimary: string;
  /** Fill for days that fall inside a selected range. */
  rangeBackground: string;
  /** Fill behind today's outlined circle. */
  todayBackground: string;
  /** Text color for days outside min/max bounds. */
  disabledTextColor: string;
  /** Text color of the S M T W T F S header row. */
  weekdayTextColor: string;
  /** Tint applied to the prev/next/dropdown arrow icons. */
  iconColor: string;
  /** Hairlines and dividers, e.g. the Android picker header. */
  borderColor: string;
  /** Scrim behind the modal picker. */
  backdropColor: string;
}

/** Platform families the default palettes are authored for. */
export type ThemePlatform = 'ios' | 'android';

/**
 * Accepted by the `theme` prop. Keys at the top level apply to both color
 * schemes; the `light` / `dark` sub-objects override only that scheme.
 */
export type CalendarThemeInput = Partial<CalendarTheme> & {
  light?: Partial<CalendarTheme>;
  dark?: Partial<CalendarTheme>;
};

const iosLight: CalendarTheme = {
  backgroundColor: 'white',
  textColor: '#020202',
  primary: '#3997F5',
  onPrimary: '#FFFFFF',
  rangeBackground: '#D9ECFF',
  todayBackground: 'white',
  disabledTextColor: 'grey',
  weekdayTextColor: 'darkgrey',
  iconColor: '#020202',
  borderColor: '#C6C6C8',
  backdropColor: 'rgba(52, 52, 52, 0.5)',
};

const iosDark: CalendarTheme = {
  backgroundColor: '#1C1C1E',
  textColor: '#FFFFFF',
  primary: '#0A84FF',
  onPrimary: '#FFFFFF',
  rangeBackground: '#1F3A5F',
  todayBackground: '#1C1C1E',
  disabledTextColor: '#636366',
  weekdayTextColor: '#8E8E93',
  iconColor: '#FFFFFF',
  borderColor: '#38383A',
  backdropColor: 'rgba(0, 0, 0, 0.6)',
};

const androidLight: CalendarTheme = {
  backgroundColor: '#ECE6EE',
  textColor: '#1D1B20',
  primary: '#6750A4',
  onPrimary: '#FFFFFF',
  rangeBackground: '#ECE0FD',
  todayBackground: '#ECE6EE',
  disabledTextColor: '#AEA9B4',
  weekdayTextColor: '#1D1B20',
  iconColor: '#1D1B20',
  borderColor: '#CAC4D0',
  backdropColor: 'rgba(52, 52, 52, 0.5)',
};

const androidDark: CalendarTheme = {
  backgroundColor: '#211F26',
  textColor: '#E6E0E9',
  primary: '#D0BCFF',
  onPrimary: '#381E72',
  rangeBackground: '#4F378B',
  todayBackground: '#211F26',
  disabledTextColor: '#938F99',
  weekdayTextColor: '#CAC4D0',
  iconColor: '#E6E0E9',
  borderColor: '#49454F',
  backdropColor: 'rgba(0, 0, 0, 0.6)',
};

export const defaultThemes: Record<
  ThemePlatform,
  Record<ColorSchemeName, CalendarTheme>
> = {
  ios: { light: iosLight, dark: iosDark },
  android: { light: androidLight, dark: androidDark },
};

/** iOS and macOS share the Cupertino palette, everything else gets Material. */
export const getThemePlatform = (): ThemePlatform =>
  Platform.OS === 'ios' || Platform.OS === 'macos' ? 'ios' : 'android';

/**
 * Builds the palette actually used at render time: platform default for the
 * given scheme, with the consumer's overrides layered on top.
 */
export const resolveTheme = (
  scheme: ColorSchemeName,
  override?: CalendarThemeInput,
  platform: ThemePlatform = getThemePlatform()
): CalendarTheme => {
  const base = defaultThemes[platform][scheme];
  if (!override) {
    return base;
  }
  const { light, dark, ...shared } = override;
  return {
    ...base,
    ...shared,
    ...(scheme === 'dark' ? dark : light),
  };
};

/**
 * @deprecated Read colors from `useTheme()` instead. Kept so existing deep
 * imports of the light palette keep compiling.
 */
export const theme: Record<typeof Platform.OS, CalendarTheme> = {
  ios: iosLight,
  macos: iosLight,
  android: androidLight,
  web: androidLight,
  windows: androidLight,
};
