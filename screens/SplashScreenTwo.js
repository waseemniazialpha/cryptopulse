// SplashScreenTwo.js
import React from 'react';
import { View, Text, Image, ImageBackground, StyleSheet } from 'react-native';

const SplashScreenTwo = () => {
  return (
    <ImageBackground
      source={require('../assets/back3.png')}
      style={styles.backgroundImage}>
      <View style={styles.content}>
        <Image source={require('../assets/Line.png')} />
        <Text style={styles.text}>Set Custom Notifications</Text>
        <Text style={styles.text2}>Set custom notifications to be notified about rise and fall of crypto currencies</Text>

      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  text: {
    color: 'white',
    fontSize: 28,
    width: 279,
    fontFamily: 'SF-Pro-Text-Regular',
    textAlign: 'center',
  },
  text2: {
    color: '#6D778B',
    fontSize: 14,
    width: 244,
    fontFamily: 'SF-Pro-Text-Medium',
    lineHeight: 22,
    textAlign: 'center',
  },
  content: {
    display: 'flex',
    height: '100%',
    gap: 10,
    paddingBottom:50,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  dotDiv: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
  },
  dot: {
    width: 7,
    height: 7,
    backgroundColor: '#6D778B',
    borderRadius: 5,
    marginBottom: 20,
    marginTop: 25,
  },
});

export default SplashScreenTwo;
