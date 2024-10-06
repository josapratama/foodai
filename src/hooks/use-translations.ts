import { useEffect, useState } from "react";
import { useLocale } from "../app/localeContext";
import en from "../messages/en.json";
import id from "../messages/id.json";

type NestedMessages = {
  [key: string]: string | NestedMessages;
};

function flattenMessages(
  nestedMessages: NestedMessages,
  prefix = ""
): { [key: string]: string } {
  return Object.keys(nestedMessages).reduce(
    (messages: { [key: string]: string }, key) => {
      const value = nestedMessages[key];
      const prefixedKey = prefix ? `${prefix}.${key}` : key;

      if (typeof value === "string") {
        messages[prefixedKey] = value;
      } else {
        Object.assign(messages, flattenMessages(value, prefixedKey));
      }

      return messages;
    },
    {}
  );
}

const flattenedMessages: { [key: string]: { [key: string]: string } } = {
  en: flattenMessages(en as NestedMessages),
  id: flattenMessages(id as NestedMessages),
};

export function useTranslations() {
  const { locale } = useLocale();
  const [currentLocale, setCurrentLocale] = useState(locale);

  useEffect(() => {
    setCurrentLocale(locale);
  }, [locale]);

  const t = (key: string): string => {
    const translation =
      flattenedMessages[currentLocale as keyof typeof flattenedMessages]?.[key];
    return translation || key;
  };

  return { t, locale: currentLocale };
}
