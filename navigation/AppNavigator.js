import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import HomeStack from './HomeStack';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import {COLORS} from '../constants/colors';
import ProductDetailScreen from '../screens/HomeScreen/detailScreen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Badge} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const cartItems = useSelector(state => state.cart.cartItems);

  useEffect(() => {
    const calculateCartItemCount = () => {
      const totalCount = cartItems.reduce(
        (total, currentItem) => total + currentItem.count,
        0,
      );
      setCartItemCount(totalCount);
    };

    calculateCartItemCount();
  }, [cartItems]);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: route.name === 'E-Market' ? false : true,
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'E-Market') {
              iconName = focused ? 'home' : 'home';
            } else if (route.name === 'Cart') {
              iconName = focused ? 'shopping-cart' : 'shopping-cart';
            } else if (route.name === 'Favorites') {
              iconName = focused ? 'star' : 'star';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'user' : 'user';
            }
            return (
              <>
                <Icon name={iconName} size={size} color={color} />
                {route.name === 'Cart' && cartItemCount > 0 && (
                  <Badge
                    value={cartItemCount}
                    containerStyle={{
                      position: 'absolute',
                      top: 5,
                      right: 30,
                    }}
                    badgeStyle={{backgroundColor: COLORS.primary}}
                  />
                )}
              </>
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: COLORS.secondary,
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="E-Market" component={HomeStack} />
        <Tab.Screen name="Cart" component={CartScreen} />
        <Tab.Screen name="Favorites" component={FavoritesScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
