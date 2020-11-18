import React from 'react';
import {View, Text} from 'react-native';
import {WebView} from 'react-native-webview';

const JSEditor = (props) => {
  const text = `
        <h1 id="text"></h1>
        <script>
            let x = 1; 
            const add = (x) => {
                return x + 10;
            }
            document.getElementById('text').innerHTML = add(xx);
        </script>
    `;
  return <WebView originWhitelist={['*']} source={{html: text}} renderError={() => (<Text>domdd</Text>)}/>;
};

export default JSEditor;
