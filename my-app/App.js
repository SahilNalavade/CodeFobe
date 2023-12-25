import React, { useState, useEffect } from 'react';
import UserDetails from './UserDetails';
import NavigationButtons from './NavigationButtons';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const lightModeIcon = require('./assets/dark1.png');
const darkModeIcon = require('./assets/light1.png');

const API_URL = 'https://random-data-api.com/api/users/random_user?size=80';

const App = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [userHistory, setUserHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  const handleNext = () => {
    if (historyIndex < userHistory.length - 1) {
      setHistoryIndex((prevIndex) => prevIndex + 1);
      setUserData(userHistory[historyIndex + 1]);
    }
  };

  const handlePrevious = () => {
    if (historyIndex > 0) {
      setHistoryIndex((prevIndex) => prevIndex - 1);
      setUserData(userHistory[historyIndex - 1]);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <View style={[styles.container, isDarkMode && styles.darkMode]}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <UserDetails user={userData} isDarkMode={isDarkMode} />
          <NavigationButtons onPrevious={handlePrevious} onNext={handleNext} />
          <TouchableOpacity style={styles.toggleButton} onPress={toggleDarkMode}>
            <Image source={isDarkMode ? lightModeIcon : darkModeIcon} style={styles.toggleIcon} />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
  
};

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
