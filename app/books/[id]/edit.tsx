import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, Spacing, Radius, FontSize } from '../../../src/constants/design';
import { useBookEdit } from '../../../src/hooks/useBookEdit';
import type { ReadingStatus } from '../../../src/types';

const STATUS_OPTIONS: { value: ReadingStatus; label: string }[] = [
  { value: 'to_read', label: 'これから読む' },
  { value: 'reading', label: '読書中' },
  { value: 'finished', label: '読了' },
];

const RATING_VALUES = [1, 2, 3, 4, 5];

export default function BookEditScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const {
    book,
    record,
    isLoading,
    isSaving,
    status,
    setStatus,
    rating,
    setRating,
    impression,
    setImpression,
    memo,
    setMemo,
    save,
    remove,
  } = useBookEdit(id);

  async function handleSave() {
    try {
      await save();
      router.back();
    } catch {
      Alert.alert('エラー', '保存に失敗しました。もう一度お試しください。');
    }
  }

  function handleDelete() {
    Alert.alert('この本を削除しますか？', '読書記録・日記メモも削除され、元に戻せません。', [
      { text: 'キャンセル', style: 'cancel' },
      {
        text: '削除する',
        style: 'destructive',
        onPress: async () => {
          try {
            await remove();
            router.replace('/bookshelf');
          } catch {
            Alert.alert('エラー', '削除に失敗しました。もう一度お試しください。');
          }
        },
      },
    ]);
  }

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.sage500} />
      </SafeAreaView>
    );
  }

  if (!book || !record) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.emptyText}>読書記録が見つかりませんでした</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="chevron-back" size={24} color={Colors.ink900} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {book.title}
        </Text>
        <TouchableOpacity onPress={handleDelete} hitSlop={8}>
          <Text style={styles.deleteText}>削除</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
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

        {/* 評価 */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>評価</Text>
          <View style={styles.starRow}>
            {RATING_VALUES.map((value) => (
              <TouchableOpacity
                key={value}
                onPress={() => setRating(rating === value ? undefined : value)}
                hitSlop={8}
              >
                <Text style={styles.star}>{rating !== undefined && value <= rating ? '★' : '☆'}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 感想 */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>感想</Text>
          <TextInput
            style={styles.textArea}
            value={impression}
            onChangeText={setImpression}
            placeholder="読んだ感想を書きましょう"
            placeholderTextColor={Colors.ink400}
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* メモ */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>メモ</Text>
          <TextInput
            style={styles.textArea}
            value={memo}
            onChangeText={setMemo}
            placeholder="気になった箇所などをメモできます"
            placeholderTextColor={Colors.ink400}
            multiline
            textAlignVertical="top"
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={isSaving}
        >
          {isSaving ? (
            <ActivityIndicator color={Colors.white} />
          ) : (
            <Text style={styles.saveButtonText}>保存する</Text>
          )}
        </TouchableOpacity>
      </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.s4,
    paddingVertical: Spacing.s3,
    borderBottomWidth: 1,
    borderBottomColor: Colors.line200,
  },
  headerTitle: {
    flex: 1,
    marginHorizontal: Spacing.s3,
    fontSize: FontSize.headline,
    fontWeight: '600',
    color: Colors.ink900,
    textAlign: 'center',
  },
  deleteText: {
    fontSize: FontSize.bodySmall,
    color: Colors.error,
    fontWeight: '600',
  },
  scroll: {
    padding: Spacing.s5,
    paddingBottom: Spacing.s4,
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
  starRow: {
    flexDirection: 'row',
    gap: Spacing.s2,
  },
  star: {
    fontSize: FontSize.title1,
    color: Colors.coral400,
  },
  textArea: {
    minHeight: 100,
    borderWidth: 1,
    borderColor: Colors.line200,
    borderRadius: Radius.input,
    padding: Spacing.s3,
    fontSize: FontSize.body,
    color: Colors.ink900,
    backgroundColor: Colors.white,
  },
  footer: {
    padding: Spacing.s5,
    borderTopWidth: 1,
    borderTopColor: Colors.line200,
    backgroundColor: Colors.ivory50,
  },
  saveButton: {
    backgroundColor: Colors.sage500,
    borderRadius: Radius.button,
    paddingVertical: Spacing.s4,
    alignItems: 'center',
    minHeight: 52,
    justifyContent: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: Colors.ink400,
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: FontSize.body,
    fontWeight: '600',
  },
});
