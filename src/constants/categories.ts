export const CATEGORY_OPTIONS = ["Food", "Drinks"] as const;
export type Category = typeof CATEGORY_OPTIONS[number];
