import { StyleSheet } from 'react-native';
import Colors from './Color';

export const globlaStyles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.prussianBlue,
  },
  whiteText: { fontSize: 12, color: Colors.white },
});

export { default as Colors } from './Color';
