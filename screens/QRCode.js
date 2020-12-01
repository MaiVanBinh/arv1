import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Button,
  ActivityIndicator,
  Linking,
  TouchableOpacity,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import asyncStorage from '@react-native-community/async-storage';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
const QRCodeRender = (props) => {

  const [isReady, setIsReady] = useState(false);
  const [isShare, setIsShare] = useState(false);
  const [token, setToken] = useState(null);
  const [postStart, setPostStart] = useState(false);
  const [timeOut, setTimeout] = useState(10);
  const [isGetData, setIsGetData] = useState(false);
  const isFocused = useIsFocused();
  const [isTransSuccess, setIsTS] = useState(true);

  useEffect(() => {
    setIsTS(false);
    refreshScreen();
  },[isFocused]);

  const refreshScreen = () => {
    setIsReady(false);
    setIsShare(false);
    setToken(null);
    setPostStart(false);
    setTimeout(10);
    setIsGetData(false)
  }
  const onSuccess = (e) => {
    fetch(e.data, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(async data => {
        const currentApp = JSON.parse(await asyncStorage.getItem('applications'));
        const currentAcc = JSON.parse(await asyncStorage.getItem('accounts'));
        console.log(currentAcc,'currentAcc');
        const getApp = data.message.apps;
        const getAcc = data.message.accs;
        let id =  currentApp && currentApp.length ? currentApp[currentApp.length - 1].id : 0;
        if(getApp && getApp.length) {
          for(let i = 0; i < getApp.length; i++) {
            id += 1;
            for(let j = 0; j < getAcc.length; j++) {
              if(getApp[i].id == getAcc[j].app) {
                getAcc[j].app = id
              }
            }
            getApp[i].id = id;
          }
        }
        console.log([...currentApp, ...getApp], "QR")
        console.log([...currentAcc, ...getAcc], "QR")
        await asyncStorage.setItem('applications', JSON.stringify([...currentApp, ...getApp]));
        await asyncStorage.setItem('accounts', JSON.stringify([...currentAcc, ...getAcc]));
        refreshScreen();
        setIsTS(true);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (isReady && isShare && timeOut > 0) {
      console.log('in');
      const timer = setInterval(() => {
        setTimeout((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
    if (timeOut === 0) {
      setIsReady(false);
      setIsShare(false);
    }
  }, [timeOut, isReady, isShare]);

  const renderQrCode = () => {
    const tokenUpdate = parseInt(Math.random().toFixed(10) * 10 ** 10);
    setToken(tokenUpdate);
    setPostStart(true);
    setIsShare(true);
    setTimeout(10);
    setIsGetData(false);
  };
  useEffect(() => {
      asyncStorage.getItem('accounts').then(accs => {
        console.log(typeof(accs));
        if (postStart) {
          fetch('https://androidfinal.herokuapp.com/data', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({message: {apps: props.apps, accs: JSON.parse(accs), token: token}}),
          })
            .then((res) => res.json())
            .then((data) => {
              setPostStart(false);
              setIsReady(true);
            })
            .catch((err) => console.log(err));
        }
      })
      .catch(err => console.log(err));
    
  }, [postStart]);

  const getDataHandler = () => {
    setIsShare(false);
    setIsGetData(true);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.btnGroup}>
        <View style={{marginRight: 5}}>
          <Button title="Render qrcode" onPress={renderQrCode} />
        </View>
        <View>
          <Button title="Scaner qrcode" onPress={getDataHandler} />
        </View>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
      {isReady && isShare ? (
        <Text style={styles.timeOut}>Remaining time: {timeOut}</Text>
      ) : null}
      {postStart ? <ActivityIndicator size="large" color="#00ff00" /> : null}
      {isReady && isShare ? (
        <QRCode
          value={`https://androidfinal.herokuapp.com/data/8`}
          size={200}
        />
      ) : null}
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
      {isTransSuccess ? <Icon name="check-circle" size={100} color="green"/> : null}
      </View>
     
      {isGetData ? (
        <View style={styles.qrcode}>
          <QRCodeScanner
            onRead={onSuccess}
          />
        </View>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  btnGroup: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
  timeOut: {
    fontSize: 20,
    marginBottom: 10,
  },
  qrcode: {
    marginTop: 100
  }
});
import {connect} from 'react-redux';
const mapStateToProps = (state) => {
  return {
    apps: state.data.apps,
  };
};
import * as actions from '../store/actions/dongbo';
import { loadApp } from '../store/actions/data';
import { set } from 'react-native-reanimated';

const mapDispatchToProps = (dispatch) => {
  return {
    onSaveData: (data) => dispatch(actions.dongbo(data)),
    ondongboApps: () => dispatch(loadApp())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(QRCodeRender);
