import React, {useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/colors';

const SearchBar = ({placeholder, onSearch}) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={searchText}
        onChangeText={setSearchText}
        onSubmitEditing={handleSearch}
        placeholderTextColor={COLORS.secondary}
      />
      <Icon
        name="search"
        size={20}
        color={COLORS.secondary}
        style={styles.icon}
        onPress={handleSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.secondary,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
  },
  icon: {
    marginLeft: 10,
  },
});

export default SearchBar;
