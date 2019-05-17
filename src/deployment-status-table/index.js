import DeploymentStatus from '../deployment-status';
import PropTypes from 'prop-types';
import React from 'react';

import { connect } from 'react-redux';
import styled from 'styled-components';

const Table = styled.div`
  background-color: rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.25);
  display: flex;
  flex: 1;
  flex-direction: column;
  font-family: Helvetica, sans-serif;
  margin: 16px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Cell = styled.div`
  background-color: #ffffff;
  display: flex;
  flex: 1;
  flex-direction: row;
  margin: 1px;
  padding: 8px;
`;

const LabelCell = styled(Cell)`
  font-weight: 700;
`;

const DeploymentStatusTable = ({ apps, environments }) => <Table>
  <Row>
    <Cell/>
    {environments.map((environment) => <LabelCell key={environment.id}>{environment.label}</LabelCell>)}
  </Row>
  {apps.map((app) => <Row key={app.id}>
    <LabelCell style={{ flexDirection: 'row-reverse' }}>{app.label}</LabelCell>
    {environments.map((environment) => <Cell key={environment.id}>
      <DeploymentStatus app={app} environment={environment}/>
    </Cell>)}
  </Row>)}
</Table>;

const { arrayOf, number, shape } = PropTypes;

DeploymentStatusTable.propTypes = {
  apps: arrayOf(shape({ id: number.isRequired })).isRequired,
  environments: arrayOf(shape({ id: number.isRequired })).isRequired
};

export { DeploymentStatusTable };

export default connect((state, props) => ({
  apps: state.apps,
  environments: state.environments
}))(DeploymentStatusTable);
