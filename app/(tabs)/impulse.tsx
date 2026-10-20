import { useState, useEffect } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter, useIsFocused } from 'expo-router'; // Added useIsFocused to refresh data when tab changes
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import local storage

export default function Impulse() {
  const router = useRouter();
  const isFocused = useIsFocused(); // Returns true whenever this specific tab is open on screen

  // Form Inputs State
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0.0);

  // Yes/No Core Questions State
  const [useOften, setUseOften] = useState<boolean>(false);
  const [improvesLife, setImprovesLife] = useState<boolean>(false);

  // NEW HOOK STATES: For Strict Mode condition matching
  const [isStrictModeActive, setIsStrictModeActive] = useState<boolean>(false);
  const [waited48Hours, setWaited48Hours] = useState<boolean>(false); // Answer to Question 3

  // READ LOCAL STORAGE NOTEPAD EVERY TIME THIS TAB BECOMES ACTIVE
  useEffect(() => {
    if (isFocused) {
      checkStrictModeStatus();
    }
  }, [isFocused]);

  async function checkStrictModeStatus() {
    try {
      const value = await AsyncStorage.getItem('strictMode');
      setIsStrictModeActive(value === 'true');
    } catch (error) {
      console.log("Error reading storage:", error);
    }
  }

  function handleVerdict(){
    // Passing all inputs, core questions, AND strict mode details to the verdict screen!
    router.push({
      pathname: '/verdict',
      params: { 
        name: name, 
        price: price.toString(),
        useOften: useOften.toString(),        
        improvesLife: improvesLife.toString(),
        strictMode: isStrictModeActive.toString(), // Tell verdict screen if strict rules apply
        waited48Hours: waited48Hours.toString()     // Tell verdict screen answer to question 3
      }
    });
  }

  return (
    <ScrollView style={styles.scrollWrapper} contentContainerStyle={styles.container}>
      <StatusBar style="auto"/>
      <Text style={styles.title}>Impulse Control</Text>

      {/* INPUT FORM BLOCK */}
      <View style={styles.formCard}>
        <Text style={styles.sectionLabel}>Item Name</Text>
        <TextInput
          style={styles.inputField}
          placeholder="e.g., Sneakers"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.sectionLabel}>Price</Text>
        <TextInput
          style={styles.inputField}
          placeholder="e.g., 100"
          value={price === 0 ? "" : price.toString()} 
          onChangeText={(text) => setPrice(parseFloat(text) || 0)} 
          keyboardType="numeric" 
        />
      </View>

      {/* QUESTIONS BLOCK */}
      <View style={styles.formCard}>
        <Text style={styles.sectionHeading}>
          Evaluation Questions {isStrictModeActive ? "🔥 (STRICT)" : ""}
        </Text>

        {/* Question 1 Row */}
        <View style={styles.questionRow}>
          <Text style={styles.questionText}>Will I use this at least 3 times a week?</Text>
          <Pressable 
            style={[styles.checkbox, useOften ? styles.checkboxYes : styles.checkboxNo]}
            onPress={() => setUseOften(!useOften)}
          >
            <Text style={styles.checkboxLabelText}>{useOften ? "YES" : "NO"}</Text>
          </Pressable>
        </View>

        {/* Question 2 Row */}
        <View style={styles.questionRow}>
          <Text style={styles.questionText}>Will this improve my productivity/health?</Text>
          <Pressable 
            style={[styles.checkbox, improvesLife ? styles.checkboxYes : styles.checkboxNo]}
            onPress={() => setImprovesLife(!improvesLife)}
          >
            <Text style={styles.checkboxLabelText}>{improvesLife ? "YES" : "NO"}</Text>
          </Pressable>
        </View>

        {/* NEW CONDITIONAL LAYOUT: Only renders the 3rd question if strict mode is ON */}
        {isStrictModeActive && (
          <View style={[styles.questionRow, styles.strictRowBorder]}>
            <Text style={[styles.questionText, styles.strictText]}>
              Can I wait 48 hours before tapping buy?
            </Text>
            <Pressable 
              style={[styles.checkbox, waited48Hours ? styles.checkboxYes : styles.checkboxNo]}
              onPress={() => setWaited48Hours(!waited48Hours)}
            >
              <Text style={styles.checkboxLabelText}>{waited48Hours ? "YES" : "NO"}</Text>
            </Pressable>
          </View>
        )}
      </View>

      <Pressable style={styles.button} onPress={handleVerdict}>
        <Text style={styles.buttonText}>Generate Verdict</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollWrapper: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    justifyContent: 'flex-start', 
    paddingTop: 40,               
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionLabel: { 
    fontSize: 14, 
    fontWeight: 'bold', 
    color: '#495057', 
    marginBottom: 8, 
    textTransform: 'uppercase' 
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  button: {
    backgroundColor: '#2e7d32', 
    padding: 16,               
    borderRadius: 8,           
    alignItems: 'center',      
    marginTop: 10,             
  },
  buttonText: {
    color: '#ffffff',          
    fontWeight: 'bold',        
    fontSize: 16,              
  },
  formCard: { 
    backgroundColor: '#ffffff', 
    padding: 16, 
    borderRadius: 12, 
    marginBottom: 20, 
    borderWidth: 1,
    borderColor: '#e1e4e8', 
  },
  inputField: { 
    backgroundColor: '#f1f3f5', 
    padding: 14, 
    borderRadius: 8, 
    fontSize: 16, 
    marginBottom: 16 
  },
  questionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    gap: 12,
  },
  strictRowBorder: {
    borderTopWidth: 1,
    borderTopColor: '#ffebee',
    paddingTop: 12,
    marginTop: 12,
  },
  questionText: {
    fontSize: 15,
    color: '#333333',
    flex: 1,
  },
  strictText: {
    color: '#c62828', // Draws the 3rd question text in bold red to indicate it is a strict condition
    fontWeight: '600',
  },
  checkbox: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
    minWidth: 60,
    alignItems: 'center',
  },
  checkboxYes: {
    backgroundColor: '#2e7d32', 
  },
  checkboxNo: {
    backgroundColor: '#666666', 
  },
  checkboxLabelText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 12,
  },
});
