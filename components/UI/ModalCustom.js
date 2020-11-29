import React from 'react';
import {
  Modal,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  TouchableHighlight,
  Keyboard,
} from 'react-native';

const ModalCustom = (props) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.visible}
      onRequestClose={() => {
        alert('Modal has been closed.');
      }}>
      <View style={{...styles.centeredView, marginTop: 50}}>
        <ScrollView>
          <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30}>
            <TouchableWithoutFeedback
              onPress={() => {
                Keyboard.dismiss();
              }}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>{props.title}</Text>
                <View style={styles.form}>{props.children}</View>
                <View style={styles.btnContainer}>
                  {props.mode === 'confirm' ? (
                    <TouchableHighlight
                      style={{...styles.openButton, backgroundColor: '#2196F3'}}
                      onPress={props.confirmHandler}>
                      <Text style={styles.textStyle}>Confirm</Text>
                    </TouchableHighlight>
                  ) : (
                    <TouchableHighlight
                      style={{...styles.openButton, backgroundColor: '#2196F3'}}
                      onPress={props.createPress}>
                      <Text style={styles.textStyle}>{props.title}</Text>
                    </TouchableHighlight>
                  )}
                  <TouchableHighlight
                    style={{...styles.openButton}}
                    onPress={props.closePress}>
                    <Text style={styles.textStyle}>Cancel</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  centeredView: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: 300,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  btnContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 5,
    elevation: 2,
    width: 100,
    alignItems: 'center',
  },
  form: {
    width: '100%',
  },
});
export default ModalCustom;
