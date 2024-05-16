/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
'use client'

import { AddUser } from './add-user'
import { ListUsers } from './list-user'
import { SearchUser } from './search-user'
import { useState } from 'react'

export type User = {
  id: number
  name: string
  email: string
  password: string
  super_admin: boolean
}

export async function Users() {
  const [searchUser, setSearchUser] = useState<string>('')
  const [data, setData] = useState<User[]>([])

  fetch('http://localhost:3333/users').then(async (response) =>
    setData((await response.json()) as User[])
  )

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Usuários</h1>
      <div className="flex items-center justify-between">
        <SearchUser
          searchUser={searchUser}
          setSearchUser={setSearchUser}
        ></SearchUser>
        <AddUser></AddUser>
      </div>
      <div className="border">
        <ListUsers data={data} searchUser={searchUser} />
      </div>
    </div>
  )
}
