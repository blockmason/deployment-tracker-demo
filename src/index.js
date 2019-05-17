import DeploymentStatusTable from './deployment-status-table';
import Initializer from './redux/initializer';
import Layout from './layout';
import React from 'react';
import { ThemeProvider } from 'styled-components';

import createRedux from './redux';
import { link } from '@blockmason/link-sdk';
import { render } from 'react-dom';
import theme from '/themes/dark';

const Redux = createRedux({
  apps: [],
  environments: [],
  link: link({
    clientId: '<replace-me>',
    clientSecret: '<replace-me>'
  }),
  pendingVersions: [],
  versions: []
});

render(<ThemeProvider theme={theme}>
  <Redux>
    <Initializer/>
    <Layout>
      <DeploymentStatusTable/>
    </Layout>
  </Redux>
</ThemeProvider>, document.querySelector('div'));
