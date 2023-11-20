import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import Notification from './Notification';
import Settings from './Settings';
import DashboardContent from './DashboardContent';

const Dashboard = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          paddingTop: 0,
          backgroundColor: '#111622',
          borderTopWidth: 0,
          activeTintColor: '#3349FF',
          inactiveTintColor: '#25304B',
        },
        tabBarIcon: ({ color, size }) => {
          let iconSource;

          if (route?.name === 'Home') {
            iconSource = require('../assets/homeIconFocused.png');
          } else if (route?.name === 'Notification') {
            iconSource = require('../assets/notificationsIconFocused.png');
          } else if (route?.name === 'Setting') {
            iconSource = require('../assets/settingsIconFocused.png');
          } else {
            // Add a default icon source if needed
          }

          return (
            <Image
              source={iconSource}
              style={{ width: 20, height: 20, tintColor: color }}
            />
          );
        },
        tabBarShowLabel: false, 
      })}
    >
      <Tab.Screen name="Home" component={DashboardContent} />
      <Tab.Screen name="Notification" component={Notification} />
      <Tab.Screen name="Setting" component={Settings} />
    </Tab.Navigator>
  );
};

export default Dashboard;
