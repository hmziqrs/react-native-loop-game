export interface Contact {
  icon: string;
  username: string;
  platform: string;
}

export interface Support {
  link: string;
  text: string;
  icon: string;
}

export const skills = [
  "Rust",
  "Flutter",
  "React Native",
  "NextJS",
  "Typescript",
  "Firebase",
  "NodeJS",
  "Socket.IO",
  "PostgreSQL",
];

export const contacts: Contact[] = [
  {
    platform: "github",
    username: "hmziqrs",
    icon: "github",
  },
  {
    platform: "x",
    username: "hmziqrs",
    icon: "x-twitter",
  },
  {
    platform: "gmail",
    username: "hmziqrs@gmail.com",
    icon: "envelope",
  },
  {
    platform: "telegram",
    username: "hmziqrs",
    icon: "telegram",
  },
];

export const showSupport: Support[] = [
  {
    text: "Star this github repository",
    link: "https://github.com/hmziqrs/react-native-loop-clone",
    icon: "github",
  },
  {
    text: "Rate this app on playstore",
    link: "https://play.google.com/store/apps/details?id=com.onemdev.rnloop",
    icon: "google-play",
  },
];
