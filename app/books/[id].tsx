import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, FontSize, Spacing, Radius, Shadow } from '../../src/constants/design';
import { useBookDetail } from '../../src/hooks/useBookDetail';
import type { ReadingStatus } from '../../src/types';

const STATUS_LABEL: Record<ReadingStatus, string> = {
  to_read: 'これから',
  reading: '読書中',
  finished: '読了',
};

const COVER_W = 120;
const COVER_H = 170;

/**
 * 本の詳細画面
 * 書籍情報・読書記録・日ごとの日記メモを表示する（編集・削除は Phase 6 の残タスク）
 */
export default function BookDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { book, record, diaryEntries, isLoading } = useBookDetail(id);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer} edges={['bottom']}>
        <ActivityIndicator size="large" color={Colors.sage500} />
      </SafeAreaView>
    );
  }

  if (!book) {
    return (
      <SafeAreaView style={styles.loadingContainer} edges={['bottom']}>
        <Text style={styles.emptyText}>本が見つかりませんでした</Text>
      </SafeAreaView>
    );
  }

  const badgeStyle =
    record?.status === 'finished'
      ? styles.badgeFinished
      : record?.status === 'reading'
        ? styles.badgeReading
        : styles.badgeToRead;
  const badgeTextStyle =
    record?.status === 'finished'
      ? styles.badgeTextFinished
      : record?.status === 'reading'
        ? styles.badgeTextReading
        : styles.badgeTextToRead;

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.coverWrap}>
            {book.coverImage ? (
              <Image source={{ uri: book.coverImage }} style={styles.cover} resizeMode="cover" />
            ) : (
              <View style={styles.coverPlaceholder}>
                <Text style={styles.coverPlaceholderText}>No{'\n'}Cover</Text>
              </View>
            )}
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.title}>{book.title}</Text>
            <Text style={styles.authors}>{book.authors.join('・') || '著者不明'}</Text>
            {record && (
              <View style={[styles.badge, badgeStyle]}>
                <Text style={[styles.badgeText, badgeTextStyle]}>{STATUS_LABEL[record.status]}</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>日記</Text>
          {diaryEntries.length === 0 ? (
            <Text style={styles.diaryEmptyText}>
              まだ日記がありません。カレンダー画面から記入できます。
            </Text>
          ) : (
            diaryEntries.map((entry) => (
              <View key={entry.id} style={styles.diaryCard}>
                <Text style={styles.diaryDate}>{entry.entryDate}</Text>
                <Text style={styles.diaryMemo}>{entry.memo}</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.ivory50,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.ivory50,
  },
  emptyText: {
    color: Colors.ink400,
    fontSize: FontSize.body,
  },
  content: {
    padding: Spacing.s4,
    gap: Spacing.s6,
  },
  header: {
    flexDirection: 'row',
    gap: Spacing.s4,
  },
  coverWrap: {
    width: COVER_W,
    height: COVER_H,
    borderRadius: Radius.card,
    overflow: 'hidden',
    flexShrink: 0,
    ...Shadow.card,
  },
  cover: {
    width: COVER_W,
    height: COVER_H,
  },
  coverPlaceholder: {
    width: COVER_W,
    height: COVER_H,
    backgroundColor: Colors.sage100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverPlaceholderText: {
    fontSize: FontSize.caption,
    color: Colors.ink400,
    textAlign: 'center',
  },
  headerInfo: {
    flex: 1,
    justifyContent: 'center',
    gap: Spacing.s2,
  },
  title: {
    fontSize: FontSize.title2,
    fontWeight: '600',
    color: Colors.ink900,
  },
  authors: {
    fontSize: FontSize.bodySmall,
    color: Colors.ink600,
  },
  badge: {
    alignSelf: 'flex-start',
    borderRadius: Radius.chip,
    paddingHorizontal: Spacing.s2,
    paddingVertical: 2,
    marginTop: Spacing.s1,
  },
  badgeToRead: {
    backgroundColor: Colors.sage100,
  },
  badgeReading: {
    backgroundColor: Colors.coral100,
  },
  badgeFinished: {
    backgroundColor: Colors.ivory100,
  },
  badgeText: {
    fontSize: FontSize.micro,
    fontWeight: '600',
  },
  badgeTextToRead: {
    color: Colors.sage600,
  },
  badgeTextReading: {
    color: Colors.coral400,
  },
  badgeTextFinished: {
    color: Colors.ink600,
  },

  // Diary section
  section: {
    gap: Spacing.s3,
  },
  sectionTitle: {
    fontSize: FontSize.headline,
    fontWeight: '600',
    color: Colors.ink900,
  },
  diaryEmptyText: {
    fontSize: FontSize.bodySmall,
    color: Colors.ink400,
  },
  diaryCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.card,
    padding: Spacing.s4,
    gap: Spacing.s1,
    ...Shadow.card,
  },
  diaryDate: {
    fontSize: FontSize.caption,
    color: Colors.ink400,
    fontWeight: '600',
  },
  diaryMemo: {
    fontSize: FontSize.body,
    color: Colors.ink900,
  },
});
