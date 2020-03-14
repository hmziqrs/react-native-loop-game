import { buildConstants } from 'utils';

const constants = ['INIT', 'CHANGE'];

const caches = ['DATA'];

export const DEFAULT_LOCALE = 'en';
export const CACHE = buildConstants(caches, 'Auth', 'cache');

export default buildConstants(constants, 'Auth');
