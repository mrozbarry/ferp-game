export const combineReducersFromArray = (result) => {
  const { state, effects } = result.reduce((combined, item) => {
    return {
      state: combined.state.concat(item[0]),
      effects: combined.effects.concat(item[1]),
    };
  }, { state: [], effects: [] });

  return [state, effects];
};

export const combineReducersFromObject = (result) => {
  const { state, effects } = Object.keys(result).reduce((combined, key) => {
    return {
      state: { ...combined.state, [key]: result[key][0] },
      effects: combined.effects.concat(result[key][1]),
    };
  }, { state: {}, effects: [] });

  return [state, effects];
};

export const combineReducers = (result) => {
  if (Array.isArray(result)) {
    return combineReducersFromArray(result);
  }
  return combineReducersFromObject(result);
};


