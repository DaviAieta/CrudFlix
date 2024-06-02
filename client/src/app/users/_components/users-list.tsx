"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { CardContent, Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Search, PlusCircle, UserRound } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

export type User = {
  id: number;
  name: string;
  email: string;
};

export function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function listUsers() {
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

    listUsers();
  }, []);

  const updateUser = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(`http://localhost:3333/users/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userId,
          name,
          email,
        }),
      });
      if (response.ok) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        toast({
          title: "Account updated successfully",
          description: `Successfully changed data`,
        });
      }
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setSubmitting(false);
    }
  };

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
            <Dialog>
              <DialogTrigger
                onClick={() => {
                  setUserId(user.id);
                  setEmail(user.email);
                  setName(user.name);
                }}
              >
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
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when youre
                    done.
                  </DialogDescription>
                </DialogHeader>
                <form className="space-y-4" onSubmit={updateUser}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        ID
                      </Label>
                      <Input
                        id="name"
                        defaultValue={user.id}
                        className="col-span-3"
                        value={user.id}
                        disabled
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        defaultValue={user.name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">
                        E-mail
                      </Label>
                      <Input
                        id="email"
                        defaultValue={user.email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" disabled={submitting}>
                      {submitting ? "Loading..." : "Save Changes"}
                    </Button>{" "}
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </Card>
        ))}
      </div>
    </div>
  );
}
