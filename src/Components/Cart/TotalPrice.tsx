import React, { useCallback, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { formatCurrency } from '../../Helper/Format';
import { getRef, GlobalRefObject, setRef } from '../../Helper/GlobalRef';
import { Colors, globlaStyles } from '../../Themes';

const TotalPrice = () => {
  const [total, setTotal] = useState(0);
  setRef('setTotal', setTotal);
  setRef('totalPrice', total);

  const checkout = useCallback(() => {
    const refs: GlobalRefObject = getRef;
    const checkedoutItem: any[] = [];
    Object.keys(refs)
      .filter(key => key.includes('checkoutItems_'))
      .map(key => refs[key]?.qty && checkedoutItem.push(refs[key]));
    Alert.alert('Checkout Items', JSON.stringify(checkedoutItem));
  }, []);

  return (
    <View style={styles.containerTotal}>
      <View>
        <Text style={styles.totalTitleStyle}>Total</Text>
        <Text style={styles.totalValueStyle}>{formatCurrency(total)}</Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.buttonCheckout}
        onPress={() => checkout()}>
        <Text style={globlaStyles.whiteText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TotalPrice;

const styles = StyleSheet.create({
  containerTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonCheckout: {
    padding: 8,
    backgroundColor: Colors.cerulean,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  totalTitleStyle: { color: Colors.prussianBlue },
  totalValueStyle: { color: Colors.black, fontSize: 16, fontWeight: '700' },
});
