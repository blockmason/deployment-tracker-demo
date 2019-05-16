const getPendingVersion = ({ app, environment }) => async (dispatch, getState) => {
  const { version: pendingVersion, progress, total } = await getState().link.get('/getPendingVersion', { app: app.id, environment: environment.id });

  dispatch({ app, environment, pendingVersion, progress, total, type: 'PENDING_VERSION' });
};

export default getPendingVersion;
