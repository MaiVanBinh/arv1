import React, {useState, useLayoutEffect, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Button,
  TouchableWithoutFeedback,
} from 'react-native';
import {Sae} from 'react-native-textinput-effects';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import ModalCustom from '../components/UI/ModalCustom';
import Empty from '../components/UI/Empty';
import * as actions from '../store/actions/data';
import Item from '../components/AppCateItem1';
import asyncStorage from '@react-native-community/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {acc} from 'react-native-reanimated';

const AppCategories = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
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
  const [isRefeshing, setIsRefeshing] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [isChange, setIsChange] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    props.onLoadApps();
  }, [props.onLoadApps, isFocused]);

  const getListAcouunt = (item) => {
    props.navigation.navigate('accounts', {
      title: item.name,
      id: item.id,
    });
  };

  const onUpdateAppHandler = () => {
    console.log(updateId, 'updateId');
    const app = props.apps.find((item) => item.id === updateId);
    if (app) {
      setModalVisible(true);
      setFormInput({
        appLabel: {
          title: 'Tên ứng dụng',
          value: app.name,
        },
        iconValue: {
          title: 'Tên icon',
          value: app.icon,
        },
      });
    }
  };

  const editOrDeleteHandler = (id) => {
    setUpdateId(id);
    setIsChange(true);
  };
  const renderItem = ({item}) => {
    return (
      <Item
        name={item.name}
        icon={item.icon}
        id={item.id}
        // onUpdateHandler={() => }
        onPressHandler={() => {
          if (isChange) {
            setIsChange(false);
          } else {
            getListAcouunt(item);
          }
        }}
        onLongPressHandler={editOrDeleteHandler}
      />
    );
  };

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <View>
          {!isChange ? (
            <TouchableOpacity
              style={{
                backgroundColor: '#C69F89',
                marginRight: 10,
                padding: 2,
              }}
              onPress={() => setModalVisible(true)}>
              <Icon name="plus" size={30} color="white" />
            </TouchableOpacity>
          ) : (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#C69F89',
                  marginRight: 10,
                  padding: 2,
                }}
                onPress={onUpdateAppHandler}>
                <Icon name="edit" size={30} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#C69F89',
                  marginRight: 10,
                  padding: 2,
                }}
                onPress={onDeleteAppHandler}>
                <Icon name="trash" size={30} color="white" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      ),
    });
  }, [props.navigation, isChange]);

  const resetFormInput = useCallback(() => {
    setFormInput({
      appLabel: {
        title: 'Tên ứng dụng',
        value: '',
      },
      iconValue: {
        title: 'Tên icon',
        value: '',
      },
    });
  }, []);

  const modalClose = () => {
    setUpdateId(null);
    setModalVisible(false);
    resetFormInput();
  };

  const onChangeAppHandler = async () => {
    if (Icon.hasIcon(formInput.iconValue.value)) {
      let id = null;
      let mode = null;
      if (updateId) {
        mode = 'u';
        id = updateId;
      } else {
        if (props.apps && props.apps.length > 0) {
          id = props.apps[props.apps.length - 1].id + 1;
        } else {
          id = 1;
        }
        mode = 'c';
      }
      props.onChangeApp(
        id,
        formInput.appLabel.value,
        formInput.iconValue.value,
        mode,
      );
      setUpdateId(null);
      setModalVisible(false);
      setIsRefeshing(false);
      resetFormInput();
    } else {
      alert('Not have icon');
    }
  };

  const onChangeInputHandler = (text, type) => {
    const formInputUpdate = JSON.parse(JSON.stringify(formInput));
    formInputUpdate[type].value = text;
    setFormInput(formInputUpdate);
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
        value={formInput[property].value}
        onChangeText={(text) => onChangeInputHandler(text, property)}
      />,
    );
  }
  useEffect(() => {
    setIsRefeshing(true);
  }, [props.apps, modalVisible]);

  const onDeleteAppHandler = async () => {
    try {
      const accs = JSON.parse(await asyncStorage.getItem('accounts'));
      if (accs && accs.length > 0) {
        const index = accs.findIndex(
          (item) => item.app === updateId,
        );
        if (index >= 0) {
          alert('App has accounts. Delete not Success');
        } else {
          props.onDeleteApp(updateId);
        }
      } else {
        props.onDeleteApp(updateId);
      }
    } catch (err) {
      console.log(err);
    }
    setUpdateId(null);
    setIsChange(null);
  };
  return (
    <TouchableOpacity
      style={styles.centeredView}
      onPress={() => {
        setIsChange(false);
        setUpdateId(null);
      }}>
      <ModalCustom
        visible={modalVisible}
        closePress={modalClose}
        createPress={onChangeAppHandler}
        title={updateId ? 'Update' : 'Create'}>
        {inputContent}
      </ModalCustom>
      <View style={styles.container}>
        {props.apps && props.apps.length > 0 ? (
          <FlatList
            refreshing={isRefeshing}
            numColumns={2}
            data={props.apps}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <Empty>You don't have any App. Let create one</Empty>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputCustom: {
    width: '100%',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    padding: 2,
    fontSize: 16,
  },
});

const mapStateToProps = (state) => {
  return {
    accounts: state.accounts.accounts,
    apps: state.data.apps,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onLoadApps: () => dispatch(actions.loadApp()),
    onChangeApp: (id, name, icon, mode) =>
      dispatch(actions.onChangeApp(id, name, icon, mode)),
    onDeleteApp: (id) => dispatch(actions.deleteAppCate(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppCategories);
