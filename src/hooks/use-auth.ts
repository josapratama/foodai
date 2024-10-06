"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const currentUser = localStorage.getItem("currentUser");
      const isLoggedIn = currentUser !== null;

      setIsAuthenticated(isLoggedIn);

      if (isLoggedIn) {
        router.push("/dashboard");
      }
    };

    checkAuth();
  }, [router]);

  return { isAuthenticated };
}
