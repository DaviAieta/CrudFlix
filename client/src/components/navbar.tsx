"use client";

import Link from "next/link";
import { Clapperboard } from "lucide-react";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = Cookies.get("auth_token");

    if (token) {
      setIsLoggedIn(true);

      fetch("http://localhost:3333/users/getusername", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUserName(data.name);
        })
        .catch((error) => {
          console.error("Error fetching user name:", error);
        });
    }
  }, []);

  return (
    <header className="flex items-center justify-between h-16 px-4 bg-white shadow-sm">
      <Link className="flex items-center gap-2 text-lg font-semibold" href="#">
        <Clapperboard className="w-6 h-6" />
        <span className="sr-only">Acme Inc</span>
      </Link>
      <nav className="flex items-center gap-6 text-sm font-medium">
        <span>Hello, {userName}</span>
        <Link
          className="transition-colors hover:text-gray-600 focus:text-gray-600"
          href="/users"
        >
          Users
        </Link>
        <Link
          className="transition-colors hover:text-gray-600 focus:text-gray-600"
          href="/movies"
        >
          Movies
        </Link>
        <Link
          className="transition-colors hover:text-gray-600 focus:text-gray-600"
          href="/auth/logout"
        >
          logout
        </Link>
        <>
          <Link
            className="transition-colors hover:text-gray-600 focus:text-gray-600"
            href="/auth/login"
          >
            Login
          </Link>
        </>
      </nav>
    </header>
  );
}
