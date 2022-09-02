import React, { memo, useCallback, useMemo, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { formatCurrency } from '../../Helper/Format';
import { callRef, getRef, setRef } from '../../Helper/GlobalRef';
import { Colors } from '../../Themes';
import { getNewHeight, SCREEN_WIDTH } from '../../Themes/Dimensions';
import CartNote from './CartNote';
import { CalculatePrice, CartItemProps, SetDataItem } from './Interface';

// screen width 360 as reference
const IMG_WIDTH = SCREEN_WIDTH / 6;
const IMG_HEIGHT = getNewHeight({
  newWidth: IMG_WIDTH,
  oldHeight: 60,
  oldWidth: 60,
});
const TOTAL_WIDTH = SCREEN_WIDTH / 9;

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const [total, setTotal] = useState<number>(0);
  const imgSrc = useMemo(() => ({ uri: data.image }), [data.image]);
  const setPrice = useCallback(({ operator, price }: CalculatePrice) => {
    const calculatePrice = callRef('setTotal') || undefined;
    const totalPrice = callRef('totalPrice') || 0;
    const sum =
      operator === 'addition' ? totalPrice + price : totalPrice - price;
    calculatePrice?.(sum);
  }, []);

  const setItem = useCallback(
    ({ dataItem, qty }: SetDataItem) => {
      const refs = getRef;
      const refName = `checkoutItems_${data.id}`;
      if (qty === 0 && refs[refName]?.id) {
        delete refs[refName];
        return;
      }
      let temp = { ...dataItem };

      if (refs[refName]?.note) {
        temp = { ...temp, ...refs[refName] };
      }

      const checkedoutItem = {
        ...temp,
        qty,
        totalPrice: data.price * qty,
      };

      setRef(refName, checkedoutItem);
    },
    [data],
  );

  const increment = useCallback(() => {
    setTotal(total + 1);
    setPrice({ operator: 'addition', price: data.price });
    setItem({ dataItem: data, qty: total + 1 });
  }, [total, setPrice, setItem, data]);

  const decrement = useCallback(() => {
    setTotal(total - 1);
    setPrice({ operator: 'subtraction', price: data.price });
    setItem({ dataItem: data, qty: total - 1 });
  }, [total, setPrice, setItem, data]);

  return (
    <View style={styles.container}>
      <View style={styles.firstSection}>
        <Image source={imgSrc} style={styles.imageStyle} />
        <View style={styles.textContainer}>
          <Text numberOfLines={1} style={styles.productTitle}>
            {data.name}
          </Text>
          <Text numberOfLines={1} style={styles.productPrice}>
            {formatCurrency(data.price)}
          </Text>
        </View>
      </View>
      <View style={styles.secondSection}>
        <CartNote id={data.id} />
        <View style={styles.containerAddToCart}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.buttonCart}
            disabled={total === 0}
            onPress={decrement}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <View style={styles.containerTotal}>
            <Text
              style={styles.totalStyle}
              ref={r => setRef(`totalPrice_${data.id}`, r)}>
              {total || 0}
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.buttonCart}
            onPress={increment}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderWidth: StyleSheet.hairlineWidth,
    marginVertical: 8,
    borderRadius: 8,
    borderColor: Colors.prussianBlue,
  },
  firstSection: { flexDirection: 'row' },
  imageStyle: { width: IMG_WIDTH, height: IMG_HEIGHT },
  textContainer: { marginLeft: 8 },
  productTitle: { color: Colors.prussianBlue },
  productPrice: { fontWeight: 'bold', color: Colors.black },
  secondSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  containerAddToCart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonCart: {
    backgroundColor: Colors.prussianBlue,
    width: 24,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: { color: Colors.white, fontSize: 18 },
  containerTotal: {
    width: TOTAL_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.prussianBlue,
    marginHorizontal: 8,
  },
  totalStyle: { color: Colors.black },
});

export default memo(CartItem);
