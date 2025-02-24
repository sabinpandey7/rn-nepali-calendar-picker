import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { memo, useEffect, useState } from 'react';
import Calendar from './core/Calendar';
import NepaliDate from '../../lib/nepali_date/nepali_date';
import { theme } from './utlis/colors';
import Footer from './core/Footer';

export interface NepaliDatePickerProps {
  open: boolean;
  date: NepaliDate;
  onApply: (date: NepaliDate) => void;
  onClose: () => any;
  minDate?: NepaliDate;
  maxDate?: NepaliDate;
}

const Datepicker = ({
  open,
  date,
  onApply,
  onClose,
  minDate,
  maxDate,
}: NepaliDatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState(date);

  const OS = Platform.OS === 'ios' ? 'ios' : 'android';

  const { width } = useWindowDimensions();
  const [load, setLoad] = useState<boolean>(false);
  useEffect(() => {
    if (!open) {
      setLoad(false);
    }
  }, [open]);

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
                maxHeight: OS === 'ios' ? 400 : 500,
              },
            ]}
          >
            {OS === 'android' && (
              <View style={styles.header}>
                <Text style={{ fontSize: 14, fontWeight: 500 }}>
                  Select Date
                </Text>
                <Text style={{ fontSize: 28, fontWeight: 400 }}>
                  {selectedDate.toFormat('W, MMMM DD')}
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
              <Calendar
                date={selectedDate}
                minDate={minDate}
                maxDate={maxDate}
                onDateSelect={(d) => setSelectedDate(d)}
              />
              <Footer onApply={() => onApply(selectedDate)} onClose={onClose} />
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
