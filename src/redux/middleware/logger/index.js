const loggerMiddleware = (store) => (next) => (action) => {
  // eslint-disable-next-line no-console
  console.debug({ action });
  next(action);
};

export default loggerMiddleware;
