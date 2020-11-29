import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button} from 'react-native-elements';

const AccItem = (props) => {
  return (
    <TouchableOpacity style={styles.appitem} onPress={props.onPressHandler}>
      <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
      {/* <Icon name={props.iconName} size={15} style={{width: 30, height: 30, color: ''}} /> */}
      <Text style={styles.text}>{props.username}</Text>
      </View>
      <View style={styles.handlerIcon}>
        <Button
          icon={<Icon name="edit" size={15} color="white" />}
          buttonStyle={{marginLeft: 5}}
          onPress={() => props.onUpdateHandle(props.id, props.username, props.password)}
        />
        <Button
          icon={<Icon name="trash" size={15} color="white" />}
          buttonStyle={{marginLeft: 5}}
          onPress={() => props.onDeleteHandler(props.id)}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  appitem: {
    backgroundColor: '#e8ded2',
    width: 400,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 10

  },
  text: {
    textTransform: 'uppercase',
    color: '#5eaaa8',
    fontSize: 20,
    fontWeight: 'bold',
    width: 270,
    textTransform: 'lowercase'
  },
  handlerIcon: {
    flexDirection: 'row',
    // position: 'absolute', 
    // right: 5,
    justifyContent: 'space-between'
  }
});

export default AccItem;
