const getVersion = ({ app, environment }) => async (dispatch, getState) => {
  const { version } = await getState().link.get('/getVersion', { app: app.id, environment: environment.id });

  dispatch({ app, environment, version, type: 'VERSION' });
};

export default getVersion;
