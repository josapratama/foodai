"use client";

import React from "react";

interface LanguageSwitcherProps {
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  selectedLanguage,
  setSelectedLanguage,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = event.target.value;
    setSelectedLanguage(newLanguage); // Update temporary language
  };

  return (
    <select
      value={selectedLanguage}
      onChange={handleChange}
      className="p-2 border rounded"
    >
      <option value="en">English</option>
      <option value="id">Bahasa Indonesia</option>
    </select>
  );
};

export default LanguageSwitcher;
