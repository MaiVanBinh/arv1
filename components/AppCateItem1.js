import React, {useState} from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const AppCateItem = (props) => {
  return (
    <TouchableOpacity
      style={styles.box}
      onPress={props.onPressHandler}
      onLongPress={() => props.onLongPressHandler(props.id)}>
      <Icon name={props.icon} size={70} color="#4267B2" />
      <Text style={styles.text}>{props.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    width: '47%',
    height: 200,
    marginHorizontal: 5,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    textTransform: 'capitalize',
    marginTop: 10,
  },
  editbox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  btn: {
    width: '100%',
    marginTop: '10px',
  },
});

export default AppCateItem;
