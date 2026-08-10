import { View, Text, StyleSheet } from 'react-native';

/**
 * 本の検索画面
 * TODO Phase 4: タイトル・著者・ISBN 検索実装
 */
export default function SearchScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>本を検索（Phase 4 で実装）</Text>
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
