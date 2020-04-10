const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const detox = require('detox');

const SCREENSHOT_OPTIONS = {
  timeout: 10000,
  killSignal: 'SIGKILL',
};

function screenshot(name, theme = '') {
  try {
    const fileName = `${name}${theme ? '-' : ''}${theme}.png`;
    if (detox.device.getPlatform() === 'android') {
      const fileAddress = `/sdcard/${fileName}`;
      execSync(`adb shell screencap ${fileAddress}`, SCREENSHOT_OPTIONS);
      execSync(`adb pull ${fileAddress} $(pwd)/screenshots/android/`, SCREENSHOT_OPTIONS);
    } else {
      const deviceName = detox.device.name.split('(')[1].replace(')', '');
      const dir = path.resolve('screenshots', 'ios', deviceName);
      mkDirSafe(dir);
      execSync(`xcrun simctl io booted screenshot "${dir}/${fileName}"`, SCREENSHOT_OPTIONS);
    }
  } catch (e) {
    // e
  }
}

async function goBack(id, longpress = true) {
  const el = detox.element(detox.by.id(id || 'title'));
  if (longpress) {
    await el.longPress();
  } else {
    await el.tap();
  }
}

export function sleep(data = null, duration = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, duration);
  });
}

export function mkDirSafe(dir, logs = false) {
  if (logs) {
    console.log('dir', dir);
  }
  const check = fs.existsSync(dir);
  if (logs) {
    console.log('check', check);
  }
  if (!check) {
    return fs.mkdirSync(dir);
  }
  return check;
}

module.exports = {
  screenshot,
  mkDirSafe,
  goBack,
  sleep,
};
