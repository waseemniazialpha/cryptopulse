import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SwiperSlide from './components/SwiperSlide';
import LoginScreen from './screens/LoginScreen';
import Dashboard from './screens/Dashboard';

const Stack = createStackNavigator();

const App = () => {
  const [showSwiper, setShowSwiper] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSwiper(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={showSwiper ? 'Swiper' : 'Login'}>
        <Stack.Screen name="Swiper" component={SwiperSlide} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Dashboard} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;