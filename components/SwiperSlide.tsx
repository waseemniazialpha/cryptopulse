import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import Swiper from 'react-native-swiper';
import SplashScreenOne from '../screens/SplashScreenOne';
import SplashScreenTwo from '../screens/SplashScreenTwo';
import LoginScreen from '../screens/LoginScreen';
const SwiperSlide = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showPagination, setShowPagination] = useState(false);
    const [redirectToLogin, setRedirectToLogin] = useState(false);
  
    const handleIndexChanged = (index: React.SetStateAction<number>) => {
      setCurrentIndex(index);
    };
  
    useEffect(() => {
      const timeout = setTimeout(() => {
        setShowPagination(true);
      }, 2000);
  
      return () => clearTimeout(timeout);
    }, []);
  
    const handleMomentumScrollEnd = () => {
  
      if (currentIndex === 1) {
  
        setTimeout(() => {
          setRedirectToLogin(true);
        }, 2000);
      }
    };
  
    if (redirectToLogin) {
      return <LoginScreen />;
    }
  
    return (
      <Swiper
        loop={false}
        showsPagination={showPagination}
        index={currentIndex}
        paginationStyle={{ bottom: 10 }}
        onIndexChanged={handleIndexChanged}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        dotColor="#3E475A"
        activeDotColor="#6D778B"
      >
        <View>
          <SplashScreenOne />
        </View>
        <View>
          <SplashScreenTwo />
        </View>
  
      </Swiper>
    );
  };
export default SwiperSlide
