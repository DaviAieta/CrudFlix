import Link from "next/link";
import { Clapperboard } from "lucide-react";

export function NavBar() {
  return (
    <header className="flex items-center justify-between h-16 px-4 bg-white shadow-sm">
      <Link className="flex items-center gap-2 text-lg font-semibold" href="#">
        <Clapperboard className="w-6 h-6" />
        <span className="sr-only">Acme Inc</span>
      </Link>
      <nav className="flex items-center gap-6 text-sm font-medium">
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
          href="#"
        >
          Services
        </Link>
        <Link
          className="transition-colors hover:text-gray-600 focus:text-gray-600"
          href="#"
        >
          Contact
        </Link>
      </nav>
    </header>
  );
}
