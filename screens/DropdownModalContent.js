import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const DropdownModalContent = ({ onClose }) => {
  return (
    <View style={styles.modalContainer}>
      {/* Your dropdown content goes here */}

      <TouchableOpacity onPress={onClose}>
        <Text>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
});

export default DropdownModalContent;
