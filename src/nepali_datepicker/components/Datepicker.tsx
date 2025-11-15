import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { memo, useCallback, useEffect, useState } from 'react';
import { PickerCalendar, type ICalendarProps } from './core/Calendar';
import NepaliDate from '../../lib/nepali_date/nepali_date';
import { theme } from './utlis/colors';
import Footer from './core/Footer';

interface SingleNepaliDatePickerProps
  extends Omit<ICalendarProps, 'onDateSelect' | 'lang'> {
  lang?: 'en' | 'np';
  open: boolean;
  onApply: (date: NepaliDate) => void;
  onClose: () => any;
  mode: 'single';
}

interface MultiNepaliDatePickerProps
  extends Omit<ICalendarProps, 'onDateSelect' | 'lang'> {
  lang?: 'en' | 'np';
  open: boolean;
  mode: 'multi' | 'range';
  onClose: () => any;
  onApply: (dates: Array<NepaliDate>) => void;
}

export type NepaliDatePickerProps =
  | SingleNepaliDatePickerProps
  | MultiNepaliDatePickerProps;

const Datepicker = ({
  open,
  date = new NepaliDate(),
  onApply,
  onClose,
  minDate,
  maxDate,
  mode,
  dates = [],
  lang = 'en',
}: NepaliDatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<NepaliDate>(date);
  const [selectedDates, setSelectedDates] = useState(dates);

  const OS = Platform.OS === 'ios' ? 'ios' : 'android';

  const { width } = useWindowDimensions();
  const [load, setLoad] = useState<boolean>(false);
  useEffect(() => {
    if (!open) {
      setLoad(false);
    }
  }, [open]);

  const onDateSelect = useCallback(
    (new_date: NepaliDate) => {
      if (mode === 'multi') {
        setSelectedDates((p) => {
          if (p.findIndex((item) => item.isEqual(new_date)) > -1) {
            return p.filter((item) => !item.isEqual(new_date));
          } else {
            return [...p, new_date];
          }
        });
      } else if (mode === 'range') {
        setSelectedDates((p) => {
          if (p.length === 0) {
            return [new_date];
          } else if (p.length === 1) {
            if (p[0]?.isSmaller(new_date)) {
              return [new_date];
            }
            return [...p, new_date];
          }
          return [new_date];
        });
      } else {
        setSelectedDate(new_date);
      }
    },
    [mode]
  );

  const onClear = useCallback(() => {
    setSelectedDates([]);
  }, []);
  return (
    <Modal
      visible={open}
      animationType="fade"
      onShow={() => setLoad(true)}
      onRequestClose={() => {
        onClose();
        setLoad(false);
      }}
      transparent
    >
      {load && (
        <View
          style={{
            ...styles.screen,
            justifyContent: OS === 'ios' ? 'flex-end' : 'center',
          }}
        >
          <View
            style={[
              styles.pickerContainer,
              {
                backgroundColor: theme[OS].backgroundColor || 'white',
                flexDirection: width > 700 ? 'row' : 'column',
                maxHeight: OS === 'ios' ? 420 : 540,
              },
            ]}
          >
            {OS === 'android' && (
              <View style={styles.header}>
                <Text style={{ fontSize: 14, fontWeight: 500 }}>
                  Select Date
                </Text>
                <Text style={{ fontSize: 28, fontWeight: 400 }}>
                  {selectedDate.toFormat('W, MMMM DD', lang)}
                </Text>
              </View>
            )}
            <View
              style={{
                ...styles.calendarContainer,
                flex: width < 700 ? 1 : undefined,
                height: width > 700 ? '100%' : undefined,
              }}
            >
              <PickerCalendar
                date={selectedDate}
                minDate={minDate}
                maxDate={maxDate}
                mode={mode}
                dates={selectedDates}
                onDateSelect={onDateSelect}
                lang={lang}
              />
              <Footer
                onClear={onClear}
                mode={mode}
                onApply={() => {
                  if (mode === 'single') {
                    onApply(selectedDate);
                  } else {
                    onApply(selectedDates);
                  }
                }}
                onClose={onClose}
              />
            </View>
          </View>
        </View>
      )}
    </Modal>
  );
};

export default memo(Datepicker);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
    paddingVertical: 16,
    paddingBottom: Platform.OS === 'ios' ? 64 : 16,
  },
  pickerContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    elevation: 12,
  },
  calendarContainer: {
    width: 320,

    // height: "100%",
  },
  header: {
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderColor: '#CAC4D0',
    padding: 16,
    gap: 16,
  },
});
