import React, { useState, useEffect } from 'react';
import UserDetails from './UserDetails';
import NavigationButtons from './NavigationButtons';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

// Importing icons for light and dark mode
const lightModeIcon = require('./assets/dark1.png');
const darkModeIcon = require('./assets/light1.png');

// API URL to fetch user data
const API_URL = 'https://random-data-api.com/api/users/random_user?size=80';

const App = () => {
  // State variables
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [userHistory, setUserHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Fetch user data from the API
  const fetchUserData = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setUserHistory(data);
      setHistoryIndex(0);
      setUserData(data[0]);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Move to the next user in the history
  const handleNext = () => {
    if (historyIndex < userHistory.length - 1) {
      setHistoryIndex((prevIndex) => prevIndex + 1);
      setUserData(userHistory[historyIndex + 1]);
    }
  };

  // Move to the previous user in the history
  const handlePrevious = () => {
    if (historyIndex > 0) {
      setHistoryIndex((prevIndex) => prevIndex - 1);
      setUserData(userHistory[historyIndex - 1]);
    }
  };

  // Toggle between light and dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  // Fetch user data on component mount
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <View style={[styles.container, isDarkMode && styles.darkMode]}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          {/* Display user details component */}
          <UserDetails user={userData} isDarkMode={isDarkMode} />

          {/* Navigation buttons for moving between user history */}
          <NavigationButtons onPrevious={handlePrevious} onNext={handleNext} />

          {/* Toggle button for changing between light and dark mode */}
          <TouchableOpacity style={styles.toggleButton} onPress={toggleDarkMode}>
            <Image source={isDarkMode ? lightModeIcon : darkModeIcon} style={styles.toggleIcon} />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkMode: {
    backgroundColor: '#2c3e50',
  },
  toggleButton: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
  toggleIcon: {
    width: 51,
    height: 20,
  },
});

export default App;
