import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function VerdictScreen() {
  const router = useRouter();
  
  // Extract all the variables passed from our Impulse scorecard form
  // UPGRADED: Added strictMode and waited48Hours to our parameter extraction
  const { name, price, useOften, improvesLife, strictMode, waited48Hours } = useLocalSearchParams<{ 
    name: string; 
    price: string;
    useOften: string;
    improvesLife: string;
    strictMode: string;
    waited48Hours: string;
  }>();

  // Convert incoming text string parameters back into clean JavaScript boolean values
  const passesUseOften = useOften === 'true';
  const passesImprovesLife = improvesLife === 'true';
  
  // NEW: Convert incoming strict mode parameters into clean boolean values
  const isStrictModeActive = strictMode === 'true';
  const passesWaited48Hours = waited48Hours === 'true';

  // APPLICATION DECISION LOGIC (Upgraded for Strict Mode):
  // 1. We determine what a basic "core pass" looks like (saying YES to using it often OR if it improves life)
  const passesCoreQuestions = passesUseOften || passesImprovesLife;

  // 2. We declare our final approval variable using let so it can be conditionally overwritten
  let isApproved = false;

  if (isStrictModeActive) {
    // 🔥 STRICT MODE RULE: The core check MUST pass AND you MUST have waited 48 hours!
    isApproved = passesCoreQuestions && passesWaited48Hours;
  } else {
    // 💡 NORMAL MODE RULE: Just passing the core questions is enough to approve the buy
    isApproved = passesCoreQuestions;
  }

  return (
    // Dynamic array styling flips the background color between Green and Red instantly
    <View style={[styles.container, isApproved ? styles.bgApproved : styles.bgBlocked]}>
      <StatusBar style="light" />

      <View style={styles.cardContent}>
        {/* Large visual status indicator icon text */}
        <Text style={styles.statusIcon}>{isApproved ? "✅" : "❌"}</Text>
        
        {/* Main bold statement text */}
        <Text style={styles.verdictTitle}>
          {isApproved ? "SAFE PURCHASE!" : "STEP AWAY!"}
        </Text>

        <Text style={styles.verdictSubtitle}>
          {isApproved 
            ? `Based on your scorecard, buying "${name}" fits your lifestyle priorities.` 
            : `You do not need to buy "${name}" right now. Log an impulse instead.`
          }
        </Text>

        {/* Small transparent receipt detail row box */}
        <View style={styles.priceRow}>
          <Text style={styles.priceText}>Estimated Cost: \${parseFloat(price || '0').toFixed(2)}</Text>
        </View>

        {/* Action button to dismiss the overlay and go back to tabs */}
        <Pressable 
          style={[styles.actionButton, isApproved ? styles.btnApproved : styles.btnBlocked]} 
          onPress={() => router.back()}
        >
          {/* UPGRADED: Dynamic visual text wrapper styling selection injection */}
          <Text style={[
            styles.actionButtonText, 
            !isApproved && styles.btnBlockedText // Overrides text color to crimson red if item is blocked
          ]}>
            {isApproved ? "Back to Dashboard" : "I'll Save My Money"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  // Dynamic Background classes
  bgApproved: {
    backgroundColor: '#2e7d32', // Solid Emerald Green
  },
  bgBlocked: {
    backgroundColor: '#c62828', // Solid Warning Crimson Red
  },
  cardContent: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  statusIcon: {
    fontSize: 72,
    marginBottom: 16,
  },
  verdictTitle: {
    fontSize: 34,
    fontWeight: '900',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: 1,
  },
  verdictSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 32,
    lineHeight: 24,
    paddingHorizontal: 8,
  },
  priceRow: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 40,
  },
  priceText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  actionButton: {
    width: '100%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  // Dynamic matching action button surfaces
  btnApproved: {
    backgroundColor: '#111111', // Dark contrast button for clean green layout look
  },
  btnBlocked: {
    backgroundColor: '#ffffff', // Clean white contrast button against heavy red warning blocks
  },
  actionButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#ffffff', 
  },
  // Quick override handler for the white warning button text color
  btnBlockedText: {
    color: '#c62828',
  }
});
