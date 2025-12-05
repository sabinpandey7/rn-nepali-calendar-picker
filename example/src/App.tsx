import { Calendar, Datepicker, NepaliDate } from 'rn-nepali-calendar-picker';
import { Text, StyleSheet, Button, ScrollView } from 'react-native';
import { useState } from 'react';

const events = [
  {
    name: 'Conference',
    date: new NepaliDate('2082-07-01'),
    endDate: new NepaliDate('2082-07-03'),
    color: 'red',
  },
  {
    name: 'Birthday Party ',
    date: new NepaliDate('2082-07-01'),
    endDate: new NepaliDate('2082-07-03'),
    color: 'blue',
  },

  {
    name: 'bithday',
    date: new NepaliDate('2082-07-29'),
    color: 'green',
  },
  {
    name: 'Conference Day-3',
    date: new NepaliDate('2082-07-30'),
    color: 'grenn',
  },
];

export default function App() {
  const [nepali_date, setNepaliDate] = useState<NepaliDate>(new NepaliDate());
  const [nepali_dates, setNepaliDates] = useState<NepaliDate[]>([]);
  const [dates_range, setDateRange] = useState<NepaliDate[]>([]);

  const [open, setOpen] = useState<boolean>(false);
  const [openMulti, setOpenMulti] = useState<boolean>(false);
  const [openRange, setOpenRange] = useState<boolean>(false);

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text>{nepali_date.toString()}</Text>
      <Button title="Open Datepicker" onPress={() => setOpen(true)} />
      <Datepicker
        open={open}
        onApply={(date) => setNepaliDate(date)}
        onClose={() => setOpen(false)}
        date={nepali_date}
        mode="single"
        lang="np"
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
      <Text>Range Picker</Text>
      {dates_range?.map((value, index) => (
        <Text key={index}>{value.toString()}</Text>
      ))}
      <Button
        title="Open Range Datepicker"
        onPress={() => setOpenRange(true)}
      />
      <Datepicker
        open={openRange}
        onApply={(dates) => setDateRange(dates)}
        onClose={() => setOpenRange(false)}
        dates={dates_range}
        mode="range"
        minDate={new NepaliDate()}
      />

      {/*raw  calendar with events dot marking  */}
      <Calendar
        lang="np"
        date={nepali_date}
        events={events}
        onDateSelect={(date) => setNepaliDate(date)}
        onDisplayMonthChange={(month, year) => console.log(month, year)} // when active month change
        disableYearSelector
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    gap: 16,
    paddingTop: 100,
    padding: 16,
    paddingBottom: 40,
  },
});
