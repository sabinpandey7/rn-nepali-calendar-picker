# rn-nepali-calendar-picker

# 📅 React Native Nepali Datepicker

**rn-nepali-calendar-picker** is a React Native library for selecting dates in the **Nepali Bikram Sambat (BS) calendar**. It provides a date picker component and utilities for BS-AD date conversion.

Using **npm**:

```sh
npm install rn-nepali-calendar-picker

```

## Usage

```js
import { Datepicker, NepaliDate } from 'rn-nepali-calendar-picker';
import { Text, StyleSheet, SafeAreaView, Button } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [nepali_date, setNepaliDate] = useState<NepaliDate>(new NepaliDate());
  const [nepali_dates, setNepaliDates] = useState<NepaliDate[]>([]);

  const [open, setOpen] = useState<boolean>(false);
  const [openMulti, setOpenMulti] = useState<boolean>(false);

  return (
    <SafeAreaView style={styles.screen}>
      <Text>{nepali_date.toFormat('WW,YYYY MMMM DD')}</Text>
      <Text>{nepali_date.ad_date.toDateString()}</Text>
      <Button title="Open Datepicker" onPress={() => setOpen(true)} />
      <Datepicker
        open={open}
        onApply={(date) => setNepaliDate(date)}
        onClose={() => setOpen(false)}
        date={nepali_date}
        mode="single"
        minDate={new NepaliDate()}
      />
      <Text>Multples Dates</Text>
      {nepali_dates?.map((value, index) => (
        <Text key={index}>{value.toString()}</Text>
      ))}
      <Button
        title="Open Multi Datepicker"
        onPress={() => setOpenMulti(true)}
      />
      <Datepicker
        open={openMulti}
        onApply={(dates) => setNepaliDates(dates)}
        onClose={() => setOpenMulti(false)}
        dates={nepali_dates}
        mode="multi"
        minDate={new NepaliDate()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 16,
  },
});

```

## ⚙️ Props

The `<Datepicker />` component accepts the following props:

