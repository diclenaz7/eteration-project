import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native';
import {COLORS} from '../../constants/colors';
const width = Dimensions.get('window').width;

const FilterModal = ({
  visible,
  onClose,
  onApply,
  priceFilterModel,
  setPriceFilter,
}) => {
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleFilterSelection = filter => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter(item => item !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const handleApplyFilters = () => {
    onApply(selectedFilters);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.modalTitle}>Filters</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.filterTitle}>Price Filter</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Min Price"
              keyboardType="numeric"
              value={priceFilterModel.min}
              onChangeText={text =>
                setPriceFilter({min: text, max: priceFilterModel.max})
              }
              style={styles.input}
            />
            <TextInput
              placeholder="Max Price"
              keyboardType="numeric"
              value={priceFilterModel.max}
              onChangeText={text =>
                setPriceFilter({min: priceFilterModel.min, max: text})
              }
              style={styles.input}
            />
          </View>
          <TouchableOpacity
            style={styles.applyButton}
            onPress={handleApplyFilters}>
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  filterTitle: {
    fontSize: 16,
    marginVertical: 10,
    color: COLORS.secondary,
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  closeButton: {
    color: COLORS.primary,
    marginBottom: 10,
  },
  filterOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
  },
  selectedOption: {
    backgroundColor: COLORS.lightGray,
  },
  applyButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  applyButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  labelStyle: {
    backgroundColor: 'white',
  },
});

export default FilterModal;
