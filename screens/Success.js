import { ImageBackground } from 'react-native'
import React from 'react'

const Success = () => {
  return (
    <ImageBackground
    source={require('../assets/success.png')}
    style={{width:'100%',height:'100%'}}
    ></ImageBackground>
  )
}

export default Success