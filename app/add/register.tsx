import { View, Text, StyleSheet } from 'react-native';

/**
 * 書籍情報確認・登録画面
 * TODO Phase 4: 書籍情報表示・読書情報入力・Supabase登録実装
 */
export default function RegisterScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>書籍情報・登録（Phase 4 で実装）</Text>
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
