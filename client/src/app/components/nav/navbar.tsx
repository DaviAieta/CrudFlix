/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */

import Link from 'next/link'
import { CircleUser, LogOut } from 'lucide-react'

export function NavBar() {
  return (
    <div className="container mx-auto flex items-center border-b-2 py-6 justify-start p-5 gap-5">
      <div className="grow flex items-center gap-3">
        <Link href="/users" className="font-bold">
          CrudFlix
        </Link>
        <Link href="/profile" className="hover:underline">
          <CircleUser />
        </Link>
        <Link href="/logout" className="hover:underline">
          <LogOut />
        </Link>
      </div>

      <div className="grow">
        <div className="flex items-center justify-center gap-6">
          <Link href="/users" className="hover:underline">
            Usuários
          </Link>
          <Link href="/movies" className="hover:underline">
            Filmes
          </Link>
        </div>
      </div>
    </div>
  )
}
