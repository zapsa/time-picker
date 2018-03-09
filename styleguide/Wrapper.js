import React, { Component } from 'react';
import { Provider } from 'react-redux' // eslint-disable-line
import store from '../example/src/store';

import '../example/src/assets/scss/app.scss';
import '../src/styles/zapeditor.scss';

class Wrapper extends Component {
  render() {
    return (
      <Provider store={store}>
        <main className="main" id="main">
          {this.props.children}
        </main>
      </Provider>
    );
  }
}

export default Wrapper;
