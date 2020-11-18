import React from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';
import {Sae} from 'react-native-textinput-effects';

const InputCustom = (props) => {
  return (
    <Sae
      label={props.label}
      iconClass={Icon}
      iconName={props.iconName}
      iconColor={props.iconColor}
      inputStyle={{ color: '#91627b' }}
      inputPadding={16}
      labelHeight={24}
      borderHeight={2}
      autoCapitalize={'none'}
      autoCorrect={false}
    />
  );
};

export default InputCustom;
