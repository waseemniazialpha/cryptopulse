import { View, Text ,ImageBackground,StyleSheet} from 'react-native'
import React from 'react'

const SplashScreen = () => {
  return (
    <ImageBackground
      source={require('../assets/back1.png')}
      style={styles.backgroundImage}>

    </ImageBackground>
  )
}
const styles = StyleSheet.create({
    backgroundImage: {
      height: '100%',
      width: '100%',
      resizeMode: 'cover',
    },})
export default SplashScreen