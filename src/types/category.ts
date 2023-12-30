export const categories = [
  'mean_temp',
  'humidity',
  'wind_speed',
  'mean_pressure',
] as const;

export type Category = (typeof categories)[number];
