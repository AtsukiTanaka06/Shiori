import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ title: '本棚', headerShown: true }} />
        <Stack.Screen name="login" options={{ title: 'ログイン', headerShown: false }} />
        <Stack.Screen name="settings" options={{ title: '設定' }} />
        <Stack.Screen name="add" options={{ headerShown: false }} />
        <Stack.Screen name="books" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
