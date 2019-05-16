const MONITORED_APP_IDS = Object.freeze([1]);

const listApps = () => async (dispatch, getState) => {
  const { link } = getState();

  const apps = await Promise.all(MONITORED_APP_IDS.map(async (id) => ({
    id,
    label: (await link.get('/getAppLabel', { id })).app
  })));

  dispatch({ apps, type: 'LIST_APPS' });
};

export default listApps;
