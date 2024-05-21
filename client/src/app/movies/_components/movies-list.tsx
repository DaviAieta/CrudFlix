"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, PlusCircle } from "lucide-react";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import Link from "next/link";
import { useState, useEffect } from "react";

export type Movie = {
  id: string;
  title: string;
  description: string;
  genre: string;
  userId: string;
};

export function MoviesList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("http://localhost:3333/movies");
        const data: Movie[] = await response.json();
        console.log(data);
        setMovies(data);
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

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-8">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Movies</h1>
        <Link href="/movies/create">
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
          placeholder="Search by title"
          type="search"
        />
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead>User Id</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {movies.map((movie) => (
              <TableRow key={movie.id}>
                <TableCell>{movie.title}</TableCell>
                <TableCell>{movie.description}</TableCell>
                <TableCell>{movie.genre}</TableCell>
                <TableCell>{movie.userId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
