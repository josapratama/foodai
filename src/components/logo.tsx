import React from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <Image
        src="/images/logo.png"
        alt="Logo"
        width={120}
        height={120}
        priority
        className="w-20 h-20 sm:w-24 sm:h-24"
      />
      <span className="text-lg sm:text-xl md:text-2xl font-bold ml-2">
        Food AI
      </span>{" "}
    </div>
  );
};

export default Logo;
