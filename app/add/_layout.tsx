import { Stack } from 'expo-router';

export default function AddLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: '本を追加' }} />
      <Stack.Screen name="scan" options={{ title: 'バーコードをスキャン' }} />
      <Stack.Screen name="search" options={{ title: '本を検索' }} />
      <Stack.Screen name="register" options={{ title: '書籍情報の確認' }} />
    </Stack>
  );
}
