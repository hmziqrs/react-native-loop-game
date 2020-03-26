import { StyleSheet } from 'react-native';
import { scaling, dimensions, platform } from 'rn-hgl';

import { typography, colors } from 'configs';
import { getFont } from 'utils/fonts';

const AVATAR_BASE_SIZE = scaling(30);
const RED_SECTION_HEIGHT = scaling(32);
const AVATAR_BORDER_WIDTH = scaling(1.8);
const AVATAR_TOP_OFFSET = RED_SECTION_HEIGHT - AVATAR_BASE_SIZE / 2;
const AVATAR_LEFT_OFFSET = dimensions.width / 2 - AVATAR_BASE_SIZE / 2;
const AVATAR_SIZE = AVATAR_BASE_SIZE - AVATAR_BORDER_WIDTH * 2;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.primary,
  },
  header: {
    height: RED_SECTION_HEIGHT,
  },
  backButtonBase: {
    margin: scaling(2),
    alignSelf: 'flex-start',
  },
  backButtonIcon: {
    fontSize: scaling(8),
  },
  avatarBgDark: {
    top: 0,
    position: 'absolute',
    width: AVATAR_BASE_SIZE,
    backgroundColor: colors.darkBackground,
    height: (AVATAR_BASE_SIZE + AVATAR_BORDER_WIDTH * 2) / 2,
  },
  avatarBgPrimary: {
    position: 'absolute',
    width: AVATAR_BASE_SIZE,
    backgroundColor: colors.primary,
    top: AVATAR_BASE_SIZE / 2,
    height: AVATAR_BASE_SIZE / 2,
  },
  avatarBase: {
    overflow: 'hidden',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: AVATAR_BASE_SIZE,
    height: AVATAR_BASE_SIZE,
    top: AVATAR_TOP_OFFSET,
    left: AVATAR_LEFT_OFFSET,
    backgroundColor: colors.reddit,
    borderRadius: AVATAR_BASE_SIZE / 2,
  },
  avatarImage: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
  },
  body: {
    paddingTop: AVATAR_TOP_OFFSET,
    backgroundColor: colors.darkBackground,
  },
  heading: {
    ...getFont(600),
    color: colors.white,
    marginTop: scaling(5),
    marginLeft: scaling(3),
    marginBottom: scaling(1),
    fontSize: typography.body1,
  },
  description: {
    color: colors.white,
    marginHorizontal: scaling(3),
  },
  subDescription: {
    color: colors.white.alpha(0.55),
    marginHorizontal: scaling(3),
  },
  skillsHolder: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: scaling(1.5),
  },
  skill: {
    borderWidth: 1,
    borderRadius: 4,
    color: colors.white,
    margin: scaling(1.5),
    ...getFont(600),
    borderColor: colors.primary,
    paddingVertical: scaling(1.4),
    paddingHorizontal: scaling(3),
  },
  contactsHolder: {
    margin: scaling(1.5),
  },
  contactBase: {
    borderWidth: 1,
    borderRadius: 4,
    flexDirection: 'row',
    margin: scaling(1.5),
    justifyContent: 'center',
    paddingVertical: scaling(2),
    borderColor: colors.primary.alpha(0.6),
  },
  contactIcon: {
    color: colors.white,
    fontSize: scaling(4.0),
  },
  contactText: {
    color: colors.white,
    marginLeft: scaling(1),
  },
  supportHolder: {
    marginTop: scaling(2),
    marginHorizontal: scaling(1.5),
    paddingBottom: scaling(platform.isAndroid ? 10 : 3),
  },
  supportBase: {
    padding: scaling(1.5),
  },
  supportText: {
    color: colors.white,
    fontSize: typography.body3,
  },
});

export default styles;
