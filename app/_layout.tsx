import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { supabase } from '../src/lib/supabase';
import { useAuthStore } from '../src/store/authStore';

function AuthGuard() {
  const { user, isLoading, setUser, setIsLoading } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  // セッション初期化 + 変更監視
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const supabaseUser = data.session?.user;
      setUser(supabaseUser ? { id: supabaseUser.id, email: supabaseUser.email ?? '' } : null);
      setIsLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const supabaseUser = session?.user;
      setUser(supabaseUser ? { id: supabaseUser.id, email: supabaseUser.email ?? '' } : null);
    });

    return () => listener.subscription.unsubscribe();
  }, [setUser, setIsLoading]);

  // 認証状態に応じたリダイレクト
  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === 'login';

    if (!user && !inAuthGroup) {
      router.replace('/login');
    } else if (user && inAuthGroup) {
      router.replace('/');
    }
  }, [user, isLoading, segments, router]);

  return null;
}

export default function RootLayout() {
  return (
    <>
      <AuthGuard />
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
