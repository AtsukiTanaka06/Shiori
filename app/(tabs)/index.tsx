import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, FontSize, Spacing, Radius, Shadow } from '../../src/constants/design';
import { useBookshelf } from '../../src/hooks/useBookshelf';
import type { BookWithRecord, ReadingStatus } from '../../src/types';

const SCREEN_WIDTH = Dimensions.get('window').width;
const GRID_COLUMNS = 3;
const GRID_GAP = Spacing.s2;
const GRID_PADDING = Spacing.s4;
const GRID_ITEM_WIDTH =
  (SCREEN_WIDTH - GRID_PADDING * 2 - GRID_GAP * (GRID_COLUMNS - 1)) / GRID_COLUMNS;

const COVER_LIST_W = 56;
const COVER_LIST_H = 80;

type FilterOption = { label: string; value: 'all' | ReadingStatus };
const FILTER_OPTIONS: FilterOption[] = [
  { label: 'すべて', value: 'all' },
  { label: 'これから', value: 'to_read' },
  { label: '読了', value: 'finished' },
];

function StatusBadge({ status }: { status: ReadingStatus }) {
  const isFinished = status === 'finished';
  return (
    <View style={[styles.badge, isFinished ? styles.badgeFinished : styles.badgeToRead]}>
      <Text style={[styles.badgeText, isFinished ? styles.badgeTextFinished : styles.badgeTextToRead]}>
        {isFinished ? '読了' : 'これから'}
      </Text>
    </View>
  );
}

function CoverPlaceholder({ width, height }: { width: number; height: number }) {
  return (
    <View style={[styles.coverPlaceholder, { width, height }]}>
      <Text style={styles.coverPlaceholderText}>No{'\n'}Cover</Text>
    </View>
  );
}

function ListItem({ item, onPress }: { item: BookWithRecord; onPress: () => void }) {
  const { book, record } = item;
  return (
    <TouchableOpacity style={styles.listCard} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.listCoverWrap}>
        {book.coverImage ? (
          <Image source={{ uri: book.coverImage }} style={styles.listCover} resizeMode="cover" />
        ) : (
          <CoverPlaceholder width={COVER_LIST_W} height={COVER_LIST_H} />
        )}
      </View>
      <View style={styles.listInfo}>
        <Text style={styles.listTitle} numberOfLines={2}>{book.title}</Text>
        <Text style={styles.listAuthors} numberOfLines={1}>
          {book.authors.join('・') || '著者不明'}
        </Text>
        <StatusBadge status={record.status} />
      </View>
    </TouchableOpacity>
  );
}

function GridItem({ item, onPress }: { item: BookWithRecord; onPress: () => void }) {
  const { book } = item;
  const coverH = GRID_ITEM_WIDTH * (4 / 3);
  return (
    <TouchableOpacity style={[styles.gridItem, { width: GRID_ITEM_WIDTH }]} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.gridCoverWrap, { width: GRID_ITEM_WIDTH, height: coverH }]}>
        {book.coverImage ? (
          <Image source={{ uri: book.coverImage }} style={{ width: GRID_ITEM_WIDTH, height: coverH }} resizeMode="cover" />
        ) : (
          <CoverPlaceholder width={GRID_ITEM_WIDTH} height={coverH} />
        )}
      </View>
      <Text style={styles.gridTitle} numberOfLines={2}>{book.title}</Text>
    </TouchableOpacity>
  );
}

