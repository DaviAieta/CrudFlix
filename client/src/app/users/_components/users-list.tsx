"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { CardContent, Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Search, PlusCircle, UserRound } from "lucide-react";
import Link from "next/link";

export type User = {
  id: number;
  name: string;
  email: string;
};

export function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("http://localhost:3333/users");
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <h1 className="w-full max-w-6xl mx-auto px-4 md:px-6 py-8 text-2xl font-bold">
        Loading...
      </h1>
    );
  }

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-8">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
        <Link href="/users/create">
          <Button className="bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200">
            <PlusCircle className="w-4 h-4 mr-2" />
            Register
          </Button>
        </Link>
      </header>
      <div className="flex items-center gap-2 mb-6">
        <Search className="w-6 h-6" />
        <Input
          className="w-full bg-white dark:bg-gray-950"
          placeholder="Search user by name"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredUsers.map((user) => (
          <Card
            key={user.id}
            className="transform transition-transform duration-300 hover:scale-105"
          >
            <Link href={`/users/${user.id}`}>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <Avatar className="mb-4">
                  <AvatarImage alt={user.name} />
                  <AvatarFallback>
                    <UserRound />
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {user.email}
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
