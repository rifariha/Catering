import React, { Component } from 'react';
import { View, BackHandler } from 'react-native';
import { WebView } from 'react-native-webview';

class App extends Component {
  WEBVIEW_REF = React.createRef();

  state = {
    canGoBack: false,
  };

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton = () => {
    if (this.state.canGoBack) {
      this.WEBVIEW_REF.current.goBack();
      return true;
    }
  };

  backButtonHandler = () => {
    return true;
  }

  onNavigationStateChange = (navState) => {
    this.setState({
      canGoBack: navState.canGoBack,
    });
  };

  render() {
  //   const runFirst = `
  //     document.body.style.backgroundColor = 'red';
  //     setTimeout(function() { window.alert('hi') }, 2000);
  //     true; // note: this is required, or you'll sometimes get silent failures
  //   `;
  

    return (
      <View style={{ flex: 1 }}>
        <WebView
        style={{marginTop: 20, flex: 1}}
          source={{
            uri:
              'https://twitter.com/',
          }}
          ref={this.WEBVIEW_REF}
        onNavigationStateChange={this.onNavigationStateChange}
          // injectedJavaScript={runFirst}
        />
      </View>
    );
  }
}

export default App;