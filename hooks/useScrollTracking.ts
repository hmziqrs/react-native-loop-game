import { useRef } from "react";
import { NativeScrollEvent } from "react-native";
import { ScrollAnalytics } from "./types";

export function useScrollTracking(analytics: ScrollAnalytics) {
  const lastScrollDepth = useRef(0);

  const handleScroll = (event: NativeScrollEvent) => {
    const { contentOffset, contentSize, layoutMeasurement } = event;
    const scrollDepth =
      (contentOffset.y + layoutMeasurement.height) / contentSize.height;

    if (Math.abs(scrollDepth - lastScrollDepth.current) > 0.1) {
      lastScrollDepth.current = scrollDepth;
      analytics.trackScrollDepth(scrollDepth);
    }
  };

  return { handleScroll };
}
