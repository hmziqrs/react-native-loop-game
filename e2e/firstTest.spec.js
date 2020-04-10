const detox = require('detox');

const utils = require('./utils');

const level3Actions = {
  'block-0-0': 1,
  'block-0-1': 2,
  'block-0-2': 2,

  'block-1-0': 1,
  'block-1-2': 1,

  'block-2-0': 2,
  'block-2-1': 2,
};

describe('Example', () => {
  it('Light Theme', async () => {
    await runCycle('light');
  });
  it('Dark Theme', async () => {
    await runCycle('dark');
  });

  it('Non theme screenshots', async () => {
    await detox.element(detox.by.id('aboutDeveloperBtn')).tap();
    utils.screenshot('AboutDeveloperScreen');
    await utils.goBack('back', false);
    await detox.element(detox.by.id('levelsBtn')).tap();
    await detox.element(detox.by.id('level-3')).tap();
    utils.screenshot('Level-3');

    // Solve the level
    const keys = Object.keys(level3Actions);
    let levelAction = 0;
    /* eslint-disable */
    while (levelAction < keys.length) {
      const key = keys[levelAction++];
      const action = level3Actions[key];

      let actionsTaps = 0;
      while (actionsTaps < action) {
        await detox.element(detox.by.id(key)).tap();
        actionsTaps++;
      }
    }
    /* eslint-enable */
    utils.screenshot('Level-3-Completed');
  });
});

const runCycle = async (theme) => {
  await expect(detox.element(detox.by.id('welcome'))).toBeVisible();
  await detox.element(detox.by.id('settingsBtn')).tap();
  await detox.element(detox.by.id(`${theme}Theme`)).tap();
  utils.screenshot('SettingsScreen', theme);

  await detox.device.reloadReactNative();

  utils.screenshot('HomeScreen', theme);

  await detox.element(detox.by.id('aboutAppBtn')).tap();
  utils.screenshot('AboutAppScreen', theme);
  await utils.goBack();

  await detox.element(detox.by.id('levelsBtn')).tap();
  utils.screenshot('LevelsScreen', theme);
  await detox.device.reloadReactNative();
};
