/**
 * v0 by Vercel.
 * @see https://v0.dev/t/60PEEsOIExT
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function MoviesCreate() {
  return (
    <div className="mx-auto max-w-md space-y-6 mt-10">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Create New Movie</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Fill out the form to add a new movie to your collection.
        </p>
      </div>
      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" placeholder="Enter movie title" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Provide a brief description"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="genre">Genre</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="action">Action</SelectItem>
              <SelectItem value="comedy">Comedy</SelectItem>
              <SelectItem value="drama">Drama</SelectItem>
              <SelectItem value="sci-fi">Sci-Fi</SelectItem>
              <SelectItem value="horror">Horror</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="w-full" type="submit">
          Register Movie
        </Button>
      </form>
    </div>
  );
}
