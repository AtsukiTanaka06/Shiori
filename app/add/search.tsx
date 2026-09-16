import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, Spacing, Radius, FontSize, Shadow } from '../../src/constants/design';
import { bookApiService } from '../../src/services/bookApiService';
import { useBookRegistrationStore } from '../../src/store/bookRegistrationStore';
import type { Book } from '../../src/types';

export default function SearchScreen() {
  const router = useRouter();
  const setPendingBook = useBookRegistrationStore((s) => s.setPendingBook);

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  async function handleSearch() {
    const q = query.trim();
    if (!q) return;
    setIsLoading(true);
    setSearched(true);
    try {
      const books = await bookApiService.searchBooks(q);
      setResults(books);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSelect(book: Book) {
    setPendingBook(book);
    router.push('/add/register');
  }

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.container}>
        <View style={styles.searchRow}>
          <TextInput
            style={styles.input}
            placeholder="タイトル・著者・ISBN"
            placeholderTextColor={Colors.ink400}
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
            autoFocus
          />
          <TouchableOpacity
            style={[styles.searchButton, !query.trim() && styles.searchButtonDisabled]}
            onPress={handleSearch}
            disabled={!query.trim() || isLoading}
          >
            <Text style={styles.searchButtonText}>検索</Text>
          </TouchableOpacity>
        </View>

        {isLoading && (
          <View style={styles.center}>
            <ActivityIndicator color={Colors.sage500} />
          </View>
        )}

        {!isLoading && searched && results.length === 0 && (
          <View style={styles.center}>
            <Text style={styles.emptyText}>書籍が見つかりませんでした</Text>
            <Text style={styles.emptySubText}>別のキーワードで試してみてください</Text>
          </View>
        )}

        <FlatList
          data={results}
          keyExtractor={(item, index) => item.isbn || String(index)}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => handleSelect(item)}>
              <View style={styles.coverWrap}>
                {item.coverImage ? (
                  <Image source={{ uri: item.coverImage }} style={styles.cover} resizeMode="cover" />
                ) : (
                  <View style={styles.coverPlaceholder}>
                    <Text style={styles.coverPlaceholderText}>No{'\n'}Cover</Text>
                  </View>
                )}
              </View>
              <View style={styles.info}>
                <Text style={styles.bookTitle} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.authors} numberOfLines={1}>
                  {item.authors.join('・') || '著者不明'}
                </Text>
                {item.publisher && (
                  <Text style={styles.publisher} numberOfLines={1}>{item.publisher}</Text>
                )}
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const COVER_W = 56;
const COVER_H = 80;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.ivory50,
  },
  container: {
    flex: 1,
  },
  searchRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.s4,
    paddingVertical: Spacing.s3,
    gap: Spacing.s2,
    borderBottomWidth: 1,
    borderBottomColor: Colors.line200,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.line200,
    borderRadius: Radius.input,
    paddingHorizontal: Spacing.s4,
    paddingVertical: Spacing.s3,
    fontSize: FontSize.body,
    color: Colors.ink900,
    backgroundColor: Colors.white,
    minHeight: 44,
  },
  searchButton: {
    backgroundColor: Colors.sage500,
    borderRadius: Radius.button,
    paddingHorizontal: Spacing.s4,
    justifyContent: 'center',
    minHeight: 44,
    minWidth: 60,
    alignItems: 'center',
  },
  searchButtonDisabled: {
    backgroundColor: Colors.ink400,
  },
  searchButtonText: {
    color: Colors.white,
    fontSize: FontSize.body,
    fontWeight: '600',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: Spacing.s12,
  },
  emptyText: {
    fontSize: FontSize.body,
    color: Colors.ink600,
    marginBottom: Spacing.s2,
  },
  emptySubText: {
    fontSize: FontSize.bodySmall,
    color: Colors.ink400,
  },
  list: {
    padding: Spacing.s4,
    gap: Spacing.s3,
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
  info: {
    flex: 1,
    justifyContent: 'center',
    gap: Spacing.s1,
  },
  bookTitle: {
    fontSize: FontSize.headline,
    fontWeight: '600',
    color: Colors.ink900,
  },
  authors: {
    fontSize: FontSize.bodySmall,
    color: Colors.ink600,
  },
  publisher: {
    fontSize: FontSize.caption,
    color: Colors.ink400,
  },
});
