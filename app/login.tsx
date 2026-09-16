import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, Spacing, Radius, FontSize } from '../src/constants/design';
import { useAuth } from '../src/hooks/useAuth';

export default function LoginScreen() {
  const { signIn, signUp, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn');

  function toJapaneseError(error: unknown): string {
    const message = error instanceof Error ? error.message : '';
    if (message.includes('Email not confirmed')) return 'メールアドレスの確認が完了していません。\n受信トレイの確認メールを開いてください。';
    if (message.includes('Invalid login credentials')) return 'メールアドレスまたはパスワードが正しくありません。';
    if (message.includes('User already registered')) return 'このメールアドレスはすでに登録されています。';
    if (message.includes('Password should be at least')) return 'パスワードは6文字以上で入力してください。';
    return message || '認証に失敗しました';
  }

  async function handleSubmit() {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      Alert.alert('エラー', 'メールアドレスとパスワードを入力してください');
      return;
    }

    try {
      if (mode === 'signIn') {
        await signIn(trimmedEmail, trimmedPassword);
      } else {
        const { needsEmailConfirmation } = await signUp(trimmedEmail, trimmedPassword);
        if (needsEmailConfirmation) {
          Alert.alert(
            'メール確認が必要です',
            '確認メールを送信しました。\nメール内のリンクをタップしてからログインしてください。',
            [{ text: 'OK', onPress: () => setMode('signIn') }]
          );
        }
      }
    } catch (error) {
      Alert.alert('エラー', toJapaneseError(error));
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.inner}>
          <Text style={styles.title}>Shiori</Text>
          <Text style={styles.subtitle}>読書記録アプリ</Text>

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="メールアドレス"
              placeholderTextColor={Colors.ink400}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              editable={!isLoading}
            />
            <TextInput
              style={styles.input}
              placeholder="パスワード"
              placeholderTextColor={Colors.ink400}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              textContentType={mode === 'signUp' ? 'newPassword' : 'password'}
              editable={!isLoading}
            />

            <TouchableOpacity
              style={[styles.button, isLoading && styles.buttonDisabled]}
              onPress={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={Colors.white} />
              ) : (
                <Text style={styles.buttonText}>
                  {mode === 'signIn' ? 'ログイン' : 'アカウント作成'}
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.switchMode}
              onPress={() => setMode(mode === 'signIn' ? 'signUp' : 'signIn')}
              disabled={isLoading}
            >
              <Text style={styles.switchModeText}>
                {mode === 'signIn'
                  ? 'アカウントをお持ちでない方はこちら'
                  : 'すでにアカウントをお持ちの方はこちら'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
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
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.s8,
  },
  title: {
    fontSize: FontSize.display,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.ink900,
    marginBottom: Spacing.s2,
  },
  subtitle: {
    fontSize: FontSize.body,
    textAlign: 'center',
    color: Colors.ink600,
    marginBottom: Spacing.s12,
  },
  form: {
    gap: Spacing.s4,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.line200,
    borderRadius: Radius.input,
    paddingHorizontal: Spacing.s4,
    paddingVertical: 14,
    fontSize: FontSize.body,
    color: Colors.ink900,
    backgroundColor: Colors.ivory50,
  },
  button: {
    backgroundColor: Colors.sage500,
    borderRadius: Radius.button,
    paddingVertical: Spacing.s4,
    alignItems: 'center',
    marginTop: Spacing.s2,
    minHeight: 44,
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: Colors.ink400,
  },
  buttonText: {
    color: Colors.white,
    fontSize: FontSize.body,
    fontWeight: '600',
  },
  switchMode: {
    alignItems: 'center',
    paddingVertical: Spacing.s2,
    minHeight: 44,
    justifyContent: 'center',
  },
  switchModeText: {
    color: Colors.ink600,
    fontSize: FontSize.bodySmall,
  },
});
