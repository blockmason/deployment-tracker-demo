import PropTypes from 'prop-types';
import React from 'react';

import { connect } from 'react-redux';
import initialize from '../actions/initialize';

class Initializer extends React.Component {
  static get propTypes() {
    const { func } = PropTypes;
    return {
      onMount: func.isRequired
    };
  }

  componentDidMount() {
    this.props.onMount();
  }

  render() {
    return null;
  }
}

export { Initializer };

export default connect(() => ({}), (dispatch) => ({
  onMount: () => dispatch(initialize())
}))(Initializer);
