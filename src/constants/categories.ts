export const CATEGORY_OPTIONS = ["Food", "Drink"] as const;
export type Category = typeof CATEGORY_OPTIONS[number];
