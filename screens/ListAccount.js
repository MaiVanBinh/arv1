import React, {useEffect, useLayoutEffect} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import Empty from '../components/UI/Empty';
import Icon from 'react-native-vector-icons/FontAwesome';

const ListAccount = ({navigation, route}) => {
  useEffect(() => {
    console.log();
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: route.params['title'],
      headerRight: () => (
        <TouchableOpacity
          style={{backgroundColor: '#16a596', marginRight: 10}}
          onPress={() => setModalVisible(true)}>
          <Icon name="plus" size={30} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  return <Empty>Don't have any Accounts</Empty>;
};

export default ListAccount;
