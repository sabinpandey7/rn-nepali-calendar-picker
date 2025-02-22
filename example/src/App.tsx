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
      <Button title="Open Datepicker" onPress={() => setOpen(true)} />
      <Datepicker
        open={open}
        onApply={(new_date) => setDate(new_date.ad_date)}
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
