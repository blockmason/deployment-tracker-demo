const pivotOn = (shape = {}) => (array = [], object = {}) => {
  const index = array.findIndex((it) => Object.keys(shape).every((key) => shape[key] === it[key]));

  if (index >= 0) {
    return [
      ...array.slice(0, index),
      { ...array[index], ...object },
      ...array.slice(index + 1)
    ];
  }

  return [
    ...array,
    { ...shape, ...object }
  ];
};

const ActionReducers = {
  LIST_APPS: (state, action) => ({ ...state, apps: action.apps }),

  LIST_ENVIRONMENTS: (state, action) => ({ ...state, environments: action.environments }),

  VERSION: (state, action) => ({
    ...state,
    versions: pivotOn({
      appId: action.app.id,
      environmentId: action.environment.id
    })(state.versions, {
      version: action.version
    })
  }),

  PENDING_VERSION: (state, action) => ({
    ...state,
    pendingVersions: pivotOn({
      appId: action.app.id,
      environmentId: action.environment.id
    })(state.pendingVersions, {
      pendingVersion: action.pendingVersion,
      progress: action.progress,
      total: action.total
    })
  })
};

export default ActionReducers;
