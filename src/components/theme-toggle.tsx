import React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ThemeToggleProps {
  id?: string;
  selectedTheme: string;
  setSelectedTheme: (theme: string) => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  id,
  selectedTheme,
  setSelectedTheme,
}) => {
  return (
    <div id={id} className="flex space-x-2">
      <Button
        aria-pressed={selectedTheme === "light"}
        onClick={() => setSelectedTheme("light")}
        className="flex items-center"
      >
        <Sun
          className={`h-[1.2rem] w-[1.2rem] ${
            selectedTheme === "light" ? "text-yellow-500" : "text-gray-400"
          }`}
        />
        <span className="sr-only">Light Theme</span>
      </Button>
      <Button
        aria-pressed={selectedTheme === "dark"}
        onClick={() => setSelectedTheme("dark")}
        className="flex items-center"
      >
        <Moon
          className={`h-[1.2rem] w-[1.2rem] ${
            selectedTheme === "dark" ? "text-blue-500" : "text-gray-400"
          }`}
        />
        <span className="sr-only">Dark Theme</span>
      </Button>
    </div>
  );
};

export default ThemeToggle;
