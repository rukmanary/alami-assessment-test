import React, { useCallback, useRef, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Colors, globlaStyles } from '../../Themes';
import Percentage from './Percentage';

const ProgressBar = () => {
  const [isFinished, setIsFinished] = useState(false);
  const progressBarWidth = useRef(new Animated.Value(0)).current;
  const animatedWidth = progressBarWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  const startAnimation = useCallback(
    (isRestart: boolean) => {
      if (isRestart) {
        setIsFinished(false);
        progressBarWidth.setValue(0);
      }
      Animated.timing(progressBarWidth, {
        toValue: 100,
        duration: 5000,
        useNativeDriver: false,
      }).start(r => {
        if (r.finished) {
          setIsFinished(true);
        }
      });
    },
    [progressBarWidth],
  );

  const stopAnimation = useCallback(
    () => progressBarWidth.stopAnimation(),
    [progressBarWidth],
  );

  const animatedStyle = {
    backgroundColor: Colors.prussianBlue,
    height: 20,
    borderRadius: 32,
    width: animatedWidth,
  };

  return (
    <View style={styles.container}>
      <Text style={globlaStyles.sectionTitle}>Progress Bar</Text>
      <View style={styles.containerButton}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.containerStart}
          onPress={() => startAnimation(isFinished)}>
          <Text style={[styles.textButton, globlaStyles.whiteText]}>{`${
            isFinished ? 'Restart' : 'Start'
          } Animation`}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[
            styles.containerStart,
            { backgroundColor: Colors.yellowGoldenDream },
          ]}
          onPressIn={stopAnimation}
          onPressOut={() => startAnimation(false)}>
          <Text style={styles.textButton}>Pause Animation</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.baseLine}>
        <Animated.View style={animatedStyle} />
        <Text style={styles.textSalam}>Assalamualaikum, ALAMI</Text>
      </View>
      <Percentage progressBar={progressBarWidth} />
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  container: { flex: 1, marginVertical: 8 },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerStart: {
    padding: 8,
    backgroundColor: Colors.mountainMeadow,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
    maxWidth: 120,
  },
  textButton: { color: Colors.black, fontSize: 12 },
  baseLine: {
    width: '100%',
    borderRadius: 32,
    height: 20,
    backgroundColor: Colors.mystic,
  },
  textSalam: {
    color: Colors.mystic,
    alignSelf: 'center',
    position: 'absolute',
  },
});
