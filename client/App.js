import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';

// Import screens
import HomeScreen from './components/screens/HomeScreen';
import TemplatesScreen from './components/screens/TemplatesScreen';
import JoystickScreen from './components/screens/JoystickScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f5f5f5',
          },
          headerTintColor: '#333',
          drawerStyle: {
            backgroundColor: '#fff',
            width: 240,
          },
          drawerActiveTintColor: '#2196F3',
          drawerInactiveTintColor: '#666',
        }}
      >
        <Drawer.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            title: 'Home',
          }}
        />
        <Drawer.Screen 
          name="Templates" 
          component={TemplatesScreen}
          options={{
            title: 'Templates',
          }}
        />
        <Drawer.Screen 
          name="Joystick" 
          component={JoystickScreen}
          options={{
            title: 'Joystick',
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});
