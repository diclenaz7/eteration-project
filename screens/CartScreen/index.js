import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import CartItem from '../../components/Cart/CartItem';
import {setCartItems} from './actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {addToCart, removeFromCart} from '../HomeScreen/actions';

const CartScreen = ({cartItems, setCartItems}) => {
  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = async () => {
    try {
      const storedItems = await AsyncStorage.getItem('cartItems');
      console.log('Stored Items', storedItems);
      if (storedItems !== null) {
        setCartItems(JSON.parse(storedItems));
      }
    } catch (error) {
      console.error('Error loading cart items:', error);
    }
  };

  const saveCartItems = async () => {
    try {
      await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart items:', error);
    }
  };

  const handleIncrement = async item => {
    try {
      const storedItems = await AsyncStorage.getItem('cartItems');
      let cartItems = [];
      if (storedItems !== null) {
        cartItems = JSON.parse(storedItems);
      }
      const existingCartItemIndex = cartItems.findIndex(
        cartItem => cartItem.id === item.id,
      );
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingCartItemIndex].count += 1;
      await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      addToCart(updatedCartItems[existingCartItemIndex]);
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  const handleDecrement = async item => {
    try {
      const storedItems = await AsyncStorage.getItem('cartItems');
      let cartItems = [];
      if (storedItems !== null) {
        cartItems = JSON.parse(storedItems);
      }
      const existingCartItemIndex = cartItems.findIndex(
        cartItem => cartItem.id === item.id,
      );
      const updatedCartItems = [...cartItems];
      if (updatedCartItems[existingCartItemIndex].count > 1) {
        updatedCartItems[existingCartItemIndex].count -= 1;
        await AsyncStorage.setItem(
          'cartItems',
          JSON.stringify(updatedCartItems),
        );
        setCartItems(updatedCartItems);
      } else {
        removeFromCart(item.id);
        setCartItems(
          updatedCartItems.filter(cartItem => cartItem.id !== item.id),
        );
      }
    } catch (error) {
      console.error('Error decrementing product count:', error);
    }
  };

  useEffect(() => {
    saveCartItems();
  }, [cartItems]);

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <Text>Your cart is empty</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <CartItem
              item={item}
              onIncrement={() => handleIncrement(item)}
              onDecrement={() => handleDecrement(item)}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

const mapStateToProps = state => ({
  cartItems: state.cart.cartItems,
});

const mapDispatchToProps = {
  setCartItems,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
