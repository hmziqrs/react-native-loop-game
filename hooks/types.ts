import { NativeScrollEvent } from "react-native";
import { Link } from "../data";

export interface ScrollAnalytics {
  trackScrollDepth: (depth: number) => void;
}

export interface ScreenAnalytics {
  trackScreenView: () => void;
  trackScreenExit: (duration: number) => void;
}

export interface LinkAnalytics {
  trackLinkClick: (link: Link) => void;
  trackLinkError: (link: Link, error: string) => void;
}

export interface ViewportAnalytics {
  trackSectionView: (section: {
    section_id: string;
    section_name: string;
  }) => void;
}
