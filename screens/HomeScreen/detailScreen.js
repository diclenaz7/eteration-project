import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AddToCartBar from '../../components/ProductDetail/AddToCartBar';
import {COLORS} from '../../constants/colors';
import CartItem from '../../models/CartItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {addToCart} from './actions';
import {connect} from 'react-redux';

const ProductDetailScreen = ({route, navigation, addToCart}) => {
  const {productId, productName} = route.params;
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  navigation.setOptions({
    title: productName,
  });

  useEffect(() => {
    fetchProductDetail();
  }, []);

  const fetchProductDetail = async () => {
    try {
      const response = await fetch(
        `https://5fc9346b2af77700165ae514.mockapi.io/products/${productId}`,
      );
      const data = await response.json();
      setProduct(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product detail:', error);
      setLoading(false);
    }
  };

  const handleAddToCart = async item => {
    try {
      const storedItems = await AsyncStorage.getItem('cartItems');
      let cartItems = [];
      if (storedItems !== null) {
        cartItems = JSON.parse(storedItems);
      }
      const existingCartItemIndex = cartItems.findIndex(
        cartItem => cartItem.id === item.id,
      );
      if (existingCartItemIndex !== -1) {
        const updatedCartItems = [...cartItems];
        updatedCartItems[existingCartItemIndex].count += 1;
        addToCart(updatedCartItems[existingCartItemIndex]);
        await AsyncStorage.setItem(
          'cartItems',
          JSON.stringify(updatedCartItems),
        );
        Alert.alert('Product Added', `Another ${item.name} added to cart.`);
      } else {
        const cartItem = new CartItem(
          item.id,
          item.name,
          item.price,
          1,
          item.image,
        );
        const updatedCartItems = [...cartItems];
        addToCart(cartItem);
        updatedCartItems.push(cartItem);
        await AsyncStorage.setItem(
          'cartItems',
          JSON.stringify(updatedCartItems),
        );
        Alert.alert('Product Added', `${item.name} added to cart.`);
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="tomato" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>No product found</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{uri: product.image}} style={styles.image} />
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <AddToCartBar
          price={product?.price}
          onPress={() => handleAddToCart(product)}
        />
      </View>
    </>
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  image: {
    width: windowWidth * 0.8,
    height: windowWidth * 0.8,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: windowWidth * 0.9,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  bottomContainer: {
    bottom: 0,
  },
});

export default connect(null, {addToCart})(ProductDetailScreen);