| Prop Name     | Type                                       | Required | Default  | Description                                                                                                              |
| ------------- | ------------------------------------------ | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------ |
| `open`        | `boolean`                                  | ✅       | `false`  | Controls the visibility of the datepicker. Set `true` to open.                                                           |
| `onApply`     | `(date: NepaliDate\|NepaliDate[]) => void` | ✅       | -        | Callback function after clicking confirm . This returned Nepali Date Object or array of Nepali Date object based on mode |
| `onClose`     | `() => void`                               | ✅       | -        | Callback function triggered when the datepicker is closed.                                                               |
| `mode`        | `single \| multi \| range`                 |          | `single` | Datepicker mode                                                                                                          |
| `lang`        | `en \| np`                                 |          | `en`     | lang mode                                                                                                                |
| `date`        | `NepaliDate`                               |          | -        | Initial selected date in **Bikram Sambat (BS)** format.                                                                  |
| `dates`       | `NepaliDate[]`                             |          | []       | Intial selected dates for multi mode                                                                                     |
| `minDate`     | `NepaliDate`                               |          | -        | Min Date                                                                                                                 |
| `maxDate`     | `NepaliDate`                               |          | -        | Max Date                                                                                                                 |
| `theme`       | `CalendarThemeInput`                       |          | -        | Color overrides, see [Theming](#-theming)                                                                                |
| `colorScheme` | `light \| dark`                            |          | -        | Forces a color scheme. Omit to follow the OS appearance setting.                                                         |
| `highlights`  | `Record<string, string>`                   |          | -        | Per-date text colors, see [Highlights](#-highlights)                                                                     |

`<Calendar />` accepts the same `theme` / `colorScheme` props, plus `events`, `onDateSelect`, `onDisplayMonthChange` and `disableYearSelector`.

## 🖍️ Highlights

`highlights` maps a date to a color and paints that day cell with it instead of
`theme.textColor` — useful for holidays, festivals or any date that needs to stand out.

```jsx
<Calendar
  highlights={{
    '2082-01-01': '#DC143C', // Naya Barsha
    '2082-06-15': '#DC143C', // Ghatasthapana
    '2082-06-24': '#E07B00',
  }}
/>
```

The date string is the same `YYYY-MM-DD` **BS** format `NepaliDate.toString()` returns;
single-digit months and days (`2082-1-1`) are accepted too. An entry that isn't a date
is skipped with a dev-mode warning rather than throwing.

Two states still win over a highlight, because the highlight color would be
unreadable or misleading there:

1. **Disabled** days (outside `minDate` / `maxDate`) keep `theme.disabledTextColor`.
2. **Selected** days keep `theme.onPrimary`, since the cell is filled with `theme.primary`.

Everything else falls through to the highlight color, then to `theme.textColor`.

## 🎨 Theming

By default the calendar paints itself like the host OS: Cupertino colors on iOS/macOS,
Material 3 colors elsewhere, and it follows the system light/dark setting via
`useColorScheme()`. No props are needed for that.

Pass `theme` to override any of the color tokens. Keys at the top level apply to
both schemes; the `light` / `dark` sub-objects override a single scheme.

```jsx
<Datepicker
  open={open}
  onApply={setNepaliDate}
  onClose={() => setOpen(false)}
  theme={{
    primary: '#DC143C', // both schemes
    light: { rangeBackground: '#FFE1E6' },
    dark: { rangeBackground: '#5A1B26' },
  }}
/>
```

Set `colorScheme` to pin the calendar to one scheme regardless of the OS setting:

```jsx
<Calendar colorScheme="dark" />
```

### Color tokens

| Token               | Description                                              |
| ------------------- | -------------------------------------------------------- |
| `backgroundColor`   | Surface the calendar / picker sheet sits on              |
| `textColor`         | Day numbers, month label and years                       |
| `primary`           | Selected day fill, selected year fill and footer actions |
| `onPrimary`         | Text/icon drawn on top of `primary`                      |
| `rangeBackground`   | Fill for days inside a selected range                    |
| `todayBackground`   | Fill behind today's outlined circle                      |
| `disabledTextColor` | Days outside the `minDate` / `maxDate` bounds            |
| `weekdayTextColor`  | The S M T W T F S header row                             |
| `iconColor`         | Prev/next/dropdown arrow icons                           |
| `borderColor`       | Hairlines and dividers                                   |
| `backdropColor`     | Scrim behind the modal picker                            |

The defaults are exported as `defaultThemes` (keyed by `ios` / `android`, then
`light` / `dark`) if you want to build a palette on top of them. `resolveTheme(scheme, override)`
returns the fully merged palette, and `useTheme()` reads the active one from
inside a custom child component.

## 📖 NepaliDate Class

The `NepaliDate` class helps in creating and managing Nepali (Bikram Sambat) dates. It provides utility methods to convert between **BS and AD**, format dates, and manipulate them.

```tsx
import { NepaliDate } from 'rn-nepali-calendar-picker';

const date1 = new NepaliDate(); // Initializes with the current Nepali date
const date2 = new NepaliDate('2080-12-15'); // Initializes using BS date string currently support yyyy-mm-dd only
const date3 = new NepaliDate(2080, 11, 15); // Initializes using year, month, and day
```

### 📌 Methods

| Method Name               | Return Type                                     | Description                                                   |
| ------------------------- | ----------------------------------------------- | ------------------------------------------------------------- |
| `getDay()`                | `number`                                        | Returns the day of the week (0 = Sunday, 6 = Saturday).       |
| `getDateObject()`         | `{ year: number, month: number, date: number }` | Returns an object containing year, month, and day.            |
| `getYear()`               | `number`                                        | Returns the BS year.                                          |
| `setYear(year: number)`   | `void`                                          | Sets the BS year.                                             |
| `getMonth()`              | `number`                                        | Returns the BS month (0 = Baisakh, 11 = Chaitra).             |
| `setMonth(month: number)` | `void`                                          | Sets the BS month.                                            |
| `getDate()`               | `number`                                        | Returns the BS date (day of the month).                       |
| `setDate(date: number)`   | `void`                                          | Sets the BS date.                                             |
| `toString()`              | `string`                                        | Returns the BS date as a formatted string (`YYYY-MM-DD`).     |
| `toAdString()`            | `string`                                        | Returns the corresponding AD date as a string (`YYYY-MM-DD`). |

##### USAGE

```tsx
const nepaliDate = new NepaliDate('2080-12-15');

console.log(nepaliDate.getYear()); // 2080
console.log(nepaliDate.getMonth()); // 11
console.log(nepaliDate.getDate()); // 15
console.log(nepaliDate.toString()); // "2080-12-15"
console.log(nepaliDate.toAdString()); // "2024-03-28"

const jsDate = new Date('2025-02-03');
const convertedNepaliDate = NepaliDate.fromJSDate(jsDate);

console.log(convertedNepaliDate.toString()); // Example: "2081-10-20"
```

### toFormat Method

Formats a **Nepali (BS) date** into a **custom format** and supports both **English** and **Nepali** languages.

```tsx
const nepaliDate = new NepaliDate(2080, 11, 15);

console.log(nepaliDate.toFormat());
// Output: "2080-12-15" (default format)

console.log(nepaliDate.toFormat('YYYY MMMM DD', 'en'));
// Output: "2080 Chaitra 15"

console.log(nepaliDate.toFormat('YYYY MMMM DD', 'np'));
// Output: "२०८० चैत्र १५"
```

### 📌 Date Format Patterns

| Pattern | Meaning                               |
| ------- | ------------------------------------- |
| `YYYY`  | Full BS year (e.g., 2080)             |
| `YY`    | Last two digits of BS year (e.g., 80) |
| `MMMM`  | Full month name (e.g., Baisakh)       |
| `MM`    | Month number (01-12)                  |
| `DD`    | Day of the month (01-32)              |
| `WW`    | Full day name (e.g., Sunday)          |
| `W`     | Short day name (e.g., Sun)            |

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
