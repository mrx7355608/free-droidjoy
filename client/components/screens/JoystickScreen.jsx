import React from 'react';
import { View, StyleSheet } from 'react-native';
import Joystick from '../../Joystick';

export default function JoystickScreen() {
  return (
    <View style={styles.container}>
      <Joystick />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
}); 