const detox = require('detox');
const adapter = require('detox/runners/jest/adapter');
const specReporter = require('detox/runners/jest/specReporter');
const path = require('path');
const config = require('../package.json').detox;
const utils = require('./utils');

const dirs = ['screenshots', 'screenshots/android', 'screenshots/ios'];

dirs.forEach((dir) => {
  utils.mkDirSafe(path.resolve(dir));
});

// Set the default timeout
jest.setTimeout(600000);

jasmine.getEnv().addReporter(adapter);

// This takes care of generating status logs on a per-spec basis. By default, jest only reports at file-level.
// This is strictly optional.
jasmine.getEnv().addReporter(specReporter);

beforeAll(async () => {
  await detox.init(config);
  await detox.device.launchApp({
    newInstance: true,
    launchArgs: { detoxPrintBusyIdleResources: 'YES' },
  });
}, 300000);

// beforeEach(async () => {
//   await adapter.beforeEach();
// });

afterAll(async () => {
  await adapter.afterAll();
  await detox.cleanup();
});
