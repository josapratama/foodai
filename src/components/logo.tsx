import React from "react";
import Image from "next/image";

const Logo: React.FC = () => {
  return (
    <div className="flex items-center space-x-2">
      <Image
        src="/images/logo.png"
        alt="Logo"
        width={100}
        height={100}
        priority
      />
      <span className="text-2xl font-bold">Food AI</span>
    </div>
  );
};

export default Logo;
