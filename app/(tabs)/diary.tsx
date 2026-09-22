import { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, FontSize, Spacing, Radius, Shadow } from '../../src/constants/design';
import { useDiary } from '../../src/hooks/useDiary';
import type { BookWithRecord } from '../../src/types';

LocaleConfig.locales.jp = {
  monthNames: [
    '1月', '2月', '3月', '4月', '5月', '6月',
    '7月', '8月', '9月', '10月', '11月', '12月',
  ],
  monthNamesShort: [
    '1月', '2月', '3月', '4月', '5月', '6月',
    '7月', '8月', '9月', '10月', '11月', '12月',
  ],
  dayNames: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
  dayNamesShort: ['日', '月', '火', '水', '木', '金', '土'],
  today: '今日',
};
LocaleConfig.defaultLocale = 'jp';

const COVER_W = 48;
const COVER_H = 68;

function todayString(): string {
  return new Date().toISOString().slice(0, 10);
}

function CoverPlaceholder() {
  return (
    <View style={styles.coverPlaceholder}>
      <Text style={styles.coverPlaceholderText}>No{'\n'}Cover</Text>
    </View>
  );
}

export default function DiaryScreen() {
  const [selectedDate, setSelectedDate] = useState(todayString());
  const { booksReadingOnSelectedDate, entriesByBook, isLoading, saveMemo } =
    useDiary(selectedDate);
  const [editingItem, setEditingItem] = useState<BookWithRecord | null>(null);
  const [memoDraft, setMemoDraft] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const markedDates = useMemo(
    () => ({
      [selectedDate]: { selected: true, selectedColor: Colors.sage500 },
    }),
    [selectedDate]
  );

  function openEditor(item: BookWithRecord) {
    setEditingItem(item);
    setMemoDraft(entriesByBook[item.book.id]?.memo ?? '');
  }

  function closeEditor() {
    setEditingItem(null);
    setMemoDraft('');
  }

  async function handleSave() {
    if (!editingItem) return;
    setIsSaving(true);
    try {
      await saveMemo(editingItem.book.id, memoDraft);
      closeEditor();
    } finally {
      setIsSaving(false);
    }
  }

  const isEmpty = !isLoading && booksReadingOnSelectedDate.length === 0;

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <Calendar
        current={selectedDate}
        markedDates={markedDates}
        onDayPress={(day) => setSelectedDate(day.dateString)}
        theme={{
          backgroundColor: Colors.ivory50,
          calendarBackground: Colors.ivory50,
          textSectionTitleColor: Colors.ink400,
          dayTextColor: Colors.ink900,
          todayTextColor: Colors.sage600,
          monthTextColor: Colors.ink900,
          arrowColor: Colors.sage600,
          selectedDayBackgroundColor: Colors.sage500,
          selectedDayTextColor: Colors.white,
        }}
      />

      <View style={styles.listHeader}>
        <Text style={styles.listHeaderText}>{selectedDate} に読書中の本</Text>
      </View>

      {isEmpty ? (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>読書中の本がありません</Text>
          <Text style={styles.emptySubText}>本棚で「これから」の本を読み始めると表示されます</Text>
        </View>
      ) : (
        <FlatList
          data={booksReadingOnSelectedDate}
          keyExtractor={(item) => item.record.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => {
            const hasMemo = Boolean(entriesByBook[item.book.id]?.memo);
            return (
              <TouchableOpacity
                style={styles.card}
                onPress={() => openEditor(item)}
                activeOpacity={0.7}
              >
                <View style={styles.coverWrap}>
                  {item.book.coverImage ? (
                    <Image
                      source={{ uri: item.book.coverImage }}
                      style={styles.cover}
                      resizeMode="cover"
                    />
                  ) : (
                    <CoverPlaceholder />
                  )}
                </View>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle} numberOfLines={2}>
                    {item.book.title}
                  </Text>
                  <Text style={styles.cardMemoStatus}>
                    {hasMemo ? 'メモあり' : 'メモを書く'}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}

      <Modal visible={editingItem !== null} animationType="slide" transparent>
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle} numberOfLines={1}>
              {editingItem?.book.title}
            </Text>
            <Text style={styles.modalDate}>{selectedDate}</Text>
            <TextInput
              style={styles.modalInput}
              value={memoDraft}
              onChangeText={setMemoDraft}
              placeholder="今日の読書メモを書きましょう"
              placeholderTextColor={Colors.ink400}
              multiline
              textAlignVertical="top"
            />
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalCancelButton} onPress={closeEditor}>
                <Text style={styles.modalCancelText}>キャンセル</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalSaveButton}
                onPress={handleSave}
                disabled={isSaving}
              >
                <Text style={styles.modalSaveText}>{isSaving ? '保存中...' : '保存'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.ivory50,
  },
  listHeader: {
    paddingHorizontal: Spacing.s4,
    paddingTop: Spacing.s4,
    paddingBottom: Spacing.s2,
  },
  listHeaderText: {
    fontSize: FontSize.bodySmall,
    color: Colors.ink600,
    fontWeight: '600',
  },
  listContent: {
    padding: Spacing.s4,
    gap: Spacing.s3,
    paddingBottom: 100,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: Radius.card,
    padding: Spacing.s4,
    gap: Spacing.s4,
    ...Shadow.card,
  },
  coverWrap: {
    width: COVER_W,
    height: COVER_H,
    borderRadius: 6,
    overflow: 'hidden',
    flexShrink: 0,
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
    fontSize: FontSize.micro,
    color: Colors.ink400,
    textAlign: 'center',
  },
  cardInfo: {
    flex: 1,
    justifyContent: 'center',
    gap: Spacing.s1,
  },
  cardTitle: {
    fontSize: FontSize.headline,
    fontWeight: '600',
    color: Colors.ink900,
  },
  cardMemoStatus: {
    fontSize: FontSize.bodySmall,
    color: Colors.sage600,
  },

  // Empty
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.s2,
    paddingBottom: Spacing.s12,
  },
  emptyTitle: {
    fontSize: FontSize.headline,
    fontWeight: '600',
    color: Colors.ink600,
  },
  emptySubText: {
    fontSize: FontSize.bodySmall,
    color: Colors.ink400,
    textAlign: 'center',
    paddingHorizontal: Spacing.s8,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    backgroundColor: Colors.ivory50,
    borderTopLeftRadius: Radius.modal,
    borderTopRightRadius: Radius.modal,
    padding: Spacing.s6,
    gap: Spacing.s2,
  },
  modalTitle: {
    fontSize: FontSize.title2,
    fontWeight: '600',
    color: Colors.ink900,
  },
  modalDate: {
    fontSize: FontSize.bodySmall,
    color: Colors.ink400,
    marginBottom: Spacing.s2,
  },
  modalInput: {
    minHeight: 140,
    borderWidth: 1,
    borderColor: Colors.line200,
    borderRadius: Radius.input,
    padding: Spacing.s3,
    fontSize: FontSize.body,
    color: Colors.ink900,
    backgroundColor: Colors.white,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Spacing.s3,
    marginTop: Spacing.s4,
  },
  modalCancelButton: {
    paddingHorizontal: Spacing.s4,
    minHeight: 44,
    justifyContent: 'center',
  },
  modalCancelText: {
    fontSize: FontSize.body,
    color: Colors.ink600,
  },
  modalSaveButton: {
    backgroundColor: Colors.sage500,
    borderRadius: Radius.button,
    paddingHorizontal: Spacing.s6,
    minHeight: 44,
    justifyContent: 'center',
  },
  modalSaveText: {
    fontSize: FontSize.body,
    fontWeight: '600',
    color: Colors.white,
  },
});
