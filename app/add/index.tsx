import { View, Text, StyleSheet } from 'react-native';

/**
 * 本を追加 — 登録方法選択画面
 * TODO Phase 4: バーコードスキャン / 本を検索 の選択実装
 */
export default function AddIndexScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>本を追加（Phase 4 で実装）</Text>
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
