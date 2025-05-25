import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function TemplatesScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Controller Templates</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.description}>
          Choose from pre-configured controller layouts or create your own custom template.
        </Text>
        {/* Template list will be added here */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
}); 