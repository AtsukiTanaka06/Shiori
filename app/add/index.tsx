import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, Spacing, Radius, FontSize } from '../../src/constants/design';

export default function AddIndexScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.container}>
        <Text style={styles.title}>本を追加</Text>
        <Text style={styles.subtitle}>登録方法を選んでください</Text>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push('/add/scan')}
          >
            <Text style={styles.primaryButtonText}>バーコードで登録</Text>
            <Text style={styles.primaryButtonSub}>本の裏側のバーコードを読み取ります</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.push('/add/search')}
          >
            <Text style={styles.secondaryButtonText}>タイトル・著者で検索</Text>
            <Text style={styles.secondaryButtonSub}>キーワードで本を検索します</Text>
          </TouchableOpacity>
        </View>
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
    paddingHorizontal: Spacing.s5,
    paddingTop: Spacing.s8,
  },
  title: {
    fontSize: FontSize.largeTitle,
    fontWeight: 'bold',
    color: Colors.ink900,
    marginBottom: Spacing.s2,
  },
  subtitle: {
    fontSize: FontSize.body,
    color: Colors.ink600,
    marginBottom: Spacing.s8,
  },
  buttons: {
    gap: Spacing.s4,
  },
  primaryButton: {
    backgroundColor: Colors.sage500,
    borderRadius: Radius.card,
    padding: Spacing.s6,
    minHeight: 80,
    justifyContent: 'center',
  },
  primaryButtonText: {
    fontSize: FontSize.headline,
    fontWeight: '600',
    color: Colors.white,
    marginBottom: Spacing.s1,
  },
  primaryButtonSub: {
    fontSize: FontSize.caption,
    color: Colors.sage100,
  },
  secondaryButton: {
    backgroundColor: Colors.ivory100,
    borderRadius: Radius.card,
    padding: Spacing.s6,
    minHeight: 80,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.line200,
  },
  secondaryButtonText: {
    fontSize: FontSize.headline,
    fontWeight: '600',
    color: Colors.ink900,
    marginBottom: Spacing.s1,
  },
  secondaryButtonSub: {
    fontSize: FontSize.caption,
    color: Colors.ink600,
  },
});
