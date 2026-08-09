export type UmamiEventData = Record<string, string | number | boolean>;

declare global {
  interface Window {
    umami?: {
      track: (name: string, data?: UmamiEventData) => void;
    };
  }
}

export const trackEvent = (name: string, data?: UmamiEventData) => {
  if (typeof window === 'undefined') return;
  window.umami?.track(name, data);
};

export const umamiTrackProps = (name: string, data?: UmamiEventData) => {
  const props: Record<string, string | number | boolean> = {
    'data-umami-event': name,
  };
  if (data) {
    for (const [key, value] of Object.entries(data)) {
      props[`data-umami-event-${key}`] = value;
    }
  }
  return props;
};
