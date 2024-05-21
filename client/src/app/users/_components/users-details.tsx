"use client";

import { UserRound } from "lucide-react";
import { useState, useEffect } from "react";

export type Props = {
  params: { id: any };
};

export type User = {
  id: number;
  name: string;
  email: string;
};

export function UsersDetail({ params }: Props) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(
          `http://localhost:3333/users/${params.id}`
        );
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    fetchUsers();
  }, [params.id]);

  if (!user) {
    return (
      <h1 className="w-full max-w-6xl mx-auto px-4 md:px-6 py-8 text-2xl font-bold">
        User not found
      </h1>
    );
  }
  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4 md:px-6">
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
          <h1 className="text-3xl font-bold mb-2">ID: {params.id}</h1>
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-medium mb-2">Contact</h2>
              <div className="text-gray-500">
                <div>Email: {user.email}</div>
                <div>Phone: +1 (555) 123-4567</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <UserRound
            className="rounded-full w-48 h-48 object-cover"
            height="300"
            style={{
              aspectRatio: "300/300",
              objectFit: "cover",
            }}
            width="300"
          />
        </div>
      </div>
    </div>
  );
}
