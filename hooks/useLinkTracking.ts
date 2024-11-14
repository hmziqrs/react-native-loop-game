import { Link } from "../data";
import { LinkAnalytics } from "./types";
import * as Linking from "expo-linking";

export function useLinkTracking(analytics: LinkAnalytics) {
  const handleLinkClick = async (link: Link) => {
    try {
      analytics.trackLinkClick(link);
      await Linking.openURL(link.url);
    } catch (error) {
      analytics.trackLinkError(link, error.message);
    }
  };

  return { handleLinkClick };
}
