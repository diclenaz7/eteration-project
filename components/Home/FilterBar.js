import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'; // You may need to install @expo/vector-icons
import {COLORS} from '../../constants/colors';

const FilterBar = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}> Filter </Text>
      <Icon name="filter" size={20} color="white" style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.secondary,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: COLORS.secondary,
  },
  text: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
    color: 'white',
  },
  icon: {
    marginLeft: 10,
  },
});

export default FilterBar;
