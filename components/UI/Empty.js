import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Empty = (props) => {
  return (
    <View style={styles.centeredView}>
      <Text>{props.children}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Empty;
