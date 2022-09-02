import React, { useCallback } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import DATA from '../../DummyData';
import { Colors, globlaStyles } from '../../Themes';
import CartItem from './CartItem';
import { DataItem } from './Interface';
import TotalPrice from './TotalPrice';

const Cart = () => {
  const renderItem = useCallback((item: DataItem) => {
    return <CartItem key={`CartItem_${item.id}`} data={item} />;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={globlaStyles.sectionTitle}>Keranjang</Text>
      {DATA.map(renderItem)}
      <TotalPrice />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.prussianBlue,
    paddingBottom: 8,
  },
});

export default Cart;
