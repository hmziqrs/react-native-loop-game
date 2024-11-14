import { getApp } from "@react-native-firebase/app";
import { getAnalytics } from "@react-native-firebase/analytics";
import { getPerformance } from "@react-native-firebase/perf";
import { getCrashlytics } from "@react-native-firebase/crashlytics";
import { getMessaging } from "@react-native-firebase/messaging";

export const app = getApp();
export const analytics = getAnalytics(app);
export const perf = getPerformance();
export const crashlytics = getCrashlytics();
export const messaging = getMessaging();
