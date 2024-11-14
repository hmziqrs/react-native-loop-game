import { getApp } from "@react-native-firebase/app";
import { getAnalytics } from "@react-native-firebase/analytics";
import { getPerformance } from "@react-native-firebase/perf";
import { getCrashlytics } from "@react-native-firebase/crashlytics";
import { getMessaging } from "@react-native-firebase/messaging";

// const firebaseConfig = {
//   apiKey: "AIzaSyD9rrkA8cKlH_T3xrtE2skJrnwIgtxQI9U",
//   authDomain: "react-native-loop.firebaseapp.com",
//   databaseURL: "https://react-native-loop.firebaseio.com",
//   projectId: "react-native-loop",
//   storageBucket: "react-native-loop.firebasestorage.app",
//   messagingSenderId: "344714598000",
//   appId: "1:344714598000:web:87571534b75fa95cbc86b5",
//   measurementId: "G-89T9V4Y6DE",
// };

export const app = getApp();
export const analytics = getAnalytics(app);
export const perf = getPerformance();
export const crashlytics = getCrashlytics();
export const messaging = getMessaging();
