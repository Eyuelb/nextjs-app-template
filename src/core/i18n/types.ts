import type { locales } from "./config";

type Locale = (typeof locales)[number];
type DotPrefix<T extends string> = T extends "" ? "" : `.${T}`;

type DotNestedKeys<T> = (
  T extends object
    ? {
        [K in Exclude<
          keyof T,
          symbol
        >]: `${K}${DotPrefix<DotNestedKeys<T[K]>>}`;
      }[Exclude<keyof T, symbol>]
    : ""
) extends infer D
  ? Extract<D, string>
  : never;

type TranslationKey = DotNestedKeys<IntlMessages>;
export type { Locale, DotNestedKeys, TranslationKey };
