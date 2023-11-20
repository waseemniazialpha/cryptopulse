// DashboardContent.js
import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Settings = () => {
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = async () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
    setIsLoggedIn(false);
  };
  return (
    <ImageBackground
      source={require('../assets/dashboard.png')}
      style={{ width: '100%', height: '100%' }}
    >
      <View style={styles.container}>
        <Text style={{ color: 'white', fontSize: 24 }}>Settings</Text>
        <TouchableOpacity onPress={handleLogout}>
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

export default Settings;
