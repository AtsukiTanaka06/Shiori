import { View, Text, StyleSheet } from 'react-native';

/**
 * 本棚画面
 * TODO Phase 5: リスト表示・グリッド表示・ステータスフィルター実装
 */
export default function BookshelfScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>本棚（Phase 5 で実装）</Text>
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
