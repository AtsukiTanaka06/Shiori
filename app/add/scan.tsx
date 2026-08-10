import { View, Text, StyleSheet } from 'react-native';

/**
 * バーコードスキャン画面
 * TODO Phase 4: Expo Camera でバーコード読み取り・ISBN取得実装
 */
export default function ScanScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>バーコードスキャン（Phase 4 で実装）</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  placeholder: {
    color: '#999',
    fontSize: 16,
  },
});
