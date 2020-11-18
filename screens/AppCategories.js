import React, {useState, useLayoutEffect, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppCateItem from '../components/AppCateItem';
import {AppCategori} from '../data';
import ModalCustom from '../components/UI/ModalCustom';
import {Sae} from 'react-native-textinput-effects';
import Empty from '../components/UI/Empty';

const AppCategories = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [appItems, setAppItems] = useState(null);
  const [formInput, setFormInput] = useState({
    appLabel: {
      title: 'Tên ứng dụng',
      value: '',
    },
    iconValue: {
      title: 'Tên icon',
      value: '',
    },
  });
  const renderItem = ({item}) => {
    return <AppCateItem name={item.name} iconName={item.icon} onViewListAcc={() => navigation.navigate('accounts', {
      title: item.name
    })}/>;
  };
  useEffect(() => {
    if (AppCategori) {
      setAppItems(AppCategori);
    }
  }, [AppCategori]);
  useEffect(() => {
    console.log(appItems);
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{backgroundColor: '#16a596', marginRight: 10}}
          onPress={() => setModalVisible(true)}>
          <Icon name="plus" size={30} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  
  const resetFormInput = (props) => {
    setFormInput({
      appLabel: {
        title: 'Tên ứng dụng',
        value: '',
      },
      iconValue: {
        title: 'Tên icon',
        value: '',
      },
    })
  }

  const modalClose = () => {
    setModalVisible(false);
    resetFormInput();
  };

  const onCreateAppHandler = () => {
    console.log(formInput.appLabel.value, formInput.iconValue.value);
    const appItemsUpdate = [...appItems];
    appItemsUpdate.push({name: formInput.appLabel.value, icon: formInput.iconValue.value});
    setAppItems(appItemsUpdate);
    setModalVisible(false);
    resetFormInput();
  }

  const onChangeInputHandler = (text, type) => {
    const formInputUpdate = JSON.parse(JSON.stringify(formInput));
    formInputUpdate[type].value = text;
    setFormInput(formInputUpdate);
  }

  let inputContent = [];
  for (const property in formInput) {
    inputContent.push(
      <Sae
        key={property}
        label={formInput[property].title}
        iconClass={Icon}
        iconName="pencil"
        iconColor="pink"
        inputStyle={{color: '#000'}}
        inputPadding={16}
        labelHeight={24}
        borderHeight={2}
        autoCapitalize={'none'}
        autoCorrect={false}
        value={formInput[property].value}
        onChangeText={(text) => onChangeInputHandler(text, property) }
      />,
    );
  }

  return (
    <View style={styles.centeredView}>
      {/* {modalVisible ? <View style={styles.blackBG} onPress=></View> : null} */}
      <ModalCustom visible={modalVisible} closePress={modalClose} createPress={onCreateAppHandler}>
        {inputContent}
      </ModalCustom>
      {appItems && appItems.length > 0 ? (
        <FlatList
          data={appItems}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Empty>You don't have any App. Let create one</Empty>
      )}
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
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  blackBG: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ccc',
  },
  inputCustom: {
    width: '100%',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    padding: 2,
    fontSize: 16,
  },
});

export default AppCategories;
