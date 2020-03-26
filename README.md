# React Native Loop

## Features

<dl>
  <dt>UI Scaling</dt>
  <dd>Scales UI on any size of device wether it be tablet, small screen mobile or phablet.</dd>

  <dt>Offline-first</dt>
  <dd>Run app without an internet connection. All assets are saved locally.</dd>
  
  <dt>Simple UI</dt>
  <dd>Just simple and straight forward UI.</dd>

  <dt>Modularized Structure</dt>
  <dd>Helps maintain a readable code, easy to fix and more room to add new features.</dd>

  <dt>Open Source</dt>
  <dd>Any piece of code is free to use anywhere except music you've to give credits to the creator in order to use them. Information can be found in app.</dd>
</dl>

## Requirements to run locally

> Just in case if you ran into errors make sure you're using correct react-native & nodejs version.

- Run `npm run setup` to install required global npm packages with correct versions.
- Run `npx jetifier` to convert native libraries to AndroidX.
- Run `npm start` to start the bundling server.
- Run `npm run android` to build debug app for android.
- Run `npm run ios` to build debug app for iOS.

## Getting started with code

> Please note that this project's code is not meant for beginners! If you're just getting started with React Native I recommend you to explore some ToDo and basic setState apps and get yourself familiar with react eco-system becuase in this project intermediate and advance implementations are use which will confuse you and won't help much in terms of learning.

- `init.js` initialize default settings like styles, theme & API.
- `index.js` initialize root components like `Themes`, `Settings` & `Navigator`.
- `configs/index.js` holds app's & level's theme.
- `contexts/Settings/index.js` is responsible for chaning/cache game's music track & volume.
- `contexts/Theme/index.js` is responsible for chaning/cache app's dark/light mode.
- `engine` is responsible for game's logic.
- `utils/index.js` holds custom general functions.
- `utils/ui.js` holds custom UI related functions.
- `utils/fonts.js`
  - One of the fruits of using react-native is framework doesn't register custom font's weight automatically.
  - So in order to change font weight your to use complete font family name+prefix eg `Muli-Bold`.
  - This file helps us get correct font family name according to font weight.
  - Please also beware for iOS & android font family naming conflicts. <a href="https://medium.com/@mehran.khan/ultimate-guide-to-use-custom-fonts-in-react-native-77fcdf859cf4" target="_medium">READ MORE</a>

> **Reason I didn't use redux is, App isn't heavily relied on shared state in between screen. Only shared data is theme mode & music controls which are implemented with context in few lines of code. So using redux seems like a overkill for this small scale project**


## Show support

> **If you like the project and want to appreciate my effort. Then please perform any of these steps :)**

- Star this repository.
- Rate the app on <a href="https://play.google.com/store/apps/details?id=com.onemdev.flutter_ui_challenges" target="_playstore">Play Store</a>.
- Endorse my skills on my <a href="https://www.linkedin.com/in/hackerhgl" target="linkedin">linkedin Profile</a>.
- Favorite my gigs on <a href="https://www.fiverr.com/hackerhgl" target="fiver">Fiverr</a>.
- Give a recommendation on <a href="https://www.freelancer.com/u/hackerhgl" target="freelance">Freelancer</a>.

## Download

<div id="downloads">
  <a href="https://play.google.com/store/apps/details?id=com.onemdev.rnloop">
    <img src="https://raw.githubusercontent.com/hackerhgl/react-native-loop-game/master/.github/assets/google-play.png" alt="Play Store badge" width="200" />
  </a>
  <a href="https://github.com/hackerhgl/react-native-loop-game/releases/latest/download/app-release.apk">
    <img src="https://raw.githubusercontent.com/hackerhgl/react-native-loop-game/master/.github/assets/android.png" alt="Android badge" width="200" />
  </a>
</div>


## License

This project is licensed under the MIT license, Copyright (c) 2020 Hamza Iqbal. For more information see `LICENSE.md`.
