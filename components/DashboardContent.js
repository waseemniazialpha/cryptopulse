// DashboardContent.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const DashboardContent = () => {
  const handleLogout = async () => {
    try {
      // Assuming setIsLoggedIn is a state-setting function from useState
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  return (
    <ImageBackground
      source={require('../assets/dashboard.png')}
      style={{ width: '100%', height: '100%' }}
    >
      <View style={styles.container}>
        <Text style={{ color: 'white', fontSize: 24 }}>Welcome to Dashboard</Text>
        <TouchableOpacity>
          <Text style={{ color: 'gray', fontSize: 20 }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DashboardContent;
