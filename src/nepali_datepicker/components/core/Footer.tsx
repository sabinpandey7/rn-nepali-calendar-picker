import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
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
  mode: 'single' | 'multi' | 'range';
}) {
  const OS = Platform.OS === 'ios' ? 'ios' : 'android';

  return (
    <View
      style={{
        justifyContent: OS !== 'ios' ? 'flex-end' : 'space-between',
        flexDirection: 'row',
        marginTop: 'auto',
        marginBottom: 16,
        paddingHorizontal: 16,
        gap: 16,
      }}
    >
      {mode === 'multi' && (
        <Pressable onPress={onClear} style={styles.btn}>
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
      <Pressable onPress={onClose} style={styles.btn}>
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
        style={styles.btn}
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

const styles = StyleSheet.create({
  btn: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
});
