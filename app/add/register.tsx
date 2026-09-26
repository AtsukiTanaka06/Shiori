import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, Spacing, Radius, FontSize, Shadow } from '../../src/constants/design';
import { useBookRegistration } from '../../src/hooks/useBookRegistration';
import type { ReadingStatus } from '../../src/types';

const STATUS_OPTIONS: { value: ReadingStatus; label: string }[] = [
  { value: 'to_read', label: 'これから読む' },
  { value: 'reading', label: '読書中' },
  { value: 'finished', label: '読了' },
];

export default function RegisterScreen() {
  const router = useRouter();
  const { pendingBook, status, setStatus, register, isLoading } = useBookRegistration();

  if (!pendingBook) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>書籍情報がありません</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>戻る</Text>
        </TouchableOpacity>
      </View>
    );
  }

  async function handleRegister() {
    try {
      const { alreadyRegistered } = await register();
      if (alreadyRegistered) {
        Alert.alert('すでに登録済みです', 'この本はすでに本棚に追加されています。', [
          { text: '本棚を見る', onPress: () => router.replace('/bookshelf') },
          { text: '閉じる', style: 'cancel', onPress: () => router.back() },
        ]);
        return;
      }
      Alert.alert('登録しました', `「${pendingBook?.title}」を本棚に追加しました。`, [
        { text: '本棚を見る', onPress: () => router.replace('/bookshelf') },
      ]);
    } catch {
      Alert.alert('エラー', '登録に失敗しました。もう一度お試しください。');
    }
  }

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* 表紙 */}
        <View style={styles.coverWrap}>
          {pendingBook.coverImage ? (
            <Image
              source={{ uri: pendingBook.coverImage }}
              style={styles.cover}
              resizeMode="contain"
            />
          ) : (
            <View style={styles.coverPlaceholder}>
              <Text style={styles.coverPlaceholderText}>No Cover</Text>
            </View>
          )}
        </View>

        {/* 書籍情報 */}
        <View style={styles.bookInfo}>
          <Text style={styles.title}>{pendingBook.title}</Text>
          {pendingBook.authors.length > 0 && (
            <Text style={styles.authors}>{pendingBook.authors.join('・')}</Text>
          )}
          {pendingBook.publisher && (
            <Text style={styles.publisher}>{pendingBook.publisher}</Text>
          )}
        </View>

        {/* ステータス選択 */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>ステータス</Text>
          <View style={styles.statusRow}>
            {STATUS_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt.value}
                style={[styles.statusChip, status === opt.value && styles.statusChipSelected]}
                onPress={() => setStatus(opt.value)}
              >
                <Text
                  style={[
                    styles.statusChipText,
                    status === opt.value && styles.statusChipTextSelected,
                  ]}
                >
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* 登録ボタン */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.registerButton, isLoading && styles.registerButtonDisabled]}
          onPress={handleRegister}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={Colors.white} />
          ) : (
            <Text style={styles.registerButtonText}>本棚に追加する</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const COVER_HEIGHT = 220;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.ivory50,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.ivory50,
    padding: Spacing.s6,
  },
  scroll: {
    padding: Spacing.s5,
    paddingBottom: Spacing.s4,
  },
  coverWrap: {
    alignItems: 'center',
    marginBottom: Spacing.s6,
    ...Shadow.card,
  },
  cover: {
    width: 140,
    height: COVER_HEIGHT,
    borderRadius: 8,
  },
  coverPlaceholder: {
    width: 140,
    height: COVER_HEIGHT,
    borderRadius: 8,
    backgroundColor: Colors.sage100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverPlaceholderText: {
    color: Colors.ink400,
    fontSize: FontSize.bodySmall,
  },
  bookInfo: {
    alignItems: 'center',
    marginBottom: Spacing.s6,
    gap: Spacing.s2,
  },
  title: {
    fontSize: FontSize.title1,
    fontWeight: '600',
    color: Colors.ink900,
    textAlign: 'center',
  },
  authors: {
    fontSize: FontSize.body,
    color: Colors.ink600,
    textAlign: 'center',
  },
  publisher: {
    fontSize: FontSize.bodySmall,
    color: Colors.ink400,
    textAlign: 'center',
  },
  section: {
    marginBottom: Spacing.s6,
  },
  sectionLabel: {
    fontSize: FontSize.caption,
    color: Colors.ink400,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: Spacing.s3,
  },
  statusRow: {
    flexDirection: 'row',
    gap: Spacing.s3,
  },
  statusChip: {
    flex: 1,
    paddingVertical: Spacing.s3,
    paddingHorizontal: Spacing.s4,
    borderRadius: Radius.chip,
    borderWidth: 1,
    borderColor: Colors.line200,
    alignItems: 'center',
    minHeight: 44,
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  statusChipSelected: {
    backgroundColor: Colors.sage100,
    borderColor: Colors.sage500,
  },
  statusChipText: {
    fontSize: FontSize.body,
    color: Colors.ink600,
  },
  statusChipTextSelected: {
    color: Colors.sage600,
    fontWeight: '600',
  },
  footer: {
    padding: Spacing.s5,
    borderTopWidth: 1,
    borderTopColor: Colors.line200,
    backgroundColor: Colors.ivory50,
  },
  registerButton: {
    backgroundColor: Colors.sage500,
    borderRadius: Radius.button,
    paddingVertical: Spacing.s4,
    alignItems: 'center',
    minHeight: 52,
    justifyContent: 'center',
  },
  registerButtonDisabled: {
    backgroundColor: Colors.ink400,
  },
  registerButtonText: {
    color: Colors.white,
    fontSize: FontSize.body,
    fontWeight: '600',
  },
  errorText: {
    fontSize: FontSize.body,
    color: Colors.ink600,
    marginBottom: Spacing.s6,
  },
  backButton: {
    paddingVertical: Spacing.s3,
    paddingHorizontal: Spacing.s6,
  },
  backButtonText: {
    color: Colors.sage500,
    fontSize: FontSize.body,
  },
});
