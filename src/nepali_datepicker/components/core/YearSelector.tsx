import { FlatList, type ListRenderItemInfo } from 'react-native';
import { memo, useCallback } from 'react';
import Year from './Year';
import { calendarData } from '../../../lib/nepali_date/data/calendar';

const YearSelector = ({ selectedYear }: { selectedYear: number }) => {
  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<string>) => (
      <Year
        isSelected={selectedYear === Number.parseInt(item, 10)}
        year={Number.parseInt(item, 10)}
      />
    ),
    [selectedYear]
  );

  return (
    <FlatList
      numColumns={3}
      showsVerticalScrollIndicator={false}
      style={{ marginVertical: 16 }}
      data={Object.keys(calendarData)}
      keyExtractor={(item) => item}
      initialScrollIndex={(selectedYear - 1975) / 3 - 3}
      getItemLayout={(_, index) => ({
        length: 52,
        offset: 52 * index,
        index,
      })}
      renderItem={renderItem}
    />
  );
};

export default memo(YearSelector);
