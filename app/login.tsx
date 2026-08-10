import { View, Text, StyleSheet } from 'react-native';

/**
 * ログイン画面
 * TODO Phase 2: Supabase Auth / Sign in with Apple 実装
 */
export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>ログイン（Phase 2 で実装）</Text>
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
