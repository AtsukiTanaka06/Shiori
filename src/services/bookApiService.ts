import type { Book } from '../types';

const GOOGLE_BOOKS_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_BOOKS_API_KEY;

interface GoogleBooksVolumeInfo {
  title: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  pageCount?: number;
  categories?: string[];
  imageLinks?: { thumbnail?: string; smallThumbnail?: string };
  industryIdentifiers?: { type: string; identifier: string }[];
}

interface GoogleBooksVolume {
  volumeInfo: GoogleBooksVolumeInfo;
}

interface GoogleBooksResponse {
  totalItems: number;
  items?: GoogleBooksVolume[];
}

function googleBooksToBook(volume: GoogleBooksVolume, isbnFallback = ''): Book {
  const v = volume.volumeInfo;
  const isbn13 = v.industryIdentifiers?.find((id) => id.type === 'ISBN_13')?.identifier;
  const isbn10 = v.industryIdentifiers?.find((id) => id.type === 'ISBN_10')?.identifier;
  const isbn = isbn13 ?? isbn10 ?? isbnFallback;
  const thumbnail = v.imageLinks?.thumbnail ?? v.imageLinks?.smallThumbnail;
  const coverImage = thumbnail?.replace('http://', 'https://');

  return {
    id: '',
    isbn,
    title: v.title,
    authors: v.authors ?? [],
    coverImage,
    publisher: v.publisher,
    publishedAt: v.publishedDate,
    pageCount: v.pageCount,
    genre: v.categories?.[0],
    createdAt: '',
  };
}

async function googleBooksRequest(query: string, params = ''): Promise<GoogleBooksResponse | null> {
  const apiKey = GOOGLE_BOOKS_API_KEY ? `&key=${GOOGLE_BOOKS_API_KEY}` : '';
  const encoded = encodeURIComponent(query);
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${encoded}${params}${apiKey}`
  );
  if (!res.ok) return null;
  return (await res.json()) as GoogleBooksResponse;
}

export const bookApiService = {
  /**
   * ISBN で書籍を取得する。
   */
  async fetchByIsbn(isbn: string): Promise<Book | null> {
    const json = await googleBooksRequest(`isbn:${isbn}`);
    if (!json?.items?.[0]) return null;
    return googleBooksToBook(json.items[0], isbn);
  },

  /**
   * Google Books volume ID から ISBN を取得する。
   * テキスト検索結果に industryIdentifiers がない volume でも
   * 単体 volume API では ISBN が含まれることがある。
   */
  async fetchIsbnByVolumeId(volumeId: string): Promise<string | null> {
    const apiKey = GOOGLE_BOOKS_API_KEY ? `?key=${GOOGLE_BOOKS_API_KEY}` : '';
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes/${encodeURIComponent(volumeId)}${apiKey}`
    );
    if (!res.ok) return null;
    const volume = (await res.json()) as GoogleBooksVolume;
    const ids = volume.volumeInfo.industryIdentifiers;
    return (
      ids?.find((id) => id.type === 'ISBN_13')?.identifier ??
      ids?.find((id) => id.type === 'ISBN_10')?.identifier ??
      null
    );
  },

  /**
   * テキスト（タイトル・著者・ISBN）で書籍を検索する。
   */
  async searchBooks(query: string): Promise<Book[]> {
    const json = await googleBooksRequest(query, '&maxResults=20&langRestrict=ja');
    return (json?.items ?? []).map((item) => googleBooksToBook(item));
  },
};
