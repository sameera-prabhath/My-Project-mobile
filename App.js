import React, { Component } from 'react';
import { Provider } from 'react-redux';
import createStore from './app/redux/store';
import Route from './app/routes';
export default class App extends Component {
  render() {
    return (
      <Provider store={createStore}>
        <Route/>
      </Provider>
    );
  }
}
