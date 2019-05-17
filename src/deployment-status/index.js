import PropTypes from 'prop-types';
import React from 'react';

import { connect } from 'react-redux';
import getPendingVersion from '../redux/actions/get-pending-version';
import getVersion from '../redux/actions/get-version';
import styled from 'styled-components';

const Pending = styled.div`
  color: #c06000;
`;

const Live = styled.div`
  color: #008000;
  font-weight: 700;
`;

class DeploymentStatus extends React.Component {
  static get propTypes() {
    const { func, number, shape, string } = PropTypes;

    return {
      app: shape({ id: number.isRequired }).isRequired,
      environment: shape({ id: number.isRequired }).isRequired,
      onLoad: func.isRequired,
      pendingVersion: string,
      progress: number,
      total: number,
      version: string
    };
  }

  componentDidMount() {
    this.props.onLoad();
  }

  componentDidUpdate(previousProps) {
    if (previousProps.app.id !== this.props.app.id || previousProps.environment.id !== this.props.environment.id) {
      this.props.onLoad();
    }
  }

  render() {
    const { props: { pendingVersion, progress, total, version } } = this;
    if (progress === total) {
      return <Live>{version}</Live>;
    }

    return <Pending>{version} ➡ {pendingVersion} ({progress}/{total})</Pending>;
  }
}

export { DeploymentStatus };

export default connect((state, props) => {
  const byAppEnvironment = (it) => it.appId === props.app.id && it.environmentId === props.environment.id;
  const { pendingVersion, progress, total } = state.pendingVersions.find(byAppEnvironment) || {};
  const { version } = state.versions.find(byAppEnvironment) || {};
  return { pendingVersion, progress, total, version };
}, (dispatch, props) => ({
  onLoad: () => {
    dispatch(getVersion({ app: props.app, environment: props.environment }));
    dispatch(getPendingVersion({ app: props.app, environment: props.environment }));
  }
}))(DeploymentStatus);
