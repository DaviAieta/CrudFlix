/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */

import { Pencil } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '../../components/ui/dialog'

export function UpdateUser() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-4 h-4">
          <Pencil className="w-5 h-4 mr-2" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <h1>Update User</h1>
      </DialogContent>
    </Dialog>
  )
}
