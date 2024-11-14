export interface ScrollAnalytics {
  trackScrollDepth: (depth: number) => void;
}

export interface ScreenAnalytics {
  trackScreenView: () => void;
  trackScreenExit: (duration: number) => void;
}

export interface LinkAnalytics {
  trackLinkClick: (link: any) => void;
  trackLinkError: (link: any, error: string) => void;
}

export interface ViewportAnalytics {
  trackSectionView: (section: {
    section_id: string;
    section_name: string;
  }) => void;
}
