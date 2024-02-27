/** Dicle Naz Özdemir */

import React, {useEffect} from 'react';
import {LogBox, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import store from './store/store.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setCartItems} from './screens/CartScreen/actions.js';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

import AppNavigator from './navigation/AppNavigator.js';

const App = () => {
  useEffect(() => {
    const loadCartItems = async () => {
      try {
        const storedItems = await AsyncStorage.getItem('cartItems');
        if (storedItems !== null) {
          store.dispatch(setCartItems(JSON.parse(storedItems)));
        }
      } catch (error) {
        console.error('Error loading cart items:', error);
      }
    };

    loadCartItems();
  }, []);

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 60,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
