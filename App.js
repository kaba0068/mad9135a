import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [storedValue, setStoredValue] = useState("");

  // Load stored value on component mount
  useEffect(() => {
    const loadStoredValue = async () => {
      try {
        const value = await AsyncStorage.getItem("myKey");
        if (value !== null) {
          setStoredValue(value);
        }
      } catch (e) {
        console.error("Failed to load data", e);
      }
    };
    loadStoredValue();
  }, []);

  // Store value in AsyncStorage
  const storeData = async () => {
    try {
      await AsyncStorage.setItem("myKey", inputValue);
      setStoredValue(inputValue);
      Alert.alert("Success", "Data saved successfully!");
    } catch (e) {
      console.error("Failed to save data", e);
    }
  };

  // Clear stored value from AsyncStorage
  const clearData = async () => {
    try {
      await AsyncStorage.removeItem("myKey");
      setStoredValue("");
      Alert.alert("Success", "Data cleared successfully!");
    } catch (e) {
      console.error("Failed to clear data", e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AsyncStorage Demo</Text>

      <TextInput
        style={styles.input}
        placeholder="Type something..."
        value={inputValue}
        onChangeText={setInputValue}
      />

      <Button title="Save" onPress={storeData} />

      <View style={styles.spacer} />

      {storedValue ? (
        <View>
          <Text style={styles.text}>Stored Value: {storedValue}</Text>
          <Button title="Clear" onPress={clearData} />
        </View>
      ) : (
        <Text style={styles.text}>No data stored yet</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: "100%",
    marginBottom: 20,
    padding: 10,
  },
  text: {
    fontSize: 18,
    marginVertical: 10,
  },
  spacer: {
    height: 20,
  },
});