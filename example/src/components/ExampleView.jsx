import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
      <div>
        Coucou !
        <TimePicker
          placeholder="Input placeholder"
        />
      </div>
    );
  }
}

export default ExampleView;
