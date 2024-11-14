import { analytics } from "@/service/firebase";
import { Link } from "./data";

export const AboutAppAnalytics = {
  // Track screen view with session duration
  trackScreenView: () => {
    analytics.logEvent("about_app_screen_view", {
      timestamp: Date.now(),
    });
  },

  // Track when user exits the screen
  trackScreenExit: (duration: number) => {
    analytics.logEvent("about_app_screen_exit", {
      duration_seconds: Math.round(duration),
      timestamp: Date.now(),
    });
  },

  // Track external link clicks
  trackLinkClick: (link: Link) => {
    analytics.logEvent("about_app_link_click", {
      link_type: link.label,
      platform: link.icon,
      url: link.url,
      timestamp: Date.now(),
    });
  },

  // Track link click errors
  trackLinkError: (link: Link, error: string) => {
    analytics.logEvent("about_app_link_error", {
      link_type: link.label,
      platform: link.icon,
      url: link.url,
      error_message: error,
      timestamp: Date.now(),
    });
  },

  // Track scroll depth
  trackScrollDepth: (depth: number) => {
    analytics.logEvent("about_app_scroll_depth", {
      scroll_percentage: Math.round(depth * 100),
      timestamp: Date.now(),
    });
  },
};
