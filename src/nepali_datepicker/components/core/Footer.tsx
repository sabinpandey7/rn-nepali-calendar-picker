import { Platform, Pressable, Text, View } from 'react-native';
import { theme } from '../utlis/colors';

function Footer({
  onApply,
  onClose,
}: {
  onApply: () => any;
  onClose: () => any;
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
