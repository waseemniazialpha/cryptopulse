// // App.js
// import React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import SwiperSlide from './components/SwiperSlide';
// import Dashboard from './screens/Dashboard';

// const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

// const MainNavigator = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="SwiperSlide" component={SwiperSlide} />
//         <Stack.Screen name="Main" component={MainTabs} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// const MainTabs = () => {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Dashboard" component={Dashboard} />
//       {/* Add more tabs/screens as needed */}
//     </Tab.Navigator>
//   );
// };

// export default MainNavigator;
