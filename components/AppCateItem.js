import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button} from 'react-native-elements';

const AppCateItem = (props) => {
  return (
    <TouchableOpacity style={styles.appitem} onPress={props.onViewListAcc}>
      <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
      <Icon name={props.iconName} size={20} style={{width: 30, height: 30}} />
      <Text style={styles.text}>{props.name}</Text>
      </View>
      <View style={styles.handlerIcon}>
        <Button
          icon={<Icon name="edit" size={15} color="white" />}
          buttonStyle={{marginLeft: 5}}
        />
        <Button
          icon={<Icon name="trash" size={15} color="white" />}
          buttonStyle={{marginLeft: 5}}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  appitem: {
    backgroundColor: '#e8ded2',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    width: 350,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    textTransform: 'uppercase',
    color: '#5eaaa8',
    fontSize: 20,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  handlerIcon: {
    flexDirection: 'row',
    // position: 'absolute', 
    // right: 5,
    justifyContent: 'space-between'
  }
});

export default AppCateItem;
