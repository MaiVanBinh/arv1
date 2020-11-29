import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Button, ActivityIndicator} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const QRCodeRender = (props) => {
  const [isReady, setIsReady] = useState(false);
  const [isShare, setIsShare] = useState(false);
  const [token, setToken] = useState(null);
  const [postStart, setPostStart] = useState(false);
  const [timeOut, setTimeout] = useState(10);

  useEffect(() => {
    if (isReady && isShare && timeOut > 0) {
      console.log('in');
      const timer = setInterval(() => {
        setTimeout((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
    if (timeOut === 0) {
      console.log('out')
      setIsReady(false);
      setIsShare(false);
    }
  }, [timeOut]);
  const renderQrCode = () => {
    const tokenUpdate = parseInt(Math.random().toFixed(10) * 10 ** 10);
    setToken(tokenUpdate);
    setPostStart(true);
    setIsShare(true);
  };
  useEffect(() => {
    if (postStart) {
      fetch('https://androidfinal.herokuapp.com/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({message: {name: props.apps, token: token}}),
      })
        .then((res) => res.json())
        .then((data) => {
          setPostStart(false);
          setIsReady(true);
          setTimeout(10);
        })
        .catch((err) => console.log(err));
    }
  }, [postStart]);

  // useEffect(() => {
  //   if (isReady) {
  //     fetch('https://androidfinal.herokuapp.com/data/1')
  //       .then((res) => res.json())
  //       .then((data) => console.log(data.message.message.name))
  //       .catch((err) => console.log(err));
  //   }
  // }, [isReady]);
  return (
    <View style={styles.container}>
      <View style={styles.btnGroup}>
        <View style={{marginRight: 5}}>
          <Button title="Render qrcode" onPress={renderQrCode} />
        </View>
        <View>
          <Button title="Scaner qrcode" />
        </View>
      </View>
      {isReady && isShare ? <Text>{timeOut}</Text> : null}
      {postStart ? <ActivityIndicator size="large" color="#00ff00" /> : null}
      {isReady && isShare ? (
        <QRCode
          value={`https://androidfinal.herokuapp.com/data/${token}`}
          size={200}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnGroup: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
import {connect} from 'react-redux';
const mapStateToProps = (state) => {
  return {
    apps: state.data.apps,
  };
};
export default connect(mapStateToProps)(QRCodeRender);
