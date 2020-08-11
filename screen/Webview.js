import React, { Component } from 'react';
import { WebView } from 'react-native';

class Webview extends Component {
  render() {
    return (
      <WebView
        source={{
          uri: 'www.facebook.com'
        }}
        style={{ marginTop: 20 }}
      />
    );
  }
}