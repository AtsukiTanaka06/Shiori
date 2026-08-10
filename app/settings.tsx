import { View, Text, StyleSheet } from 'react-native';

/**
 * 設定画面
 * TODO Phase 7: アカウント情報・ログアウト・アカウント削除実装
 */
export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>設定（Phase 7 で実装）</Text>
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