export default function BookshelfScreen() {
  const router = useRouter();
  const { filteredItems, filter, displayMode, isLoading, setFilter, setDisplayMode } =
    useBookshelf();

  const isEmpty = !isLoading && filteredItems.length === 0;

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      {/* フィルター + 表示切り替え */}
      <View style={styles.toolbar}>
        <View style={styles.filters}>
          {FILTER_OPTIONS.map((opt) => (
            <TouchableOpacity
              key={opt.value}
              style={[styles.filterTab, filter === opt.value && styles.filterTabActive]}
              onPress={() => setFilter(opt.value)}
            >
              <Text style={[styles.filterTabText, filter === opt.value && styles.filterTabTextActive]}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          style={styles.displayToggle}
          onPress={() => setDisplayMode(displayMode === 'list' ? 'grid' : 'list')}
          hitSlop={8}
        >
          <Text style={styles.displayToggleText}>{displayMode === 'list' ? '⊞' : '☰'}</Text>
        </TouchableOpacity>
      </View>

      {/* 本棚リスト */}
      {isEmpty ? (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>本棚が空です</Text>
          <Text style={styles.emptySubText}>バーコードまたは検索で本を追加してみましょう</Text>
        </View>
      ) : displayMode === 'list' ? (
        <FlatList
          key="list"
          data={filteredItems}
          keyExtractor={(item) => item.record.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <ListItem item={item} onPress={() => router.push(`/books/${item.book.id}`)} />
          )}
        />
      ) : (
        <FlatList
          key="grid"
          data={filteredItems}
          keyExtractor={(item) => item.record.id}
          numColumns={GRID_COLUMNS}
          contentContainerStyle={styles.gridContent}
          columnWrapperStyle={styles.gridRow}
          renderItem={({ item }) => (
            <GridItem item={item} onPress={() => router.push(`/books/${item.book.id}`)} />
          )}
        />
      )}

      {/* 追加ボタン */}
      <TouchableOpacity style={styles.fab} onPress={() => router.push('/add')} activeOpacity={0.85}>
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.ivory50,
  },

  // Toolbar
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.s4,
    paddingVertical: Spacing.s2,
    borderBottomWidth: 1,
    borderBottomColor: Colors.line200,
    backgroundColor: Colors.ivory50,
  },
  filters: {
    flex: 1,
    flexDirection: 'row',
    gap: Spacing.s2,
  },
  filterTab: {
    paddingHorizontal: Spacing.s3,
    paddingVertical: Spacing.s2,
    borderRadius: Radius.chip,
  },
  filterTabActive: {
    backgroundColor: Colors.sage100,
  },
  filterTabText: {
    fontSize: FontSize.bodySmall,
    color: Colors.ink400,
  },
  filterTabTextActive: {
    color: Colors.sage600,
    fontWeight: '600',
  },
  displayToggle: {
    padding: Spacing.s2,
  },
  displayToggleText: {
    fontSize: FontSize.headline,
    color: Colors.ink600,
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

  // List
  listContent: {
    padding: Spacing.s4,
    gap: Spacing.s3,
    paddingBottom: 100,
  },
  listCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: Radius.card,
    padding: Spacing.s4,
    gap: Spacing.s4,
    ...Shadow.card,
  },
  listCoverWrap: {
    width: COVER_LIST_W,
    height: COVER_LIST_H,
    borderRadius: 6,
    overflow: 'hidden',
    flexShrink: 0,
  },
  listCover: {
    width: COVER_LIST_W,
    height: COVER_LIST_H,
  },
  listInfo: {
    flex: 1,
    justifyContent: 'center',
    gap: Spacing.s1,
  },
  listTitle: {
    fontSize: FontSize.headline,
    fontWeight: '600',
    color: Colors.ink900,
  },
  listAuthors: {
    fontSize: FontSize.bodySmall,
    color: Colors.ink600,
  },

  // Badge
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
  badgeTextFinished: {
    color: Colors.ink600,
  },

  // Grid
  gridContent: {
    padding: GRID_PADDING,
    paddingBottom: 100,
  },
  gridRow: {
    gap: GRID_GAP,
    marginBottom: GRID_GAP,
  },
  gridItem: {
    gap: Spacing.s1,
  },
  gridCoverWrap: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  gridTitle: {
    fontSize: FontSize.caption,
    color: Colors.ink900,
    lineHeight: 16,
  },

  // Cover placeholder
  coverPlaceholder: {
    backgroundColor: Colors.sage100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverPlaceholderText: {
    fontSize: FontSize.micro,
    color: Colors.ink400,
    textAlign: 'center',
  },

  // FAB
  fab: {
    position: 'absolute',
    right: Spacing.s6,
    bottom: Spacing.s8,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.sage500,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.card,
  },
  fabText: {
    fontSize: 28,
    color: Colors.white,
    lineHeight: 34,
  },
});
