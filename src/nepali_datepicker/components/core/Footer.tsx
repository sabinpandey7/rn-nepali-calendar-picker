import { Platform, Pressable, Text, View } from 'react-native';
import { theme } from '../utlis/colors';

function Footer({
  onApply,
  onClose,
  onClear,
  mode,
}: {
  onApply: () => any;
  onClose: () => any;
  onClear: () => any;
  mode: 'single' | 'multi';
}) {
  const OS = Platform.OS === 'ios' ? 'ios' : 'android';

  return (
    <View
      style={{
        justifyContent: OS !== 'ios' ? 'flex-end' : 'space-between',
        flexDirection: 'row',
        marginTop: 'auto',
        paddingBottom: 16,
        paddingHorizontal: 16,
        gap: 32,
      }}
    >
      {mode === 'multi' && (
        <Pressable onPress={onClear}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 500,
              color: theme[OS].primary,
            }}
          >
            Clear
          </Text>
        </Pressable>
      )}
      <Pressable onPress={onClose}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 500,
            color: theme[OS].primary,
          }}
        >
          Cancel
        </Text>
      </Pressable>
      <Pressable
        onPress={() => {
          onApply();
          onClose();
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: 500,
            color: theme[OS].primary,
          }}
        >
          Confirm
        </Text>
      </Pressable>
    </View>
  );
}

export default Footer;
