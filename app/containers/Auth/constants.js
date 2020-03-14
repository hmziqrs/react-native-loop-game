import { buildConstants } from 'utils';

const constants = [
  'INIT',
  'INIT_SUCCESS',
  'INIT_FAILURE',

  'SIGN_IN',
  'SIGN_IN_SUCCESS',
  'SIGN_IN_FAILURE',

  'SIGN_UP',
  'SIGN_UP_SUCCESS',
  'SIGN_UP_FAILURE',

  'SIGN_OUT',
  'SIGN_OUT_SUCCESS',
  'SIGN_OUT_FAILURE',
];

const caches = ['AUTH_TOKEN'];

export const CACHE = buildConstants(caches, 'Auth', 'cache');

export default buildConstants(constants, 'Auth');
