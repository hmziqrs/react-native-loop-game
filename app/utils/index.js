import camelCase from 'lodash/camelCase';

export function sleep(data = null, duration = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, duration);
  });
}

export const buildConstants = (array, scope, source = 'app') => {
  const constants = {};

  array.forEach((constant) => {
    constants[constant] = `${source}/${scope}/${constant}`;
  });

  return constants;
};

export const buildActions = (constants) => {
  const actions = {};

  Object.keys(constants).forEach((key) => {
    actions[camelCase(key)] = (payload) => ({
      type: constants[key],
      payload,
    });
  });

  return actions;
};

export const buildMessages = (rawMessages, scope) => {
  const messages = {};

  Object.keys(rawMessages).forEach((key) => {
    messages[key] = {
      description: null,
      id: `${scope}.${key}`,
      defaultMessage: `${rawMessages[key]}`,
    };
  });

  return messages;
};
