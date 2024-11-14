import { LinkAnalytics } from "./types";
import * as Linking from "expo-linking";

export function useLinkTracking(analytics: LinkAnalytics) {
  const handleLinkClick = async (link: any) => {
    try {
      analytics.trackLinkClick(link);
      await Linking.openURL(link.url);
    } catch (error) {
      analytics.trackLinkError(link, (error as any).message);
    }
  };

  return { handleLinkClick };
}
