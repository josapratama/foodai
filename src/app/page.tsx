import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";

const MainPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <Logo />
      <h1 className="mt-8 text-4xl font-bold">Selamat Datang di Food AI</h1>
      <div className="mt-8 space-x-4">
        <Button asChild>
          <Link href="/login">Masuk</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/register">Daftar</Link>
        </Button>
        <Button variant="secondary">Keluar</Button>
      </div>
    </div>
  );
};

export default MainPage;
