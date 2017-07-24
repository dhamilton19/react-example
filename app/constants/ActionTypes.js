const createConstants = actionName => ({
  [`${actionName}_PENDING`]: `${actionName}_PENDING`,
  [`${actionName}_SUCCEEDED`]: `${actionName}_SUCCEEDED`,
  [`${actionName}_FAILED`]: `${actionName}_FAILED`,
});

export default {
  ...createConstants('FETCH_ARTICLES'),
  UPDATE_SEARCH_QUERY: 'UPDATE_SEARCH_QUERY',
};
