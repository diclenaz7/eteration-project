import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {COLORS} from '../../constants/colors';

const CartItem = ({item, onIncrement, onDecrement}) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: item.image}} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.price}>{item.price} ₺</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.decrementButton}
          onPress={() => onDecrement(item)}>
          <Text style={styles.quantityButton}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.count}</Text>
        <TouchableOpacity
          style={styles.incrementButton}
          onPress={() => onIncrement(item)}>
          <Text style={styles.quantityButton}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    width: windowWidth * 0.95,
    justifyContent: 'space-between',
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  infoContainer: {
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: COLORS.secondary,
    marginTop: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  quantityButton: {
    fontSize: 18,
    paddingHorizontal: 8,
    paddingVertical: 4,
    color: 'white',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    width: 25,
    textAlign: 'center',
  },
  decrementButton: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: COLORS.primary,
    marginRight: 5,
  },
  incrementButton: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: COLORS.primary,
    marginLeft: 5,
  },
});

export default CartItem;
