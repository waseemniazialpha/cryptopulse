import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet, Image } from 'react-native';

const SplashScreenOne = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    setTimeout(() => {
      setLoading(false);
    }, 3000); 
  }, []);

  return (
    <ImageBackground
      source={require('../assets/back.png')}
      style={styles.backgroundImage}>
      {loading ? (
        <View style={styles.loaderContainer}>
          
          <ImageBackground
            source={require('../assets/back1.png')}
            style={styles.backgroundImage}
          >
          </ImageBackground>
        </View>
      ) : (
        <View style={styles.content}>
          <Image source={require('../assets/Line.png')}/>
          <Text style={styles.text}>Monitor Crypto Currencies</Text>
          <Text style={styles.text2}>Our engine provides real-time monitoring of cryptocurrencies so you are always up to date</Text>
        </View>
      )}
      {!loading && (
        <View style={styles.dotDiv}>
       
          <View style={styles.dot} />
          <View style={styles.dot} />
          
        </View>
      )}
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
    textAlign:'center',
  },
  text2: {
    color: '#6D778B',
    fontSize: 14,
    width: 244,
    fontFamily: 'SF-Pro-Text-Medium',
    lineHeight:22,
    textAlign:'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content:{
    display:'flex',
    height:'100%',
    gap:10,
    paddingBottom:50,
    justifyContent:'flex-end',
    alignItems:'center',
   
  },
  dotDiv:{
    display:'flex',
    flexDirection:'row',
    gap:5,
  },
  dot:{
    width:7,
    height:7,
    backgroundColor:'#6D778B',
    borderRadius:5,
    marginBottom:20,
    marginTop:25
  }
});

export default SplashScreenOne;
