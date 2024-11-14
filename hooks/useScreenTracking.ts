import { useEffect, useRef } from "react";
import { ScreenAnalytics } from "./types";

export function useScreenTracking(analytics: ScreenAnalytics) {
  const screenStartTime = useRef(Date.now());

  useEffect(() => {
    analytics.trackScreenView();

    return () => {
      const duration = (Date.now() - screenStartTime.current) / 1000;
      analytics.trackScreenExit(duration);
    };
  }, []);
}
