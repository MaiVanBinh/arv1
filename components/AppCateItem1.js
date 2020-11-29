import React, {useState} from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import asyncStorage from '@react-native-community/async-storage';

const AppCateItem = (props) => {
  const [showEdit, setShowEdit] = useState(false);
  const onLongPressHandler = () => {
    setShowEdit(true);
  };
  const onDeleteAppHandler = async () => {
    try {
      const accs = await asyncStorage.getItem('accounts');
      console.log(accs);
      const index = JSON.parse(accs).findIndex((item) => item.app === props.id);
      if (index >= 0) {
        alert('App has accounts. Delete not Success');
      } else {
        props.onDeleteApp(props.id);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <TouchableOpacity
      style={styles.box}
      onPress={props.onPressHandler}
      onLongPress={onLongPressHandler}>
      <Icon name={props.icon} size={70} color="#4267B2" />
      <Text style={styles.text}>{props.name}</Text>
      <View style={styles.editbox}>
        <Button
          title="Update"
          style={styles.btn}
          onPress={props.onUpdateHandler}
        />
        <Button title="Delete" onPress={onDeleteAppHandler} />
      </View>
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

import {connect} from 'react-redux';
import * as actions from '../store/actions/data';
const mapStateToProps = (state) => {
  return {
    accounts: state.accounts.accounts,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteApp: (id) => dispatch(actions.deleteAppCate(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AppCateItem);
