/* eslint-disable react/prop-types */
// Search.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */

'use client'

import { Search } from 'lucide-react'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { useState } from 'react'
import { Dispatch, SetStateAction } from 'react'

type typeProps = {
  searchUser: string
  setSearchUser: Dispatch<SetStateAction<string>>
}

export function SearchUser(props: typeProps) {
  const [input, setInput] = useState('')

  return (
    <form className="flex items-center gap-2">
      <Input
        name="name"
        placeholder="Nome do usuário"
        className="w-auto"
        value={props.searchUser}
        onChange={(e) => props.setSearchUser(e.target.value)}
      ></Input>
      <Button type="submit" variant="link">
        <Search className="w-4 h-4 mr-2" />
        Filtrar resultados
      </Button>
    </form>
  )
}
