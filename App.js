import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';

import RootNavigator from './src/navigators/RootNavigator'
import { store } from './src/redux/store';


export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootNavigator onNavigationStateChange={this.handleNavigationStateChange}/>
      </Provider>
    );
  }
}