# rn-nepali-date-picker

# 📅 React Native Nepali Datepicker

**rn-nepali-date-picker** is a React Native library for selecting dates in the **Nepali Bikram Sambat (BS) calendar**. It provides a date picker component and utilities for BS-AD date conversion.

Using **npm**:

```sh
npm install rn-nepali-date-picker

```

## Usage

```js
import { Datepicker, NepaliDate } from 'rn-nepali-date-picker';
import { Text, StyleSheet, SafeAreaView, Button } from 'react-native';
import { useMemo, useState } from 'react';

export default function App() {
  const [date, setDate] = useState(new Date('2025-02-03'));

  const [open, setOpen] = useState(false);
  const nepali_date = useMemo(() => NepaliDate.fromJSDate(date), [date]);

  return (
    <SafeAreaView style={styles.screen}>
      <Text>{nepali_date.toFormat('WW,YYYY MMMM DD')}</Text>
      <Text>{nepali_date.ad_date.toDateString()}</Text>
      <Button title="Open Datepicker" onPress={() => setOpen(true)}></Button>
      <Datepicker
        open={open}
        onApply={(date) => setDate(date.ad_date)}
        onClose={() => setOpen(false)}
        date={nepali_date}
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
  },
});
```

## ⚙️ Props

The `<Datepicker />` component accepts the following props:

| Prop Name | Type                         | Required | Default | Description                                                                |
| --------- | ---------------------------- | -------- | ------- | -------------------------------------------------------------------------- |
| `open`    | `boolean`                    | ✅       | `false` | Controls the visibility of the datepicker. Set `true` to open.             |
| `onApply` | `(date: NepaliDate) => void` | ✅       | -       | Callback function when a date is selected. The returned Nepali Date Object |
| `onClose` | `() => void`                 | ✅       | -       | Callback function triggered when the datepicker is closed.                 |
| `date`    | `NepaliDate`                 | ✅       | -       | Initial selected date in **Bikram Sambat (BS)** format.                    |

## 📖 NepaliDate Class

The `NepaliDate` class helps in creating and managing Nepali (Bikram Sambat) dates. It provides utility methods to convert between **BS and AD**, format dates, and manipulate them.

```tsx
import { NepaliDate } from 'rn-nepali-date-picker';

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
