import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  StyleSheet,
  Dimensions,
  Button,
  Alert,
} from 'react-native';
import {COLORS} from '../../constants/colors';
import SearchBar from '../../components/Home/SearchBar';
import FilterBar from '../../components/Home/FilterBar';
import FilterModal from '../../components/Home/FilterModal';
import {connect} from 'react-redux';
import {addToCart} from './actions';
import {setCartItems} from '../CartScreen/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartItem from '../../models/CartItem';

const HomeScreen = ({navigation, addToCart, setCartItems}) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [numColumns, setNumColumns] = useState(2);
  const [searchString, setSearchString] = useState('');
  const [page, setPage] = useState(1);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [priceFilter, setPriceFilter] = useState({
    max: null,
    min: null,
  });

  navigation.setOptions({
    title: 'E-Market',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const url = new URL(
        'https://5fc9346b2af77700165ae514.mockapi.io/products',
      );
      url.searchParams.append('page', page);
      url.searchParams.append('limit', 12);
      url.searchParams.append('name', searchString);
      console.log('URL', url);
      const response = await fetch(url);
      const data = await response.json();
      if (page > 1) setProducts(prevProducts => [...prevProducts, ...data]);
      else setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
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
        cartItems[existingCartItemIndex].count += 1;
        await AsyncStorage.setItem(
          'cartItems',
          JSON.stringify(updatedCartItems),
        );
        addToCart(cartItems[existingCartItemIndex]);
        Alert.alert('Product Added', `Another ${item.name} added to cart.`);
      } else {
        const cartItem = new CartItem(
          item.id,
          item.name,
          item.price,
          1,
          item.image,
        );
        addToCart(cartItem);
        cartItems.push(cartItem);
        await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
        Alert.alert('Product Added', `${item.name} added to cart.`);
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  const handleSearch = searchText => {
    console.log('Search initiated with:', searchText);
    setSearchString(searchText);
    setProducts([]);
    setPage(1);
    fetchData();
  };

  const handleEndReached = () => {
    setPage(page + 1);
    fetchData();
  };

  const handleOnApplyFilter = () => {
    setIsFilterModalVisible(false);
  };

  const renderProductItem = ({item, index}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ProductDetail', {
          productId: item.id,
          productName: item.name,
        })
      }>
      <View style={styles.card}>
        <Image style={styles.image} source={{uri: item.image}} />
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.price}>{item.price + ' ₺'}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleAddToCart(item)}>
          <Text style={styles.buttonText}>Add To Cart</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const handleOpenFilterModal = () => {
    setIsFilterModalVisible(true);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <>
      <View style={styles.searchBarContainer}>
        <SearchBar placeholder="Search..." onSearch={handleSearch} />
        <FilterBar onPress={handleOpenFilterModal} />
      </View>
      <FilterModal
        visible={isFilterModalVisible}
        onClose={() => {
          setIsFilterModalVisible(false);
        }}
        onApply={handleOnApplyFilter}
        priceFilterModel={priceFilter}
        setPriceFilter={setPriceFilter}
      />
      <FlatList
        key={numColumns} // Dynamically updating key prop
        data={products}
        numColumns={numColumns}
        renderItem={renderProductItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatListContainer}
        onEndReached={() => handleEndReached()}
      />
    </>
  );
};

const windowWidth = Dimensions.get('window').width;
const cardWidth = (windowWidth - 10) / 2 - 10; // Subtracting padding and margins for two cards

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  flatListContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    marginRight: 10,
    width: cardWidth,
    elevation: 5, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: {width: 0, height: 2}, // For iOS shadow
    shadowOpacity: 0.25, // For iOS shadow
    shadowRadius: 3.84, // For iOS shadow
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 7,
    marginBottom: 5,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  price: {
    fontSize: 16,
    color: COLORS.secondary,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

const mapStateToProps = state => ({
  cartItems: state.cart.cartItems,
});

const mapDispatchToProps = {
  addToCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
