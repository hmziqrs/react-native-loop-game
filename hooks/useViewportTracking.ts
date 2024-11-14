import { useCallback, useRef } from "react";
import { ViewToken } from "react-native";
import { ViewportAnalytics } from "./types";

interface ViewportTrackingOptions {
  analytics: ViewportAnalytics;
}

export function useViewportTracking({ analytics }: ViewportTrackingOptions) {
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  });

  const onViewableItemsChanged = useCallback(
    ({
      viewableItems,
      changed,
    }: {
      viewableItems: ViewToken[];
      changed: ViewToken[];
    }) => {
      changed.forEach((change) => {
        if (change.isViewable) {
          analytics.trackSectionView({
            section_id: change.item.id,
            section_name: change.item.name,
          });
        }
      });
    },
    [analytics],
  );

  return {
    viewabilityConfig: viewabilityConfig.current,
    onViewableItemsChanged,
  };
}
