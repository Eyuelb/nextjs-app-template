import { TranslationKey } from "@/core/i18n/types";
import { useTranslations } from "next-intl";
import React from "react";

interface TypeSafeTProps {
  tKey: TranslationKey;
}

export const TypeSafeLocale: React.FC<TypeSafeTProps> = ({ tKey }) => {
  const dotIndex = tKey.indexOf(".");

  const namespace = tKey.slice(0, dotIndex) as keyof IntlMessages;
  const key = tKey.slice(dotIndex + 1) as keyof IntlMessages[typeof namespace];

  const t = useTranslations(namespace);
  if (dotIndex === -1) {
    console.error("Invalid translation key format. Expected 'namespace.key'");
    return <>{tKey}</>;
  }

  return <>{t(key)}</>;
};
