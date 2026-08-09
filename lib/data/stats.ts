export interface SiteStat {
  value: string;
  label: string;
}

export const heroStats: SiteStat[] = [
  {
    value: '4+',
    label: 'Years shipping software',
  },
  {
    value: '5',
    label: 'Side projects shipped',
  },
  {
    value: '50+',
    label: 'Vendor integrations built',
  },
];

export const aboutStats: SiteStat[] = [
  ...heroStats,
  {
    value: '1000+',
    label: 'Clients served in production',
  },
];
