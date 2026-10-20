import { Tabs } from 'expo-router';
// Using Ionicons as it comes built-in with Expo vector icons cleanly
import { Ionicons } from '@expo/vector-icons'; 

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#2e7d32', // Green accent color matching your layout theme
        tabBarInactiveTintColor: '#888888',
        tabBarStyle: {
          backgroundColor: '#111111', // Dark bottom navigation from your reference image
          borderTopWidth: 0,
          paddingBottom: 5,
          height: 60,
        },
        headerStyle: {
          backgroundColor: '#ffffff',
        },
        headerTintColor: '#111111',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerTitle: 'Impulse Control',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="impulse"
        options={{
          title: 'Impulse',
          headerTitle: 'Scorecard',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="card-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          headerTitle: 'Purchase History',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          headerTitle: 'App Preferences',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
