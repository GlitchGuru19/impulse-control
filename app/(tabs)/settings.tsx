import { useState, useEffect } from 'react'; 
import { Pressable, StyleSheet, Text, View, ScrollView } from 'react-native';
// IMPORT local storage
import AsyncStorage from '@react-native-async-storage/async-storage'; 

export default function Settings() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isStrictMode, setIsStrictMode] = useState<boolean>(false);
  const [currency, setCurrency] = useState<string>("K"); 

  // LOAD SAVED SETTINGS WHEN PAGE OPENS
  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      const savedStrict = await AsyncStorage.getItem('strictMode');
      if (savedStrict !== null) {
        setIsStrictMode(savedStrict === 'true');
      }
    } catch (error) {
      console.log("Error loading settings:", error);
    }
  }

  // SAVE STRICT MODE TO LOCAL STORAGE ON TOGGLE
  async function toggleStrictMode() {
    const newValue = !isStrictMode;
    setIsStrictMode(newValue);
    try {
      // Saves the key 'strictMode' as a string "true" or "false"
      await AsyncStorage.setItem('strictMode', newValue.toString());
      console.log("Saved Strict Mode status:", newValue);
    } catch (error) {
      console.log("Error saving strict mode:", error);
    }
  }

  function handleCurrency(){
    if (currency === "K") {
      setCurrency("$");
    } else {
      setCurrency("K");
    }
  }

  function handleSave() {
    console.log("Preferences confirmed.");
  }

  function handleClear() {
    console.log("Clear History Log triggered");
  }

  return (
    // UPGRADED: Changed to ScrollView so settings can grow safely!
    <ScrollView style={styles.scrollWrapper} contentContainerStyle={styles.container}>
      
      <View style={styles.formCard}>
        
        {/* Strict Rules Row Option */}
        <View style={styles.settingRow}>
          <Text style={styles.cardText}>Strict Rules Mode</Text>
          <Pressable 
            style={[styles.toggleButton, isStrictMode ? styles.toggleOn : styles.toggleOff]} 
            onPress={toggleStrictMode} // Calls our new database saving function!
          >
            <Text style={styles.toggleButtonText}>{isStrictMode ? "ON" : "OFF"}</Text>
          </Pressable>
        </View>

        {/* Dark Mode Row Option */}
        <View style={styles.settingRow}>
          <Text style={styles.cardText}>Dark Mode Theme</Text>
          <Pressable 
            style={[styles.toggleButton, isDarkMode ? styles.toggleOn : styles.toggleOff]} 
            onPress={() => setIsDarkMode(!isDarkMode)} 
          >
            <Text style={styles.toggleButtonText}>{isDarkMode ? "ON" : "OFF"}</Text>
          </Pressable>
        </View>

        {/* Currency Row Option */}
        <View style={styles.settingRow}>
          <Text style={styles.cardText}>Active Currency</Text>
          <Pressable style={[styles.toggleButton, styles.currencyButton]} onPress={handleCurrency}>
            <Text style={styles.toggleButtonText}>[ {currency} ]</Text> 
          </Pressable>
        </View>

      </View>
      
      <Pressable style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Preferences</Text>
      </Pressable>

      <Pressable style={[styles.button, styles.dangerButton]} onPress={handleClear}>
        <Text style={styles.buttonText}>Clear History</Text>
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
  formCard: { 
    backgroundColor: '#ffffff', 
    padding: 16, 
    borderRadius: 12, 
    marginBottom: 20, 
    borderWidth: 1,
    borderColor: '#e1e4e8',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
    paddingVertical: 12,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  toggleButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 70,
    alignItems: 'center',
  },
  currencyButton: {
    backgroundColor: '#111111',
  },
  toggleOn: {
    backgroundColor: '#2e7d32', 
  },
  toggleOff: {
    backgroundColor: '#666666', 
  },
  toggleButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#2e7d32', 
    padding: 16,               
    borderRadius: 8,           
    alignItems: 'center',      
    marginTop: 12,             
  },
  dangerButton: {
    backgroundColor: '#c62828', 
  },
  buttonText: {
    color: '#ffffff',          
    fontWeight: 'bold',        
    fontSize: 16,              
  },
});
