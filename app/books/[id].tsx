import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

/**
 * 本の詳細画面
 * TODO Phase 6: 書籍情報・読書情報表示・編集・削除実装
 */
export default function BookDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>本の詳細: {id}（Phase 6 で実装）</Text>
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
