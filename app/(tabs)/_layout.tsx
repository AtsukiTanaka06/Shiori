import { Ionicons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import { Colors, FontSize } from '../../src/constants/design';

export default function TabsLayout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: Colors.ivory50 },
        headerTintColor: Colors.ink900,
        tabBarActiveTintColor: Colors.sage600,
        tabBarInactiveTintColor: Colors.ink400,
        tabBarStyle: { backgroundColor: Colors.ivory50, borderTopColor: Colors.line200 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Shiori',
          tabBarLabel: '本棚',
          tabBarIcon: ({ color, size }) => <Ionicons name="book-outline" size={size} color={color} />,
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push('/settings')} hitSlop={8}>
              <Text style={styles.headerButton}>設定</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="diary"
        options={{
          title: 'カレンダー',
          tabBarLabel: 'カレンダー',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    color: Colors.sage500,
    fontSize: FontSize.body,
  },
});
