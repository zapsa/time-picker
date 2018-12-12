import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import '../../../src/styles/timepicker.scss';
import TimePicker from '../../../src/TimePicker';

class ExampleView extends Component {
  static propTypes = {}

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{ minHeight: '100vh' }}>
        Standard timepicker
        <TimePicker
          placeholder="Input placeholder"
          showSecond={false}
        />
        <TimePicker
          placeholder="Input placeholder"
          showSecond={false}
          minuteStep={5}
        />
      </div>
    );
  }
}

export default ExampleView;
