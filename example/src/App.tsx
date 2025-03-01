import { Datepicker, NepaliDate } from 'rn-nepali-calendar-picker';
import { Text, StyleSheet, SafeAreaView, Button } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [nepali_date, setNepaliDate] = useState<NepaliDate>(new NepaliDate());
  const [nepali_dates, setNepaliDates] = useState<NepaliDate[]>([]);
  const [dates_range, setDateRange] = useState<NepaliDate[]>([]);

  const [open, setOpen] = useState<boolean>(false);
  const [openMulti, setOpenMulti] = useState<boolean>(false);
  const [openRange, setOpenRange] = useState<boolean>(false);

  return (
    <SafeAreaView style={styles.screen}>
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
