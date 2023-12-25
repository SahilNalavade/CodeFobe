import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const UserDetails = ({ user, isDarkMode }) => {
  return (
    <View style={[styles.container, isDarkMode ? styles.darkMode : styles.lightMode]}>
      <Image source={{ uri: user.avatar }} style={styles.avatar} />
      <View style={styles.detailsContainer}>
        {renderDetail('ID', user.id, isDarkMode)}
        {renderDetail('UID', user.uid, isDarkMode)}
        {renderDetail('First Name', user.first_name, isDarkMode)}
        {renderDetail('Last Name', user.last_name, isDarkMode)}
        {renderDetail('Username', user.username, isDarkMode)}
        {renderDetail('Email', user.email, isDarkMode)}
      </View>
    </View>
  );
};

const renderDetail = (label, value, isDarkMode) => (
  <View style={[styles.detailContainer, isDarkMode ? styles.darkModeDetail : null]} key={label}>
    <Text style={[styles.label, isDarkMode ? styles.darkModeText : styles.lightModeText, styles.boldText]}>{label}</Text>
    <Text style={[styles.value, isDarkMode ? styles.darkModeText : styles.lightModeText]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 16,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 20,
    borderWidth: 5,
    borderColor: '#bdc3c7',
  },
  detailsContainer: {
    width: '100%',
  },
  detailContainer: {
    marginBottom: 20,
  },
  darkModeDetail: {
    backgroundColor: '#2c3e50',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  value: {
    fontSize: 18,
  },
  boldText: {
    fontWeight: 'bold',
  },
  darkModeText: {
    color: '#fff', // White text for dark mode
  },
  lightModeText: {
    color: '#000', // Black text for light mode
  },
  
});

export default UserDetails;
