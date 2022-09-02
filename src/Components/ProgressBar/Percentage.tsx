import React, { useEffect, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Colors } from '../../Themes';
import { PercentageProps } from './Interface';

const Percentage: React.FC<PercentageProps> = ({ progressBar }) => {
  const [percentage, setPercentage] = useState(0);
  useEffect(() => {
    progressBar?.addListener?.((value: any) => {
      setPercentage(value.value);
    });
    return () => {
      progressBar.removeAllListeners();
    };
  }, [progressBar]);

  return (
    <Text style={styles.percentageText}>{`${percentage.toFixed(0)}%`}</Text>
  );
};

export default Percentage;

const styles = StyleSheet.create({
  percentageText: { textAlign: 'right', color: Colors.black },
});
