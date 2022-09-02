import React, { useCallback } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Colors, globlaStyles } from '../../Themes';
import { NativeModules } from 'react-native';

const { DeviceInfoModule } = NativeModules;

const DeviceInfo = () => {
  const getDeviceID = useCallback(() => {
    DeviceInfoModule.getDeviceID((deviceID: any) => {
      Alert.alert('Device ID:', deviceID);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={globlaStyles.sectionTitle}>Device Info</Text>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.buttonStyle}
        onPress={getDeviceID}>
        <Text style={globlaStyles.whiteText}>Get Device ID</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DeviceInfo;

const styles = StyleSheet.create({
  container: { flex: 1, marginBottom: 8 },
  buttonStyle: {
    backgroundColor: Colors.cerulean,
    borderRadius: 24,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
});
