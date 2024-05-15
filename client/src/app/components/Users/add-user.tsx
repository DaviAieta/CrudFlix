/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../../components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '../../../components/ui/dialog'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import { PlusCircle } from 'lucide-react'
import { revalidateTag } from 'next/cache'
import { Alert } from '../../../components/ui/alert'
import { AddTagButton } from './add-user-button'

export function AddUser() {
  async function handleCreateUser(form: FormData) {
    'use server'

    try {
      const name = form.get('name')
      const email = form.get('email')
      const password = form.get('password')
      const super_admin = true

      await new Promise((resolve) => setTimeout(resolve, 3000))

      await fetch('http://localhost:3333/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          password,
          super_admin
        })
      })

      revalidateTag('get-users')
    } catch (error) {
      // Enviar uma mensagem para ele com o status
      console.error('Error registering user:', error)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="w-4 h-4 mr-2" />
          Registar Usuario
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Novo Usuario</DialogTitle>
        <DialogDescription>Criar novo usuario no sistema</DialogDescription>
        <form action={handleCreateUser} method="POST" className="space-y-6">
          <div className="grid grid-cols-4 items-center text-right gap-4">
            <Label>Nome</Label>
            <Input type="text" name="name" className="col-span-3" />
            <Label>E-mail</Label>
            <Input type="email" name="email" className="col-span-3" />
            <Label>Senha</Label>
            <Input type="password" name="password" className="col-span-3" />
            <Label>Admin</Label>
            <Select>
              <SelectTrigger className="w-[180px] col-span-3">
                <SelectValue placeholder="Sim" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="s">Sim</SelectItem>
                <SelectItem value="n">Não</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" variant="destructive">
                Cancelar
              </Button>
            </DialogClose>
            <AddTagButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
