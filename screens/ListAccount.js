import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
  StyleSheet,
  BackHandler,
} from 'react-native';
import Empty from '../components/UI/Empty';
import Icon from 'react-native-vector-icons/FontAwesome';
import AccItem from '../components/AccItem';
import ModalCustom from '../components/UI/ModalCustom';
import {Sae} from 'react-native-textinput-effects';
import * as actions from '../store/actions/account';
import {decrypt} from '../utinity/encrypt';
import asyncStorage from '@react-native-community/async-storage';

const ListAccount = (props) => {
  const [confirm, setConfirm] = useState(0);
  const [app, setApp] = useState(null);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [idUpdate, setIdUpdate] = useState(null);
  const [key, setKey] = useState('');
  const [dPass, setDPass] = useState(null);
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    if (confirm > 0) {
      if (currentAccount) {
        const pass= decrypt(currentAccount.password, key);
        if(pass) {
          if(isDelete) {
            props.onDeleteAccount(currentAccount.id);
          } else {
            setDPass(decrypt(currentAccount.password, key));
          }
        } else {
          console.log('wrong');
        }
      }
      if (confirm === 3) {
        alert('If wrong. Application will stop working.');
      }
      if (confirm > 4) {
        BackHandler.exitApp();
      }
    }
  }, [confirm]);

  useEffect(() => {
    setApp(props.route.params['id']);
    props.onLoadAccounts(props.route.params['id']);
  }, []);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: props.route.params['title'],
      headerRight: () => (
        <TouchableOpacity
          style={{backgroundColor: '#C69F89', marginRight: 10}}
          onPress={() => setModalVisible(true)}>
          <Icon name="plus" size={30} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [props.navigation]);

  const [modalVisible, setModalVisible] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [formInput, setFormInput] = useState({
    username: {
      title: 'User Name',
      value: '',
      isPass: false,
    },
    password: {
      title: 'Password',
      value: '',
      isPass: true,
    },
    key: {
      title: 'Key',
      value: '',
      isPass: true
    }
  });

  const modalClose = () => {
    setShowPass(false);
    setDPass(null);
    setModalVisible(false);
    setKey(null);
    setIdUpdate(null);
    setIsDelete(false);
    setFormInput({
      username: {
        title: 'User Name',
        value: '',
        isPass: false,
      },
      password: {
        title: 'Password',
        value: '',
        isPass: true,
      },
      key: {
        title: 'Key',
        value: '',
        isPass: true
      }
    });
  };

  const renderItem = ({item}) => {
    return (
      <AccItem
        username={item.username}
        iconName="user"
        password={item.password}
        id={item.id}
        onPressHandler={() => showPasshandler(item)}
        onDeleteHandler={deleteAcc}
        onUpdateHandle={updateHandler}
      />
    );
  };

  const onChangeInputHandler = (text, type) => {
    const formInputUpdate = JSON.parse(JSON.stringify(formInput));
    formInputUpdate[type].value = text;
    setFormInput(formInputUpdate);
  };

  const onChangeAcc = async () => {
    console.log(formInput);
    if(formInput.key.value === '' || formInput.username.value === '' || formInput.password.value === '') {
      alert('Inputs are reqiure');
      return;
    }
    try {
      const accs = JSON.parse(await asyncStorage.getItem('accounts'));
      console.log(accs)
      if(accs && accs.length > 0) {
        const ex = accs[0];
        const isKeyCorrect = decrypt(ex.password, formInput.key.value);
        if(!isKeyCorrect) {
          alert('Key not correct');
          return;
        }
      }
      let id = 0;
      const len = accs ? accs.length : 0;
      if (props.accounts && len > 0) {
        id = props.accounts[len - 1].id + 1;
      }
      if (idUpdate !== null) {
        console.log('update');
        props.onUpdateAccount(
          idUpdate,
          formInput.username.value,
          formInput.password.value,
          formInput.key.value,
          app,
        );
      } else {
        console.log('create');
        props.onCreateAccount(
          id,
          formInput.username.value,
          formInput.password.value,
          formInput.key.value,
          app,
        );
      }
    } catch(err) {
      console.log(err);
    }
    setIdUpdate(null);
    setModalVisible(false);
    setFormInput({
      username: {
        title: 'User Name',
        value: '',
        isPass: false,
      },
      password: {
        title: 'Password',
        value: '',
        isPass: true,
      },
      key: {
        title: 'Key',
        value: '',
        isPass: true
      }
    });
  };

  const showPasshandler = (item) => {
    setCurrentAccount(item);
    setModalVisible(true);
    setShowPass(true);
  };

  const deleteAcc = async (id) => {
    setShowPass(true);
    setModalVisible(true);
    setIsDelete(true);
  };

  const updateHandler = (id, username, password) => {
    console.log(id);
    setModalVisible(true);
    setIdUpdate(id);
    setFormInput({
      username: {
        title: 'User Name',
        value: username,
        isPass: false,
      },
      password: {
        title: 'Password',
        value: password,
        isPass: true,
      },
      key: {
        title: 'Key',
        value: '',
        isPass: true
      }
    });
  };

  const confirmHandler = () => {
    setConfirm((prev) => prev + 1);
  };
  const onChangeKeyHandler = (text) => {
    setKey(text);
  };

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
        defaultValue={property === 'username' ? formInput[property].value : ''}
        onChangeText={(text) => onChangeInputHandler(text, property)}
        secureTextEntry={formInput[property].isPass}
      />,
    );
  }
  if (showPass) {
    inputContent = (
      <Sae
        label={'who are you?'}
        iconClass={Icon}
        iconName="pencil"
        iconColor="pink"
        inputStyle={{color: '#000'}}
        inputPadding={16}
        labelHeight={24}
        borderHeight={2}
        autoCapitalize={'none'}
        autoCorrect={false}
        defaultValue={''}
        onChangeText={(text) => onChangeKeyHandler(text)}
        secureTextEntry={true}
      />
    );
  }
  return (
    <View style={styles.container}>
      <ModalCustom
        visible={modalVisible}
        closePress={modalClose}
        title={showPass ? 'Enter key' : 'Create'}
        createPress={onChangeAcc}
        mode={showPass ? 'confirm' : null}
        confirmHandler={confirmHandler}>
        {inputContent}
        {dPass ? <Text style={{fontSize: 15}}>Password: {dPass}</Text> : null}
      </ModalCustom>
      {props.accounts && props.accounts.length ? (
        <FlatList
          numColumns={1}
          data={props.accounts}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Empty>Empty</Empty>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    accounts: state.accounts.accounts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadAccounts: (id) => dispatch(actions.loadAccount(id)),
    onCreateAccount: (id, username, password, key, app) =>
      dispatch(actions.createAccount(id, username, password, key, app)),
    onDeleteAccount: (id) => dispatch(actions.deleteAcc(id)),
    onUpdateAccount: (id, username, password, key, app) =>
      dispatch(actions.updateAccount(id, username, password, key, app)),
  };
};
import {connect} from 'react-redux';
import { acc } from 'react-native-reanimated';

export default connect(mapStateToProps, mapDispatchToProps)(ListAccount);
