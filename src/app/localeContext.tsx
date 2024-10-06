"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from "react";

interface LocaleContextProps {
  locale: string;
  setLocale: (locale: string) => void;
}

const LocaleContext = createContext<LocaleContextProps | undefined>(undefined);

export const LocaleProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [locale, setLocale] = useState("en"); // Default to 'en'

  useEffect(() => {
    // Access localStorage only after component has mounted (client-side)
    const savedLocale = localStorage.getItem("language") ?? "en";
    setLocale(savedLocale);
  }, []);

  const updateLocale = (newLocale: string) => {
    setLocale(newLocale);
    localStorage.setItem("language", newLocale);
  };

  const contextValue = useMemo(
    () => ({ locale, setLocale: updateLocale }),
    [locale]
  );

  return (
    <LocaleContext.Provider value={contextValue}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
};
