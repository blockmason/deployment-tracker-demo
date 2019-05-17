import PropTypes from 'prop-types';
import React from 'react';

import styled from 'styled-components';

const Panel = styled.div`
  align-items: stretch;
  background-color: #f8f8f8;
  color: #202020;
  display: flex;
  flex: 1;
  flex-direction: column;
  font-family: Helvetica, sans-serif;
  overflow: hidden;
`;

const Header = styled.div`
  background-color: #305070;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 1);
  color: #f0f0f0;
  padding: 16px;
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.5);
`;

const Content = styled.div`
  flex: 1;
  overflow: auto;
`;

const Layout = ({ children }) => <Panel>
  <Header>🚀 Deployments</Header>
  <Content>{children}</Content>
</Panel>;

const { node } = PropTypes;

Layout.propTypes = {
  children: node
};

export default Layout;
