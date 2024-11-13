export interface Contact {
  icon: string;
  username: string;
  platform: string;
}

export interface Support {
  link: string;
  text: string;
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
    platform: "linkedin",
    username: "hmziqrs",
    icon: "linkedin",
  },
  {
    platform: "github",
    username: "hmziqrs",
    icon: "github",
  },
  {
    platform: "x (twitter)",
    username: "hmziqrs",
    icon: "twitter",
  },
  {
    platform: "gmail",
    username: "hmziqrs@gmail.com",
    icon: "mail",
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
  },
  {
    text: "Rate this app on playstore",
    link: "https://play.google.com/store/apps/details?id=com.onemdev.rnloop",
  },
];
