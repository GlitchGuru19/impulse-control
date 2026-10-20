import { Pressable, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router'; // Enables navigating across tabs programmatically

export default function HomeScreen() {
  const router = useRouter();

  // Temporary static placeholder values for your learning progress metrics
  const moneySaved = 340.00;
  
  const recentActivity = [
    { id: '1', name: 'Gaming Mouse', price: 60, status: 'Approved' },
    { id: '2', name: 'Mechanical Keyboard', price: 135, status: 'Blocked' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="auto"/>
      
      {/* App name and greeting heading */}
      <View style={styles.header}>
        <Text style={styles.greetingTitle}>Impulse Control</Text>
        <Text style={styles.greetingSubtitle}>Make smarter spending decisions.</Text>
      </View>

      {/* Spending summary section */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Total Money Saved</Text>
        <Text style={styles.summaryValue}>${moneySaved.toFixed(2)}</Text>
      </View>

      {/* Main navigation button */}
      <Pressable 
        style={styles.mainButton} 
        onPress={() => router.push('/impulse')}
      >
        <Text style={styles.mainButtonText}>Check a Purchase</Text>
      </Pressable>

      {/* Recent activity block */}
      <View style={styles.activitySection}>
        <Text style={styles.sectionHeading}>Recent Activity</Text>
        
        {recentActivity.map((item) => (
          <View key={item.id} style={styles.activityRow}>
            <View>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
            </View>
            <View style={[
              styles.statusBadge, 
              { backgroundColor: item.status === 'Approved' ? '#e8f5e9' : '#ffebee' }
            ]}>
              <Text style={[
                styles.statusText, 
                { color: item.status === 'Approved' ? '#2e7d32' : '#c62828' }
              ]}>
                {item.status}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // Clean white background from your specification
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  header: {
    marginBottom: 24,
  },
  greetingTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111111',
  },
  greetingSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  summaryCard: {
    backgroundColor: '#f1f3f5',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e1e4e8',
  },
  summaryLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#666666',
    textTransform: 'uppercase',
  },
  summaryValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2e7d32', // Green accent color for numbers
    marginTop: 6,
  },
  mainButton: {
    backgroundColor: '#2e7d32', 
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 32,
  },
  mainButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  activitySection: {
    flex: 1,
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  activityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f5',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111111',
  },
  itemPrice: {
    fontSize: 14,
    color: '#666666',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});
