import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

// Import screens
import HomeScreen from './components/screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f5f5f5',
          },
          headerTintColor: '#333',
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            title: 'FreeDroidJoy',
            headerShown: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
