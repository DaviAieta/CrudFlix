/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */

import { Search } from 'lucide-react'
import { Input } from '../../../components/ui/input'
import { Button } from '../../../components/ui/button'

export async function SearchUser() {
  return (
    <form className="flex items-center gap-2">
      <Input
        name="name"
        placeholder="Nome do usuario"
        className="w-auto"
      ></Input>
      <Button type="submit" variant="link">
        <Search className="w-4 h-4 mr-2" />
        Filtrar resultados
      </Button>
    </form>
  )
}
