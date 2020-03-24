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
  <dd>Any piece of code is free to use anywhere except UI Designs you've to ask permission from relevant designers. Designer's information can be found in app.</dd>
</dl>

## Requirements to run locally

> Just in case if you ran into errors make sure you're using correct react-native & nodejs version.

- Run `npm run setup` to install required global npm packages with correct versions

## Getting started with code

> Please note that this project's code is not meant for beginners! If you're just getting started with flutter I recommend you to explore some ToDo and basic setState apps and get yourself familiar with react eco-system becuase in this project intermediate and advance implementations are use which will confuse you and won't help much in terms of learning.

- `init.js` initialize default settings like styles, theme & API.
- `UI.dart` provides constant for building responsive UI.
- `blocs/` Intially I was going to implement Rest APIs but that seemed unnecessary & a lot of work So I'll probably remove `blocs/` in futrue.
- `configs/AppDimensions.dart` this is the magical file. It provides the app with:
  - My custom size unit based on device's width, height & pixel density.
  - Responsive containers.
  - Padding multiplier unit (I learned it with experience instead of using 1,2,3px should use multiplier. it helps maintain constancy around the app).
- `Widgets/Screen.dart` This widget is necessary when building a new screen.
  - configure theme & font style.
  - You can show popUps. `final screenKey = GlobalKey<ScreenState>();` & `this.screenKey.showPopUp(message: "your message");`
  - It also recieve a `belowBuilder` parameter which builds custom background (This enables us to build Parallax, Animated background & Any thing you could imagine in background). you can find an example in `Screens/Download/Download.dart`
- Code structure is pretty much simple.
  - Don't import anything form ScreenA in ScreenB.
  - Don't import anthing from Screen/Widget in universal files.
  - Don't import anthing from ScreenA specific Widget in universal files.
  - Each Screen will have `Dimensions.dart` where you can write Screen's responsive logic.
  - I didn't use snake_case in naming convention just becuase I don't prefer it.
  - I use `this` for class's properties & methods I helps keep track of vriables & functions.


## Show support

> **If you like the project and want to appreciate my effort. Then please perform any of these steps :)**

- Star this repository.
- Rate the app on <a href="https://play.google.com/store/apps/details?id=com.onemdev.flutter_ui_challenges" target="_playstore">Play Store</a>.
- Endorse my skills on my <a href="https://www.linkedin.com/in/hackerhgl" target="linkedin">linkedin Profile</a>.
- Favorite my gigs on <a href="https://www.fiverr.com/hackerhgl" target="fiver">Fiverr</a>.
- Give a recommendation on <a href="https://www.freelancer.com/u/hackerhgl" target="freelance">Freelancer</a>.

## Download

<div id="downloads">
  <a href="https://play.google.com/store/apps/details?id=com.onemdev.flutter_ui_challenges">
    <img src="https://raw.githubusercontent.com/hackerhgl/flutter-ui-designs/master/.github/assets/google-play.png" alt="Play Store badge" width="200" />
  </a>
  <a href="https://github.com/hackerhgl/flutter-ui-designs/releases/latest/download/app-release.apk">
    <img src="https://raw.githubusercontent.com/hackerhgl/flutter-ui-designs/master/.github/assets/android.png" alt="Android badge" width="200" />
  </a>
</div>

## License

This project is licensed under the MIT license, Copyright (c) 2020 Hamza Iqbal. For more information see `LICENSE.md`.
