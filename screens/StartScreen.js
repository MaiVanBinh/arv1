import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {setData} from '../store/actions/data';

const StartScreen = (props) => {
  return (
    <View style={styles.centerScreen}>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetData: (data) => dispatch(setData(data)),
  };
};
const styles = StyleSheet.create({
  centerScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default connect(null, mapDispatchToProps)(StartScreen);
