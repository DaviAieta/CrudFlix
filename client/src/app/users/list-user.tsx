/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */

import { User } from '.'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../../components/ui/table'
import { DeleteUser } from './delete-user'
import { UpdateUser } from './update-user'

type typeProps = {
  searchUser: string
  data: User[]
}

export async function ListUsers(props: typeProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>E-mail</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.data
          .filter((item) => item.name.includes(props.searchUser))
          .map((item: any, index: number) => (
            <TableRow key={index}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell className="flex items-center gap-3">
                <UpdateUser />
                <DeleteUser />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}
