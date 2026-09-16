import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, Spacing, Radius, FontSize } from '../src/constants/design';
import { useAuth } from '../src/hooks/useAuth';

export default function SettingsScreen() {
  const { user, isLoading, signOut } = useAuth();

  async function handleSignOut() {
    Alert.alert('ログアウト', 'ログアウトしますか？', [
      { text: 'キャンセル', style: 'cancel' },
      {
        text: 'ログアウト',
        style: 'destructive',
        onPress: async () => {
          try {
            await signOut();
          } catch {
            Alert.alert('エラー', 'ログアウトに失敗しました');
          }
        },
      },
    ]);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {user && (
          <View style={styles.section}>
            <Text style={styles.label}>アカウント</Text>
            <Text style={styles.email}>{user.email}</Text>
          </View>
        )}

        <TouchableOpacity
          style={[styles.signOutButton, isLoading && styles.buttonDisabled]}
          onPress={handleSignOut}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={Colors.error} />
          ) : (
            <Text style={styles.signOutText}>ログアウト</Text>
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
  container: {
    flex: 1,
    padding: Spacing.s6,
  },
  section: {
    marginBottom: Spacing.s8,
  },
  label: {
    fontSize: FontSize.caption,
    color: Colors.ink400,
    marginBottom: Spacing.s1,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  email: {
    fontSize: FontSize.body,
    color: Colors.ink900,
  },
  signOutButton: {
    borderWidth: 1,
    borderColor: Colors.error,
    borderRadius: Radius.button,
    paddingVertical: 14,
    alignItems: 'center',
    minHeight: 44,
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  signOutText: {
    color: Colors.error,
    fontSize: FontSize.body,
    fontWeight: '600',
  },
});
