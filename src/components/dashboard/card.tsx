import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface CardProps {
  name: string;
  image: string;
  link: string;
  priority?: boolean;
}

const Card: React.FC<CardProps> = ({ name, image, link, priority = false }) => {
  const [imgSrc, setImgSrc] = useState(image);

  const handleImageError = () => {
    setImgSrc("/images/logo.png");
  };

  return (
    <Link
      href={link}
      className="block p-4 border rounded-lg hover:shadow-lg transition-shadow"
    >
      <div className="relative w-full h-48 mb-2">
        <Image
          src={imgSrc}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
          onError={handleImageError}
          priority={priority}
        />
      </div>
      <h3 className="text-lg font-semibold">{name}</h3>
    </Link>
  );
};

export default Card;
