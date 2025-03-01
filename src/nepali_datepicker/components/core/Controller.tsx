import {
  Pressable,
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';
import { ActionTypes } from '../context/CalendarReducer';
import { theme } from '../utlis/colors';
import { nomenclature } from '../../../lib/nepali_date/data/calendar';
import { useContext } from 'react';
import { CalendarContext } from '../context/CalendarContext';
import { format_numeral } from '../../../lib/nepali_date/helper';
const left_icon = require('../../../assets/arrow_left_android.png');
const left_icon_ios = require('../../../assets//arrow_left_ios.png');
const right_icon = require('../../../assets//arrow_right_android.png');
const right_icon_ios = require('../../../assets//arrow_right_ios.png');

interface ControllerProps {
  activeMonth: number;
  onPressNext: () => void;
  onPressPrev: () => void;
}

function Controller({
  activeMonth,
  onPressNext,
  onPressPrev,
}: ControllerProps) {
  const {
    state: { activeYear, view },
    lang,
    dispatch,
  } = useContext(CalendarContext);

  const OS = Platform.OS === 'ios' ? 'ios' : 'android';
  return (
    <View style={styles.controller}>
      <Pressable
        onPress={() =>
          dispatch({
            type: ActionTypes.switchView,
            payload: view === 'day' ? 'year' : 'day',
          })
        }
        style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: theme[OS]?.textColor || 'black',
          }}
        >
          {nomenclature[lang].month.long[activeMonth - 1]}{' '}
          {format_numeral(activeYear.toString(), lang)}
        </Text>
        <Image
          source={OS !== 'ios' ? left_icon : left_icon_ios}
          style={{
            ...styles.icon,
            transform: [{ rotate: '270deg' }],
          }}
        />
      </Pressable>
      <View style={{ flexDirection: 'row' }}>
        <Pressable onPress={onPressPrev}>
          <Image
            source={OS !== 'ios' ? left_icon : left_icon_ios}
            style={styles.icon}
          />
        </Pressable>
        <Pressable onPress={onPressNext}>
          <Image
            source={OS !== 'ios' ? right_icon : right_icon_ios}
            style={styles.icon}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  controller: {
    padding: 16,
    paddingBottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default Controller;
