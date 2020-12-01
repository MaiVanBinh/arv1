import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ViewPropTypes
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import PropTypes from 'prop-types';

const Login = (props) => {
  const [password, setPassword] = useState(null);

  useEffect(() => {
    FingerprintScanner.isSensorAvailable()
      .then((biometryType) => console.log('success'))
      .catch((error) => console.log(error));
  });
  const login = async () => {
    try {
      //     ;
      //   if (isTrue) {
      //     console.log('s');
      //   } else {
      //     console.log('n');
      //   }
      // } catch (err) {
      //   console.log(err);
      // }
      const isTrue = await FingerprintScanner.authenticate({
        description: 'Scan your fingerprint on the device scanner to continue',
      })
        .then(() => {
        //   props.handlePopupDismissed();
          //   alert('Authenticated successfully');
          props.onLoginSucces();
        })
        .catch((error) => {
        //   props.handlePopupDismissed();
          alert(error.message);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Secret App</Text>
      <TouchableOpacity style={styles.fingerprint} onPress={login}>
        <Icon name="fingerprint" size={50} color="white" />
      </TouchableOpacity>

      <View style={styles.inputView}>
        <TextInput
          secureTextEntry={true}
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.loginText}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#fb5b5a',
    marginBottom: 80,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 25,
    height: 50,
    marginBottom: 5,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'white',
  },
  forgot: {
    color: 'white',
    fontSize: 11,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
  },
  fingerprint: {
    marginBottom: 80,
  },
});
import {connect} from 'react-redux';
import * as actions from '../store/actions/auth';
// Login.propTypes = {
//   style: ViewPropTypes.style,
//   handlePopupDismissed: PropTypes.func.isRequired,
// };
const mapDispatchToProps = (dispatch) => {
  return {
    onLoginSucces: () => dispatch(actions.authSuccess()),
  };
};
export default connect(null, mapDispatchToProps)(Login);
