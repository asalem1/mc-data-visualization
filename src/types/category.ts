export const categories = [
  'meantemp',
  'humidity',
  'wind_speed',
  'meanpressure',
] as const;

export type Category = (typeof categories)[number];
