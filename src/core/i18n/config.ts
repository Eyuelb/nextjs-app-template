export const defaultLocale = "en";

export const timeZone = "Europe/Amsterdam";

export const locales = [defaultLocale, "am"] as const;

export const localesMap = [
  { key: "en", title: "English" },
  { key: "am", title: "አማርኛ" },
];
export const localesOption = localesMap.map((l) => ({
  value: l.key,
  label: l.key.toLocaleUpperCase(),
}));
