const MONITORED_ENVIRONMENT_IDS = Object.freeze([1]);

const listEnvironments = () => async (dispatch, getState) => {
  const { link } = getState();

  const environments = await Promise.all(MONITORED_ENVIRONMENT_IDS.map(async (id) => ({
    id,
    label: (await link.get('/getEnvironmentLabel', { id })).environment
  })));

  dispatch({ environments, type: 'LIST_ENVIRONMENTS' });
};

export default listEnvironments;
