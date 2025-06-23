import React from 'react';
import { Platform, UIManager } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import LandingPage from './screens/LandingPage';
import FavoritesScreen from './screens/FavoritesScreen'; 

// Enable LayoutAnimation on Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen
          name="Landing"
          component={LandingPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
