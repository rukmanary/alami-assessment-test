/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet } from 'react-native';
import { Cart, DeviceInfo, ProgressBar } from './src/Components';
import { Colors } from './src/Themes';

const App = () => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={Colors.prussianBlue}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.containerScrollView}>
        <DeviceInfo />
        <Cart />
        <ProgressBar />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: Colors.white },
  containerScrollView: { padding: 24 },
});

export default App;
